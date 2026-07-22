import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

async function hitungHargaRekomendasi(komoditasRef) {
  const { data: penawaranList } = await supabase
    .from('penawaran')
    .select('harga_ditawarkan')
    .eq('komoditas_ref', komoditasRef)
    .eq('status', 'tersedia')
    .not('harga_ditawarkan', 'is', null)

  const { data: acuanRow } = await supabase
    .from('harga_acuan_pemerintah')
    .select('harga_acuan')
    .eq('komoditas_ref', komoditasRef)
    .order('tanggal_berlaku', { ascending: false })
    .limit(1)
    .maybeSingle()

  const hargaPasarLokal = penawaranList && penawaranList.length > 0
    ? penawaranList.reduce((sum, p) => sum + p.harga_ditawarkan, 0) / penawaranList.length
    : null
  const hargaAcuan = acuanRow?.harga_acuan ?? null

  if (hargaAcuan !== null && hargaPasarLokal !== null) {
    return Math.round(0.4 * hargaAcuan + 0.6 * hargaPasarLokal)
  }
  if (hargaPasarLokal !== null) {
    return Math.round(hargaPasarLokal)
  }
  if (hargaAcuan !== null) {
    return hargaAcuan
  }
  return null
}

export async function POST(request) {
  const body = await request.json()
  const {
    nama,
    email,
    password,
    kode_wilayah,
    lokasi_lat,
    lokasi_lng,
    alamat,
    komoditas, // [{ komoditas_ref, nama_komoditas }]
    estimasi_volume,
    estimasi_tanggal_panen,
    luas_lahan_hektar,
    frekuensi_panen,
  } = body

  if (
    !nama || !email || !password || !kode_wilayah ||
    lokasi_lat == null || lokasi_lng == null ||
    !Array.isArray(komoditas) || komoditas.length === 0
  ) {
    return Response.json({ error: 'Data pendaftaran belum lengkap.' }, { status: 400 })
  }

  // --- 1. Bikin akun auth ---
  const { data: authData, error: errAuth } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'produsen', name: nama },
  })

  if (errAuth) {
    const status = errAuth.message.includes('already registered') ? 409 : 400
    return Response.json({ error: errAuth.message }, { status })
  }

  const userId = authData.user.id
  async function rollbackAuth() {
    await supabase.auth.admin.deleteUser(userId)
  }

  // --- 2. Insert anggota_koperasi (koperasi_ref dikosongkan, di-assign lewat Supply Matching) ---
  const { data: anggota, error: errAnggota } = await supabase
    .from('anggota_koperasi')
    .insert({ nama, kode_wilayah, user_id: userId })
    .select()
    .single()

  if (errAnggota) {
    await rollbackAuth()
    return Response.json({ error: errAnggota.message }, { status: 400 })
  }

  const anggotaRef = anggota.anggota_ref
  async function rollbackAnggota() {
    await rollbackAuth()
    await supabase.from('anggota_koperasi').delete().eq('anggota_ref', anggotaRef)
  }

  // --- 3. Insert anggota_lokasi ---
  const { error: errLokasi } = await supabase
    .from('anggota_lokasi')
    .insert({ anggota_ref: anggotaRef, lokasi_lat, lokasi_lng, alamat: alamat ?? null })

  if (errLokasi) {
    await rollbackAnggota()
    return Response.json({ error: errLokasi.message }, { status: 400 })
  }

  async function rollbackLokasi() {
    await rollbackAnggota()
    await supabase.from('anggota_lokasi').delete().eq('anggota_ref', anggotaRef)
  }

  // --- 4. Insert penawaran, satu baris per komoditas yang dipilih ---
  const penawaranRows = []
  for (const item of komoditas) {
    const hargaRekomendasi = await hitungHargaRekomendasi(item.komoditas_ref)

    const { data: penawaran, error: errPenawaran } = await supabase
      .from('penawaran')
      .insert({
        anggota_ref: anggotaRef,
        komoditas_ref: item.komoditas_ref,
        estimasi_volume: estimasi_volume ?? null,
        estimasi_tanggal_panen: estimasi_tanggal_panen ?? null,
        harga_ditawarkan: hargaRekomendasi,
        luas_lahan_hektar: luas_lahan_hektar ?? null,
        frekuensi_panen: frekuensi_panen ?? null,
        status: 'tersedia',
      })
      .select()
      .single()

    if (errPenawaran) {
      await supabase.from('penawaran').delete().eq('anggota_ref', anggotaRef)
      await rollbackLokasi()
      return Response.json({ error: errPenawaran.message }, { status: 400 })
    }

    penawaranRows.push(penawaran)
  }

  // --- 5. Update profiles (baris ini sudah otomatis dibuat oleh trigger saat auth user dibuat) ---
  const { error: errProfile } = await supabase
    .from('profiles')
    .update({ role: 'produsen', name: nama })
    .eq('id', userId)

  if (errProfile) {
    await supabase.from('penawaran').delete().eq('anggota_ref', anggotaRef)
    await rollbackLokasi()
    return Response.json({ error: errProfile.message }, { status: 400 })
  }

  return Response.json(
    { anggota_ref: anggotaRef, user_id: userId, penawaran: penawaranRows },
    { status: 201 },
  )
}
