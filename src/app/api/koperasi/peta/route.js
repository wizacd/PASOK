import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET() {
  const { data, error } = await supabase
    .from('penawaran')
    .select(`
      id,
      estimasi_volume,
      estimasi_tanggal_panen,
      harga_ditawarkan,
      status,
      anggota_koperasi (
        anggota_ref,
        nama,
        pekerjaan,
        anggota_lokasi ( lokasi_lat, lokasi_lng )
      ),
      referensi_komoditas_desa ( nama_komoditas )
    `)
    .eq('status', 'tersedia')

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data, { status: 200 })
}