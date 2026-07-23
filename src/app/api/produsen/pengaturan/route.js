import { getAnggotaFromRequest } from '@/lib/server-auth'

const DEFAULT_PREFERENSI_NOTIFIKASI = {
  harga_komoditas: true,
  status_penawaran: true,
  informasi_koperasi: false,
  laporan_mingguan: true,
  keamanan_akun: true,
}

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
    .select('nama, pekerjaan, telepon, preferensi_notifikasi, bank_name, nomor_rekening')
    .eq('anggota_ref', anggota.anggota_ref)
    .single()

  return Response.json({
    nama: fullAnggota?.nama ?? '',
    pekerjaan: fullAnggota?.pekerjaan ?? '',
    telepon: fullAnggota?.telepon ?? '',
    alamat: lokasi?.alamat ?? '',
    email: authData?.user?.email ?? '',
    preferensi_notifikasi: fullAnggota?.preferensi_notifikasi ?? DEFAULT_PREFERENSI_NOTIFIKASI,
    bank_name: fullAnggota?.bank_name ?? '',
    nomor_rekening: fullAnggota?.nomor_rekening ?? '',
  })
}

export async function PATCH(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  const { anggota, supabase } = result
  const body = await request.json()

  if (body.preferensi_notifikasi) {
    const { error } = await supabase
      .from('anggota_koperasi')
      .update({ preferensi_notifikasi: body.preferensi_notifikasi })
      .eq('anggota_ref', anggota.anggota_ref)

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ success: true })
  }

  if ('bank_name' in body || 'nomor_rekening' in body) {
    const { error } = await supabase
      .from('anggota_koperasi')
      .update({
        bank_name: body.bank_name || null,
        nomor_rekening: body.nomor_rekening || null,
      })
      .eq('anggota_ref', anggota.anggota_ref)

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ success: true })
  }

  const { nama, pekerjaan, telepon } = body

  if (!nama) {
    return Response.json({ error: 'Nama bisnis wajib diisi.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('anggota_koperasi')
    .update({ nama, pekerjaan: pekerjaan || null, telepon: telepon || null })
    .eq('anggota_ref', anggota.anggota_ref)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json({ success: true })
}
