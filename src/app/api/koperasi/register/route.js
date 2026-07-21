import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { email, password, kode_wilayah, nama_koperasi, bentuk_koperasi, kategori_usaha, alamat_lengkap, kode_pos, lat, lng } = body

  if (!email || !password) {
    return Response.json({ error: 'email dan password wajib diisi' }, { status: 400 })
  }

  // --- 1. Bikin akun auth dulu ---
  const { data: authData, error: errAuth } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'koperasi', nama_koperasi },
  })

  if (errAuth) {
    const status = errAuth.message.includes('already registered') ? 409 : 400
    return Response.json({ error: errAuth.message }, { status })
  }

  // --- 2. Insert ke referensi_koperasi_wilayah ---
  const { data: wilayahRow, error: errWilayah } = await supabase
    .from('referensi_koperasi_wilayah')
    .insert({ kode_wilayah })
    .select()
    .single()

  if (errWilayah) {
    await supabase.auth.admin.deleteUser(authData.user.id) // rollback akun auth
    return Response.json({ error: errWilayah.message }, { status: 400 })
  }

  // --- 3. Insert ke profil_koperasi ---
  const { data: profil, error: errProfil } = await supabase
    .from('profil_koperasi')
    .insert({
      koperasi_ref: wilayahRow.koperasi_ref,
      nama_koperasi,
      bentuk_koperasi,
      kategori_usaha,
      alamat_lengkap,
      kode_pos,
      koordinat_dibulatkan: `${lat}, ${lng}`
    })
    .select()
    .single()

  if (errProfil) {
    await supabase.auth.admin.deleteUser(authData.user.id) // rollback
    await supabase.from('referensi_koperasi_wilayah').delete().eq('koperasi_ref', wilayahRow.koperasi_ref)
    return Response.json({ error: errProfil.message }, { status: 400 })
  }

  return Response.json({ ...profil, user_id: authData.user.id }, { status: 201 })
}