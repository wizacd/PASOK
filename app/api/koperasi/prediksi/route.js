import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const kode_wilayah = searchParams.get('kode_wilayah')

  const { data: komoditasWilayah, error: errKomoditas } = await supabase
    .from('referensi_komoditas_desa')
    .select('komoditas_ref, nama_komoditas')
    .eq('kode_wilayah', kode_wilayah)
  if (errKomoditas) return Response.json({ error: errKomoditas.message }, { status: 400 })

  const hasil = []

  for (const komoditas of komoditasWilayah) {
    const { data: penawaranList } = await supabase
      .from('penawaran')
      .select('estimasi_volume, estimasi_tanggal_panen')
      .eq('komoditas_ref', komoditas.komoditas_ref)

    const perBulanMap = {}
    penawaranList.forEach(p => {
      const bulan = p.estimasi_tanggal_panen.slice(0, 7)
      perBulanMap[bulan] = (perBulanMap[bulan] || 0) + p.estimasi_volume
    })

    const perBulan = Object.entries(perBulanMap)
      .map(([bulan, volume]) => ({ bulan, volume }))
      .sort((a, b) => a.bulan.localeCompare(b.bulan))

    let confidence = 'rendah'
    if (perBulan.length >= 3) confidence = 'tinggi'
    else if (perBulan.length === 2) confidence = 'sedang'

    hasil.push({
      komoditas_ref: komoditas.komoditas_ref,
      nama_komoditas: komoditas.nama_komoditas,
      total_volume_akan_panen: penawaranList.reduce((sum, p) => sum + p.estimasi_volume, 0),
      jumlah_penawaran: penawaranList.length,
      confidence,
      per_bulan: perBulan,
      metode: 'Agregat volume penawaran aktif per bulan panen'
    })
  }

  return Response.json(hasil, { status: 200 })
}