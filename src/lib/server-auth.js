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
