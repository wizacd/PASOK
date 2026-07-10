import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { koperasi_ref, nama_produk, unit, kode_barcode } = body

  const { data, error } = await supabase
    .from('produk_koperasi')
    .insert({ koperasi_ref, nama_produk, unit, kode_barcode })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data, { status: 201 })
}