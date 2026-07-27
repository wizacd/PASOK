import { createClient } from '@supabase/supabase-js'
import { hitungJarakKm } from '@/lib/supply_matching'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const koperasi_ref = searchParams.get('koperasi_ref')

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
        telepon,
        anggota_lokasi ( lokasi_lat, lokasi_lng, alamat )
      ),
      referensi_komoditas_desa ( nama_komoditas )
    `)
    .eq('status', 'tersedia')

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  let kopLat = null
  let kopLng = null
  if (koperasi_ref) {
    const { data: koperasiRow } = await supabase
      .from('profil_koperasi')
      .select('koordinat_dibulatkan')
      .eq('koperasi_ref', koperasi_ref)
      .single()
    if (koperasiRow?.koordinat_dibulatkan) {
      ;[kopLat, kopLng] = koperasiRow.koordinat_dibulatkan.split(',').map((v) => parseFloat(v.trim()))
    }
  }

  const hasil = data
    .filter((p) => p.anggota_koperasi?.anggota_lokasi)
    .map((p) => {
      const lokasi = p.anggota_koperasi.anggota_lokasi
      const jarak_km =
        kopLat !== null && kopLng !== null
          ? Math.round(hitungJarakKm(kopLat, kopLng, lokasi.lokasi_lat, lokasi.lokasi_lng) * 10) / 10
          : null
      return { ...p, jarak_km }
    })

  return Response.json(hasil, { status: 200 })
}