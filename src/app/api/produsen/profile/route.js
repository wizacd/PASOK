import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { koperasi_ref, nama, kode_wilayah, jenis_kelamin, pekerjaan, lokasi_lat, lokasi_lng } = body

  const { data: anggota, error: errAnggota } = await supabase
    .from('anggota_koperasi')
    .insert({ koperasi_ref, nama, kode_wilayah, jenis_kelamin, pekerjaan })
    .select()
    .single()

  if (errAnggota) {
    return Response.json({ error: errAnggota.message }, { status: 400 })
  }

  const { data: lokasi, error: errLokasi } = await supabase
    .from('anggota_lokasi')
    .insert({ anggota_ref: anggota.anggota_ref, lokasi_lat, lokasi_lng })
    .select()
    .single()

  if (errLokasi) {
    return Response.json({ error: errLokasi.message }, { status: 400 })
  }

  return Response.json({ ...anggota, ...lokasi }, { status: 201 })
}