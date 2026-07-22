import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const kodeWilayah = searchParams.get('kode_wilayah')?.trim()

  if (!kodeWilayah) {
    return Response.json([])
  }

  const { data, error } = await supabase
    .from('referensi_komoditas_desa')
    .select('komoditas_ref, nama_komoditas')
    .eq('kode_wilayah', kodeWilayah)
    .order('nama_komoditas')

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data)
}
