import { createClient } from '@supabase/supabase-js'
import { hitungSkorMatching } from '@/lib/supply_matching'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

const HARI_LABEL = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const koperasi_ref = searchParams.get('koperasi_ref')

  if (!koperasi_ref) {
    return Response.json({ error: 'koperasi_ref wajib diisi' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('matching')
    .select(`
      id, status, created_at,
      penawaran (
        id, estimasi_volume, harga_ditawarkan,
        anggota_koperasi ( nama ),
        referensi_komoditas_desa ( nama_komoditas )
      )
    `)
    .eq('koperasi_ref', koperasi_ref)
    .in('status', ['diterima', 'selesai'])
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 400 })

  const rows = data
    .filter((m) => m.penawaran)
    .map((m) => ({
      matching_id: m.id,
      status: m.status,
      created_at: m.created_at,
      komoditas: m.penawaran.referensi_komoditas_desa?.nama_komoditas ?? 'Tidak diketahui',
      produsen: m.penawaran.anggota_koperasi?.nama ?? 'Produsen',
      volume_kg: m.penawaran.estimasi_volume ?? 0,
      harga_per_kg: m.penawaran.harga_ditawarkan ?? 0,
    }))

  const totalVolumeDiterimaKg = rows
    .filter((r) => r.status === 'diterima')
    .reduce((sum, r) => sum + r.volume_kg, 0)

  const transaksiSelesai = rows.filter((r) => r.status === 'selesai')
  const jumlahTransaksiSelesai = transaksiSelesai.length
  const totalNilaiSelesai = transaksiSelesai.reduce(
    (sum, r) => sum + r.volume_kg * r.harga_per_kg,
    0
  )

  const jumlahProdusen = new Set(rows.map((r) => r.produsen)).size

  const now = new Date()
  const tujuhHari = [...Array(7)].map((_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (6 - i))
    return { key: d.toISOString().slice(0, 10), label: HARI_LABEL[d.getDay()] }
  })
  const volumePerHari = new Map(tujuhHari.map((h) => [h.key, 0]))
  for (const r of rows) {
    const key = r.created_at.slice(0, 10)
    if (volumePerHari.has(key)) {
      volumePerHari.set(key, volumePerHari.get(key) + r.volume_kg)
    }
  }
  const trendMingguan = tujuhHari.map((h) => ({
    label: h.label,
    volume_kg: volumePerHari.get(h.key) ?? 0,
  }))

  const aktivitasTerbaru = rows.slice(0, 5)

  const { data: koperasiRow, error: errKop } = await supabase
    .from('profil_koperasi')
    .select('koordinat_dibulatkan, referensi_koperasi_wilayah(kode_wilayah)')
    .eq('koperasi_ref', koperasi_ref)
    .single()

  let penawaranMendekatiPanen = []
  if (!errKop && koperasiRow?.koordinat_dibulatkan) {
    const [kopLat, kopLng] = koperasiRow.koordinat_dibulatkan
      .split(',')
      .map((v) => parseFloat(v.trim()))
    const kodeWilayah = koperasiRow.referensi_koperasi_wilayah?.kode_wilayah

    const { data: komoditasWilayah } = await supabase
      .from('referensi_komoditas_desa')
      .select('nama_komoditas')
      .eq('kode_wilayah', kodeWilayah)
    const daftarKomoditasDibutuhkan = (komoditasWilayah ?? []).map((k) => k.nama_komoditas)

    const { data: penawaranList } = await supabase
      .from('penawaran')
      .select(`
        id, estimasi_volume, estimasi_tanggal_panen,
        anggota_koperasi ( nama, anggota_lokasi ( lokasi_lat, lokasi_lng ) ),
        referensi_komoditas_desa ( nama_komoditas )
      `)
      .eq('status', 'tersedia')

    penawaranMendekatiPanen = (penawaranList ?? [])
      .filter((p) => p.anggota_koperasi?.anggota_lokasi)
      .map((p) => {
        const skor = hitungSkorMatching({
          lokasiProdusen: {
            lat: p.anggota_koperasi.anggota_lokasi.lokasi_lat,
            lon: p.anggota_koperasi.anggota_lokasi.lokasi_lng,
          },
          lokasiKoperasi: { lat: kopLat, lon: kopLng },
          komoditasDitawarkan: p.referensi_komoditas_desa?.nama_komoditas ?? '',
          komoditasDibutuhkan: daftarKomoditasDibutuhkan,
          volumeDitawarkan: p.estimasi_volume,
        })
        return {
          id: p.id,
          produsen: p.anggota_koperasi?.nama ?? 'Produsen',
          komoditas: p.referensi_komoditas_desa?.nama_komoditas ?? 'Tidak diketahui',
          volume_kg: p.estimasi_volume,
          estimasi_tanggal_panen: p.estimasi_tanggal_panen,
          layak_ditampilkan: skor.layak_ditampilkan,
        }
      })
      .filter((p) => p.layak_ditampilkan)
      .sort(
        (a, b) =>
          new Date(a.estimasi_tanggal_panen).getTime() -
          new Date(b.estimasi_tanggal_panen).getTime()
      )
      .slice(0, 3)
  }

  return Response.json(
    {
      ringkasan: {
        totalVolumeDiterimaKg,
        jumlahTransaksiSelesai,
        totalNilaiSelesai,
        jumlahProdusen,
      },
      trendMingguan,
      aktivitasTerbaru,
      penawaranMendekatiPanen,
    },
    { status: 200 }
  )
}
