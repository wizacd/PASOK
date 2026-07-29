import { getKoperasiFromRequest } from '@/lib/server-auth'

export async function GET(request) {
  const result = await getKoperasiFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }
  const { koperasi_ref, userId, supabase } = result

  const { data: profil, error: errProfil } = await supabase
    .from('profil_koperasi')
    .select('nama_koperasi, bentuk_koperasi, kategori_usaha, alamat_lengkap, kode_pos, nik_pengurus, nikop, status_registrasi')
    .eq('koperasi_ref', koperasi_ref)
    .single()

  if (errProfil) {
    return Response.json({ error: errProfil.message }, { status: 400 })
  }

  const { data: authData } = await supabase.auth.admin.getUserById(userId)

  return Response.json({
    nama_koperasi: profil.nama_koperasi ?? '',
    bentuk_koperasi: profil.bentuk_koperasi ?? '',
    kategori_usaha: profil.kategori_usaha ?? '',
    alamat_lengkap: profil.alamat_lengkap ?? '',
    kode_pos: profil.kode_pos ?? '',
    nik_pengurus: profil.nik_pengurus ?? '',
    nikop: profil.nikop ?? '',
    status_registrasi: profil.status_registrasi ?? '',
    email: authData?.user?.email ?? '',
  })
}

export async function PATCH(request) {
  const result = await getKoperasiFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }
  const { koperasi_ref, supabase } = result

  const body = await request.json()
  const { nama_koperasi, bentuk_koperasi, kategori_usaha, alamat_lengkap, kode_pos } = body

  if (!nama_koperasi) {
    return Response.json({ error: 'Nama koperasi wajib diisi.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('profil_koperasi')
    .update({
      nama_koperasi,
      bentuk_koperasi: bentuk_koperasi || null,
      kategori_usaha: kategori_usaha || null,
      alamat_lengkap: alamat_lengkap || null,
      kode_pos: kode_pos || null,
    })
    .eq('koperasi_ref', koperasi_ref)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  await supabase.from('profiles').update({ name: nama_koperasi }).eq('koperasi_ref', koperasi_ref)

  return Response.json({ success: true })
}
