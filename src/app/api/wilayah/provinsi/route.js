import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET() {
  const { data, error } = await supabase
    .from('referensi_wilayah')
    .select('provinsi')
    .order('provinsi')
    .range(0, 49999)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  const provinsi = Array.from(new Set(data.map((row) => row.provinsi)))
  return Response.json(provinsi)
}
