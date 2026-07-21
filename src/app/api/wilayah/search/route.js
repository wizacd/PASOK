import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 3) {
    return Response.json([])
  }

  const { data, error } = await supabase
    .from('referensi_wilayah')
    .select('kode_wilayah, provinsi, kab_kota, kecamatan, desa_kelurahan')
    .or(`kab_kota.ilike.%${q}%,kecamatan.ilike.%${q}%,desa_kelurahan.ilike.%${q}%`)
    .limit(8)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data)
}
