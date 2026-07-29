import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const kodeWilayah = searchParams.get('kode_wilayah')?.trim()

  if (!kodeWilayah) {
    return Response.json({ jumlah_produsen: 0 })
  }

  const { count, error } = await supabase
    .from('anggota_koperasi')
    .select('anggota_ref', { count: 'exact', head: true })
    .eq('kode_wilayah', kodeWilayah)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json({ jumlah_produsen: count ?? 0 })
}
