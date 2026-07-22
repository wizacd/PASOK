import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const provinsi = searchParams.get('provinsi')?.trim()
  const kabKota = searchParams.get('kab_kota')?.trim()

  if (!provinsi || !kabKota) {
    return Response.json([])
  }

  const { data, error } = await supabase
    .from('referensi_wilayah')
    .select('kode_wilayah, kecamatan')
    .eq('provinsi', provinsi)
    .eq('kab_kota', kabKota)
    .order('kecamatan')
    .range(0, 49999)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  const seen = new Set()
  const kecamatan = []
  for (const row of data) {
    if (!seen.has(row.kecamatan)) {
      seen.add(row.kecamatan)
      kecamatan.push({ kode_wilayah: row.kode_wilayah, kecamatan: row.kecamatan })
    }
  }

  return Response.json(kecamatan)
}
