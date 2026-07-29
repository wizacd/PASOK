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
        anggota_koperasi ( nama, anggota_lokasi ( alamat ) ),
        referensi_komoditas_desa ( nama_komoditas )
      )
    `)
    .eq('koperasi_ref', koperasi_ref)
    .eq('status', 'diterima')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 400 })

  const items = data
    .filter((m) => m.penawaran)
    .map((m) => ({
      matching_id: m.id,
      produsen: m.penawaran.anggota_koperasi?.nama ?? 'Produsen',
      alamat_produsen: m.penawaran.anggota_koperasi?.anggota_lokasi?.alamat ?? null,
      komoditas: m.penawaran.referensi_komoditas_desa?.nama_komoditas ?? 'Tidak diketahui',
      volume_kg: m.penawaran.estimasi_volume,
      harga_per_kg: m.penawaran.harga_ditawarkan,
    }))

  const { data: koperasiRow } = await supabase
    .from('profil_koperasi')
    .select('nama_koperasi, alamat_lengkap')
    .eq('koperasi_ref', koperasi_ref)
    .single()

  return Response.json(
    {
      items,
      koperasi: {
        nama_koperasi: koperasiRow?.nama_koperasi ?? 'Koperasi',
        alamat_lengkap: koperasiRow?.alamat_lengkap ?? '',
      },
    },
    { status: 200 }
  )
}
