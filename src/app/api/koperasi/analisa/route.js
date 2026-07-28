import { createClient } from '@supabase/supabase-js'
import { hitungHargaRekomendasi } from '@/lib/harga'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const koperasi_ref = searchParams.get('koperasi_ref')

  if (!koperasi_ref) {
    return Response.json({ error: 'koperasi_ref wajib diisi' }, { status: 400 })
  }

  const { data: koperasiRow, error: errKop } = await supabase
    .from('profil_koperasi')
    .select('referensi_koperasi_wilayah(kode_wilayah)')
    .eq('koperasi_ref', koperasi_ref)
    .single()
  if (errKop) return Response.json({ error: errKop.message }, { status: 400 })

  const kodeWilayah = koperasiRow.referensi_koperasi_wilayah?.kode_wilayah
  if (!kodeWilayah) {
    return Response.json({ komoditas: [] }, { status: 200 })
  }

  const { data: komoditasWilayah, error: errKomoditas } = await supabase
    .from('referensi_komoditas_desa')
    .select('komoditas_ref, nama_komoditas')
    .eq('kode_wilayah', kodeWilayah)
  if (errKomoditas) return Response.json({ error: errKomoditas.message }, { status: 400 })

  const hasil = []
  for (const k of komoditasWilayah) {
    const { data: penawaranList } = await supabase
      .from('penawaran')
      .select('estimasi_volume, estimasi_tanggal_panen')
      .eq('komoditas_ref', k.komoditas_ref)
      .eq('status', 'tersedia')

    const perBulanMap = {}
    for (const p of penawaranList ?? []) {
      const bulan = p.estimasi_tanggal_panen.slice(0, 7)
      perBulanMap[bulan] = (perBulanMap[bulan] ?? 0) + p.estimasi_volume
    }
    const perBulan = Object.entries(perBulanMap)
      .map(([bulan, volume_kg]) => ({ bulan, volume_kg }))
      .sort((a, b) => a.bulan.localeCompare(b.bulan))

    let confidence = 'rendah'
    if (perBulan.length >= 3) confidence = 'tinggi'
    else if (perBulan.length === 2) confidence = 'sedang'

    const rekomendasiHarga = await hitungHargaRekomendasi(supabase, k.komoditas_ref)

    hasil.push({
      komoditas_ref: k.komoditas_ref,
      nama_komoditas: k.nama_komoditas,
      prediksi: {
        total_volume_akan_panen_kg: (penawaranList ?? []).reduce((sum, p) => sum + p.estimasi_volume, 0),
        jumlah_penawaran: (penawaranList ?? []).length,
        confidence,
        per_bulan: perBulan,
        metode: 'Agregat volume penawaran aktif per bulan panen',
      },
      harga: rekomendasiHarga,
    })
  }

  return Response.json({ komoditas: hasil }, { status: 200 })
}
