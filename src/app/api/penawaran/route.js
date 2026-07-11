import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { anggota_ref, komoditas_ref, estimasi_volume, estimasi_tanggal_panen, harga_ditawarkan } = body

  const { data, error } = await supabase
    .from('penawaran')
    .insert({ anggota_ref, komoditas_ref, estimasi_volume, estimasi_tanggal_panen, harga_ditawarkan })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data, { status: 201 })
}