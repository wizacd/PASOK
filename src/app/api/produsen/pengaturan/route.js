import { getAnggotaFromRequest } from '@/lib/server-auth'

export async function GET(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { anggota, userId, supabase } = result

  const { data: lokasi } = await supabase
    .from('anggota_lokasi')
    .select('alamat')
    .eq('anggota_ref', anggota.anggota_ref)
    .maybeSingle()

  const { data: authData } = await supabase.auth.admin.getUserById(userId)

  const { data: fullAnggota } = await supabase
    .from('anggota_koperasi')
    .select('nama, pekerjaan, telepon')
    .eq('anggota_ref', anggota.anggota_ref)
    .single()

  return Response.json({
    nama: fullAnggota?.nama ?? '',
    pekerjaan: fullAnggota?.pekerjaan ?? '',
    telepon: fullAnggota?.telepon ?? '',
    alamat: lokasi?.alamat ?? '',
    email: authData?.user?.email ?? '',
  })
}

export async function PATCH(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { anggota, supabase } = result
  const body = await request.json()
  const { nama, pekerjaan, telepon } = body

  if (!nama) {
    return Response.json({ error: 'Nama bisnis wajib diisi.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('anggota_koperasi')
    .update({ nama, pekerjaan: pekerjaan ?? null, telepon: telepon ?? null })
    .eq('anggota_ref', anggota.anggota_ref)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json({ success: true })
}
