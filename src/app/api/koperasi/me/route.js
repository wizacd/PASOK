import { getKoperasiFromRequest } from '@/lib/server-auth'

export async function GET(request) {
  const result = await getKoperasiFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }
  const { koperasi_ref, userId, supabase } = result

  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', userId)
    .single()

  const { data: koperasiRow } = await supabase
    .from('profil_koperasi')
    .select('nama_koperasi')
    .eq('koperasi_ref', koperasi_ref)
    .single()

  return Response.json(
    {
      nama: profile?.name || 'Pengguna',
      nama_koperasi: koperasiRow?.nama_koperasi ?? '',
      koperasi_ref,
    },
    { status: 200 }
  )
}
