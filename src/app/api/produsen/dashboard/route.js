import { getAnggotaFromRequest } from '@/lib/server-auth'
import { hitungHargaRekomendasi } from '@/lib/harga'

export async function GET(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { anggota, supabase } = result

  const { data: penawaranList, error: errPenawaran } = await supabase
    .from('penawaran')
    .select(`
      id, estimasi_volume, harga_ditawarkan, estimasi_tanggal_panen, status, created_at, komoditas_ref,
      referensi_komoditas_desa ( nama_komoditas )
    `)
    .eq('anggota_ref', anggota.anggota_ref)
    .order('created_at', { ascending: false })

  if (errPenawaran) {
    return Response.json({ error: errPenawaran.message }, { status: 400 })
  }

  const menunggu = penawaranList.filter((p) => p.status === 'tersedia').length
  const diterima = penawaranList.filter((p) => p.status === 'matched' || p.status === 'terjual').length

  const komoditasUnik = Array.from(new Set(penawaranList.map((p) => p.komoditas_ref))).slice(0, 2)
  const hargaRekomendasi = []
  for (const komoditasRef of komoditasUnik) {
    const row = penawaranList.find((p) => p.komoditas_ref === komoditasRef)
    const rekomendasi = await hitungHargaRekomendasi(supabase, komoditasRef)
    hargaRekomendasi.push({
      komoditas_ref: komoditasRef,
      nama_komoditas: row?.referensi_komoditas_desa?.nama_komoditas ?? 'Komoditas',
      ...rekomendasi,
    })
  }

  return Response.json({
    nama: anggota.nama,
    ringkasan: { menunggu, diterima },
    penawaran: penawaranList,
    harga_rekomendasi: hargaRekomendasi,
  })
}
