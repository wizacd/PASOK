import { getAnggotaFromRequest } from '@/lib/server-auth'

export async function POST(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { anggota, supabase } = result
  const body = await request.json()
  const { komoditas_ref, estimasi_volume, estimasi_tanggal_panen, harga_ditawarkan } = body

  if (!komoditas_ref || !estimasi_volume || !estimasi_tanggal_panen || !harga_ditawarkan) {
    return Response.json({ error: 'Lengkapi semua data sebelum mengirim penawaran.' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('penawaran')
    .insert({
      anggota_ref: anggota.anggota_ref,
      komoditas_ref,
      estimasi_volume,
      estimasi_tanggal_panen,
      harga_ditawarkan,
    })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data, { status: 201 })
}