import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const provinsi = searchParams.get('provinsi')?.trim()

  if (!provinsi) {
    return Response.json([])
  }

  const { data, error } = await supabase
    .from('referensi_wilayah')
    .select('kab_kota')
    .eq('provinsi', provinsi)
    .order('kab_kota')
    .range(0, 49999)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  const kabKota = Array.from(new Set(data.map((row) => row.kab_kota)))
  return Response.json(kabKota)
}
