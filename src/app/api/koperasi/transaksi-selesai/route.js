import { getKoperasiFromRequest } from '@/lib/server-auth'

export async function GET(request) {
  const result = await getKoperasiFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }
  const { koperasi_ref, supabase } = result

  const { data, error } = await supabase
    .from('matching')
    .select(`
      id, created_at,
      penawaran (
        id, estimasi_volume, harga_ditawarkan,
        anggota_koperasi ( nama ),
        referensi_komoditas_desa ( nama_komoditas )
      )
    `)
    .eq('koperasi_ref', koperasi_ref)
    .eq('status', 'selesai')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 400 })

  const items = data
    .filter((m) => m.penawaran)
    .map((m) => ({
      matching_id: m.id,
      tanggal: m.created_at,
      produsen: m.penawaran.anggota_koperasi?.nama ?? 'Produsen',
      komoditas: m.penawaran.referensi_komoditas_desa?.nama_komoditas ?? 'Tidak diketahui',
      volume_kg: m.penawaran.estimasi_volume ?? 0,
      total_harga: (m.penawaran.estimasi_volume ?? 0) * (m.penawaran.harga_ditawarkan ?? 0),
    }))

  const totalNilai = items.reduce((sum, i) => sum + i.total_harga, 0)
  const jumlahTransaksi = items.length
  const jumlahProdusen = new Set(items.map((i) => i.produsen)).size
  const rataRataNilai = jumlahTransaksi > 0 ? Math.round(totalNilai / jumlahTransaksi) : 0

  return Response.json(
    {
      items,
      ringkasan: {
        totalNilai,
        jumlahTransaksi,
        jumlahProdusen,
        rataRataNilai,
      },
    },
    { status: 200 }
  )
}
