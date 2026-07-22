import { getAnggotaFromRequest } from '@/lib/server-auth'
import { hitungHargaRekomendasi } from '@/lib/harga'

export async function GET(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { anggota, supabase } = result

  const { data: komoditasList, error: errKomoditas } = await supabase
    .from('referensi_komoditas_desa')
    .select('komoditas_ref, nama_komoditas')
    .eq('kode_wilayah', anggota.kode_wilayah)
    .order('nama_komoditas')

  if (errKomoditas) {
    return Response.json({ error: errKomoditas.message }, { status: 400 })
  }

  const harga = []
  for (const row of komoditasList) {
    const rekomendasi = await hitungHargaRekomendasi(supabase, row.komoditas_ref)
    harga.push({
      komoditas_ref: row.komoditas_ref,
      nama_komoditas: row.nama_komoditas,
      ...rekomendasi,
    })
  }

  return Response.json({ harga })
}
