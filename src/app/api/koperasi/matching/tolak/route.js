import { getKoperasiFromRequest } from '@/lib/server-auth'

export async function POST(request) {
  const result = await getKoperasiFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { koperasi_ref, supabase } = result
  const body = await request.json()
  const { penawaran_id } = body

  if (!penawaran_id) {
    return Response.json({ error: 'penawaran_id wajib diisi' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('matching')
    .insert({ penawaran_id, koperasi_ref, skor_matching: null, status: 'ditolak' })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data, { status: 201 })
}
