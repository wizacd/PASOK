import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function getAnggotaFromRequest(request) {
  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.replace(/^Bearer\s+/i, '')

  if (!token) {
    return { error: 'Tidak ada token autentikasi.', status: 401 }
  }

  const { data: userData, error: errUser } = await supabase.auth.getUser(token)
  if (errUser || !userData?.user) {
    return { error: 'Sesi tidak valid, silakan masuk kembali.', status: 401 }
  }

  const { data: anggota, error: errAnggota } = await supabase
    .from('anggota_koperasi')
    .select('anggota_ref, nama, kode_wilayah')
    .eq('user_id', userData.user.id)
    .single()

  if (errAnggota || !anggota) {
    return { error: 'Profil produsen tidak ditemukan untuk akun ini.', status: 404 }
  }

  return { anggota, userId: userData.user.id, supabase }
}

export async function getKoperasiFromRequest(request) {
  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.replace(/^Bearer\s+/i, '')

  if (!token) {
    return { error: 'Tidak ada token autentikasi.', status: 401 }
  }

  const { data: userData, error: errUser } = await supabase.auth.getUser(token)
  if (errUser || !userData?.user) {
    return { error: 'Sesi tidak valid, silakan masuk kembali.', status: 401 }
  }

  const { data: profile, error: errProfile } = await supabase
    .from('profiles')
    .select('koperasi_ref')
    .eq('id', userData.user.id)
    .single()

  if (errProfile || !profile?.koperasi_ref) {
    return { error: 'Profil koperasi tidak ditemukan untuk akun ini.', status: 404 }
  }

  return { koperasi_ref: profile.koperasi_ref, userId: userData.user.id, supabase }
}
