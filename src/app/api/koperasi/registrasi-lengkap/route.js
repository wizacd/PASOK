import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

const JENIS_DOKUMEN = {
  akte: '9DFEC28F3772A4BA',
  nib: 'F82AE4ABC9703CBA',
}

function extensionFor(file) {
  const fromName = file.name?.split('.').pop()
  return fromName ? fromName.toLowerCase() : 'pdf'
}

export async function POST(request) {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')
  const namaKoperasi = formData.get('nama_koperasi')
  const nikPengurus = formData.get('nik_pengurus')
  const nikop = formData.get('nikop')
  const kodeWilayah = formData.get('kode_wilayah')
  const akteFile = formData.get('akte')
  const nibFile = formData.get('nib')

  if (
    !email || !password || !namaKoperasi || !nikPengurus ||
    !nikop || !kodeWilayah || !akteFile || !nibFile
  ) {
    return Response.json({ error: 'Semua data dan dokumen wajib diisi' }, { status: 400 })
  }

  // --- 1. Bikin akun auth ---
  const { data: authData, error: errAuth } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'koperasi', nama_koperasi: namaKoperasi },
  })

  if (errAuth) {
    const status = errAuth.message.includes('already registered') ? 409 : 400
    return Response.json({ error: errAuth.message }, { status })
  }

  const userId = authData.user.id

  async function rollbackAuth() {
    await supabase.auth.admin.deleteUser(userId)
  }

  // --- 2. Insert referensi_koperasi_wilayah ---
  const { data: wilayahRow, error: errWilayah } = await supabase
    .from('referensi_koperasi_wilayah')
    .insert({ kode_wilayah: kodeWilayah })
    .select()
    .single()

  if (errWilayah) {
    await rollbackAuth()
    return Response.json({ error: errWilayah.message }, { status: 400 })
  }

  const koperasiRef = wilayahRow.koperasi_ref

  async function rollbackWilayah() {
    await rollbackAuth()
    // Urutan hapus mengikuti arah foreign key (anak dulu baru induk)
    await supabase.from('dokumen_koperasi').delete().eq('koperasi_ref', koperasiRef)
    await supabase.from('profil_koperasi').delete().eq('koperasi_ref', koperasiRef)
    await supabase.from('referensi_koperasi_wilayah').delete().eq('koperasi_ref', koperasiRef)
  }

  // --- 3. Insert profil_koperasi ---
  const { error: errProfil } = await supabase
    .from('profil_koperasi')
    .insert({
      koperasi_ref: koperasiRef,
      nama_koperasi: namaKoperasi,
      nik_pengurus: nikPengurus,
      nikop,
    })

  if (errProfil) {
    await rollbackWilayah()

    if (errProfil.code === '23505') {
      const field = errProfil.message.includes('nikop') ? 'NIKOP' : 'NIK'
      return Response.json(
        { error: `${field} ini sudah terdaftar. Periksa kembali data Anda.` },
        { status: 409 },
      )
    }

    return Response.json({ error: errProfil.message }, { status: 400 })
  }

  // --- 4. Upload dokumen ke Storage ---
  const akteBuffer = Buffer.from(await akteFile.arrayBuffer())
  const nibBuffer = Buffer.from(await nibFile.arrayBuffer())

  const aktePath = `${koperasiRef}/akte-pendirian.${extensionFor(akteFile)}`
  const nibPath = `${koperasiRef}/sertifikat-nib.${extensionFor(nibFile)}`

  const { error: errUploadAkte } = await supabase.storage
    .from('dokumen-koperasi')
    .upload(aktePath, akteBuffer, { contentType: akteFile.type, upsert: true })

  if (errUploadAkte) {
    await rollbackWilayah()
    return Response.json({ error: errUploadAkte.message }, { status: 400 })
  }

  const { error: errUploadNib } = await supabase.storage
    .from('dokumen-koperasi')
    .upload(nibPath, nibBuffer, { contentType: nibFile.type, upsert: true })

  if (errUploadNib) {
    await supabase.storage.from('dokumen-koperasi').remove([aktePath])
    await rollbackWilayah()
    return Response.json({ error: errUploadNib.message }, { status: 400 })
  }

  // --- 5. Insert dokumen_koperasi ---
  const { error: errDokumen } = await supabase.from('dokumen_koperasi').insert([
    {
      koperasi_ref: koperasiRef,
      jenis_dokumen_ref: JENIS_DOKUMEN.akte,
      unggahan_dokumen: aktePath,
    },
    {
      koperasi_ref: koperasiRef,
      jenis_dokumen_ref: JENIS_DOKUMEN.nib,
      unggahan_dokumen: nibPath,
    },
  ])

  if (errDokumen) {
    await supabase.storage.from('dokumen-koperasi').remove([aktePath, nibPath])
    await rollbackWilayah()
    return Response.json({ error: errDokumen.message }, { status: 400 })
  }

  // --- 6. Update profiles (baris ini sudah otomatis dibuat oleh trigger saat auth user dibuat) ---
  const { error: errProfile } = await supabase
    .from('profiles')
    .update({
      role: 'koperasi',
      koperasi_ref: koperasiRef,
      name: namaKoperasi,
    })
    .eq('id', userId)

  if (errProfile) {
    await supabase.storage.from('dokumen-koperasi').remove([aktePath, nibPath])
    await rollbackWilayah()
    return Response.json({ error: errProfile.message }, { status: 400 })
  }

  return Response.json({ koperasi_ref: koperasiRef, user_id: userId }, { status: 201 })
}
