import { getKoperasiFromRequest } from '@/lib/server-auth'

export async function POST(request) {
  const result = await getKoperasiFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { koperasi_ref, supabase } = result
  const body = await request.json()
  const { penawaran_id, skor_matching } = body

  if (!penawaran_id) {
    return Response.json({ error: 'penawaran_id wajib diisi' }, { status: 400 })
  }

  const { data: matching, error: errMatching } = await supabase
    .from('matching')
    .insert({ penawaran_id, koperasi_ref, skor_matching, status: 'diterima' })
    .select()
    .single()

  if (errMatching) {
    return Response.json({ error: errMatching.message }, { status: 400 })
  }

  const { error: errUpdate } = await supabase
    .from('penawaran')
    .update({ status: 'matched' })
    .eq('id', penawaran_id)

  if (errUpdate) {
    return Response.json({ error: errUpdate.message }, { status: 400 })
  }

  return Response.json(matching, { status: 201 })
}