import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { kode_wilayah, nama_koperasi, bentuk_koperasi, kategori_usaha, alamat_lengkap, kode_pos, lat, lng } = body

  const { data: wilayahRow, error: errWilayah } = await supabase
    .from('referensi_koperasi_wilayah')
    .insert({ kode_wilayah })
    .select()
    .single()

  if (errWilayah) {
    return Response.json({ error: errWilayah.message }, { status: 400 })
  }

  const { data: profil, error: errProfil } = await supabase
    .from('profil_koperasi')
    .insert({
      koperasi_ref: wilayahRow.koperasi_ref,
      nama_koperasi,
      bentuk_koperasi,
      kategori_usaha,
      alamat_lengkap,
      kode_pos,
      koordinat_dibulatkan: `${lat}, ${lng}`
    })
    .select()
    .single()

  if (errProfil) {
    return Response.json({ error: errProfil.message }, { status: 400 })
  }

  return Response.json(profil, { status: 201 })
}