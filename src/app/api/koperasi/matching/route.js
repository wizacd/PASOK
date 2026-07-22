import { createClient } from '@supabase/supabase-js'
import { hitungSkorMatching } from '@/lib/supply_matching'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const koperasi_ref = searchParams.get('koperasi_ref')

  const { data: koperasiRow, error: errKop } = await supabase
    .from('profil_koperasi')
    .select('koordinat_dibulatkan, referensi_koperasi_wilayah(kode_wilayah)')
    .eq('koperasi_ref', koperasi_ref)
    .single()
  if (errKop) return Response.json({ error: errKop.message }, { status: 400 })

  if (!koperasiRow.koordinat_dibulatkan) {
    return Response.json(
      { error: 'Koperasi ini belum punya data koordinat lokasi, jadi supply matching belum bisa dihitung.' },
      { status: 422 }
    )
  }

  const [kopLat, kopLng] = koperasiRow.koordinat_dibulatkan.split(',').map(v => parseFloat(v.trim()))
  const kodeWilayah = koperasiRow.referensi_koperasi_wilayah.kode_wilayah

  const { data: komoditasWilayah } = await supabase
    .from('referensi_komoditas_desa')
    .select('nama_komoditas')
    .eq('kode_wilayah', kodeWilayah)
  const daftarKomoditasDibutuhkan = komoditasWilayah.map(k => k.nama_komoditas)

  const { data: penawaranList, error: errPenawaran } = await supabase
    .from('penawaran')
    .select(`
      id, estimasi_volume, harga_ditawarkan, estimasi_tanggal_panen, komoditas_ref,
      anggota_koperasi ( nama, anggota_lokasi ( lokasi_lat, lokasi_lng ) ),
      referensi_komoditas_desa ( nama_komoditas )
    `)
    .eq('status', 'tersedia')
  if (errPenawaran) return Response.json({ error: errPenawaran.message }, { status: 400 })

  const hasil = penawaranList
    .filter(p => p.anggota_koperasi?.anggota_lokasi)
    .map(p => {
      const skor = hitungSkorMatching({
        lokasiProdusen: { lat: p.anggota_koperasi.anggota_lokasi.lokasi_lat, lon: p.anggota_koperasi.anggota_lokasi.lokasi_lng },
        lokasiKoperasi: { lat: kopLat, lon: kopLng },
        komoditasDitawarkan: p.referensi_komoditas_desa.nama_komoditas,
        komoditasDibutuhkan: daftarKomoditasDibutuhkan,
        volumeDitawarkan: p.estimasi_volume,
        volumeDibutuhkan: null
      })
      return { ...p, ...skor }
    })
    .filter(p => p.layak_ditampilkan)
    .sort((a, b) => b.skor_total - a.skor_total)

  return Response.json(hasil, { status: 200 })
}