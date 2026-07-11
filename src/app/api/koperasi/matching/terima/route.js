import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { penawaran_id, koperasi_ref, skor_matching } = body

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