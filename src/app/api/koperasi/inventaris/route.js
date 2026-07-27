import { createClient } from '@supabase/supabase-js'

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

  const { data, error } = await supabase
    .from('matching')
    .select(`
      id, created_at,
      penawaran (
        id, estimasi_volume, harga_ditawarkan, estimasi_tanggal_panen,
        anggota_koperasi ( nama ),
        referensi_komoditas_desa ( nama_komoditas )
      )
    `)
    .eq('koperasi_ref', koperasi_ref)
    .eq('status', 'diterima')

  if (error) return Response.json({ error: error.message }, { status: 400 })

  const items = data
    .filter((m) => m.penawaran)
    .map((m) => ({
      matching_id: m.id,
      penawaran_id: m.penawaran.id,
      komoditas: m.penawaran.referensi_komoditas_desa?.nama_komoditas ?? 'Tidak diketahui',
      produsen: m.penawaran.anggota_koperasi?.nama ?? 'Produsen',
      volume_kg: m.penawaran.estimasi_volume,
      harga_per_kg: m.penawaran.harga_ditawarkan,
      tanggal_panen: m.penawaran.estimasi_tanggal_panen,
      diterima_pada: m.created_at,
    }))
    .sort((a, b) => new Date(b.diterima_pada).getTime() - new Date(a.diterima_pada).getTime())

  const totalVolumeKg = items.reduce((sum, i) => sum + (i.volume_kg ?? 0), 0)
  const totalNilai = items.reduce((sum, i) => sum + (i.volume_kg ?? 0) * (i.harga_per_kg ?? 0), 0)
  const jumlahProdusen = new Set(items.map((i) => i.produsen)).size

  const volumePerKomoditas = new Map()
  for (const i of items) {
    volumePerKomoditas.set(i.komoditas, (volumePerKomoditas.get(i.komoditas) ?? 0) + (i.volume_kg ?? 0))
  }
  const breakdownKomoditas = [...volumePerKomoditas.entries()]
    .map(([nama, volume_kg]) => ({
      nama,
      volume_kg,
      persen: totalVolumeKg > 0 ? Math.round((volume_kg / totalVolumeKg) * 100) : 0,
    }))
    .sort((a, b) => b.volume_kg - a.volume_kg)

  return Response.json(
    {
      items,
      ringkasan: {
        totalVolumeKg,
        totalNilai,
        jumlahLot: items.length,
        jumlahProdusen,
        breakdownKomoditas,
      },
    },
    { status: 200 }
  )
}
