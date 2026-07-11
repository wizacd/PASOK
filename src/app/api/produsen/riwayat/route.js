import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const anggota_ref = searchParams.get('anggota_ref')

  const { data, error } = await supabase
    .from('penawaran')
    .select(`
      id, estimasi_volume, harga_ditawarkan, estimasi_tanggal_panen, status, created_at,
      referensi_komoditas_desa ( nama_komoditas )
    `)
    .eq('anggota_ref', anggota_ref)
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 400 })

  return Response.json(data, { status: 200 })
}