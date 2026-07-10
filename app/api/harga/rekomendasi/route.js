import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const komoditas_ref = searchParams.get('komoditas_ref')

  const { data: penawaranList, error } = await supabase
    .from('penawaran')
    .select('harga_ditawarkan, referensi_komoditas_desa(nama_komoditas)')
    .eq('komoditas_ref', komoditas_ref)
    .eq('status', 'tersedia')
    .not('harga_ditawarkan', 'is', null)

  if (error) return Response.json({ error: error.message }, { status: 400 })
  if (penawaranList.length === 0) {
    return Response.json({ error: 'Belum ada data harga buat komoditas ini' }, { status: 404 })
  }

  const rataRata = penawaranList.reduce((sum, p) => sum + p.harga_ditawarkan, 0) / penawaranList.length

  return Response.json({
    komoditas_ref,
    nama_komoditas: penawaranList[0].referensi_komoditas_desa.nama_komoditas,
    harga_rekomendasi: Math.round(rataRata),
    jumlah_data: penawaranList.length
  }, { status: 200 })
}