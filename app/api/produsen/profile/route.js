import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

const FAKE_EMAIL_DOMAIN = 'pasok.local'

export async function POST(request) {
  const body = await request.json()
  const {
    username,
    password,
    koperasi_ref,
    nama,
    kode_wilayah,
    jenis_kelamin,
    pekerjaan,
    lokasi_lat,
    lokasi_lng,
  } = body

  if (!username || !password) {
    return Response.json({ error: 'username dan password wajib diisi' }, { status: 400 })
  }

  // --- 1. Bikin akun auth dulu (username -> email palsu) ---
  const fakeEmail = `${username.toLowerCase()}@${FAKE_EMAIL_DOMAIN}`

  const { data: authData, error: errAuth } = await supabase.auth.admin.createUser({
    email: fakeEmail,
    password,
    email_confirm: true,
    user_metadata: { username, role: 'produsen' },
  })

  if (errAuth) {
    const status = errAuth.message.includes('already registered') ? 409 : 400
    return Response.json({ error: errAuth.message }, { status })
  }

  // --- 2. Insert ke anggota_koperasi ---
  const { data: anggota, error: errAnggota } = await supabase
    .from('anggota_koperasi')
    .insert({ koperasi_ref, nama, kode_wilayah, jenis_kelamin, pekerjaan })
    .select()
    .single()

  if (errAnggota) {
    await supabase.auth.admin.deleteUser(authData.user.id) // rollback akun auth
    return Response.json({ error: errAnggota.message }, { status: 400 })
  }

  // --- 3. Insert ke anggota_lokasi ---
  const { data: lokasi, error: errLokasi } = await supabase
    .from('anggota_lokasi')
    .insert({ anggota_ref: anggota.anggota_ref, lokasi_lat, lokasi_lng })
    .select()
    .single()

  if (errLokasi) {
    await supabase.auth.admin.deleteUser(authData.user.id) // rollback
    await supabase.from('anggota_koperasi').delete().eq('anggota_ref', anggota.anggota_ref)
    return Response.json({ error: errLokasi.message }, { status: 400 })
  }

  return Response.json({ ...anggota, ...lokasi, user_id: authData.user.id }, { status: 201 })
}