import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const komoditas_ref = searchParams.get('komoditas_ref')

  const { data: komoditas, error: errKomoditas } = await supabase
    .from('referensi_komoditas_desa')
    .select('nama_komoditas')
    .eq('komoditas_ref', komoditas_ref)
    .single()
  if (errKomoditas) return Response.json({ error: errKomoditas.message }, { status: 400 })

  const { data: penawaranList, error: errPenawaran } = await supabase
    .from('penawaran')
    .select('harga_ditawarkan')
    .eq('komoditas_ref', komoditas_ref)
    .eq('status', 'tersedia')
    .not('harga_ditawarkan', 'is', null)
  if (errPenawaran) return Response.json({ error: errPenawaran.message }, { status: 400 })

  const { data: acuanRow } = await supabase
    .from('harga_acuan_pemerintah')
    .select('harga_acuan, sumber')
    .eq('komoditas_ref', komoditas_ref)
    .order('tanggal_berlaku', { ascending: false })
    .limit(1)
    .maybeSingle()

  const hargaPasarLokal = penawaranList.length > 0
    ? penawaranList.reduce((sum, p) => sum + p.harga_ditawarkan, 0) / penawaranList.length
    : null
  const hargaAcuan = acuanRow?.harga_acuan ?? null

  let hargaRekomendasi, metode
  if (hargaAcuan !== null && hargaPasarLokal !== null) {
    hargaRekomendasi = Math.round(0.4 * hargaAcuan + 0.6 * hargaPasarLokal)
    metode = 'Kombinasi 40% harga acuan pemerintah + 60% rata-rata harga transaksi sekitar'
  } else if (hargaPasarLokal !== null) {
    hargaRekomendasi = Math.round(hargaPasarLokal)
    metode = 'Rata-rata harga transaksi sekitar (belum ada data harga acuan pemerintah)'
  } else if (hargaAcuan !== null) {
    hargaRekomendasi = hargaAcuan
    metode = 'Harga acuan pemerintah (belum ada data transaksi sekitar)'
  } else {
    return Response.json({ error: 'Belum ada data harga buat komoditas ini' }, { status: 404 })
  }

  return Response.json({
    komoditas_ref,
    nama_komoditas: komoditas.nama_komoditas,
    harga_rekomendasi: hargaRekomendasi,
    harga_acuan_pemerintah: hargaAcuan,
    sumber_acuan: acuanRow?.sumber ?? null,
    rata_rata_harga_lokal: hargaPasarLokal ? Math.round(hargaPasarLokal) : null,
    jumlah_data_lokal: penawaranList.length,
    metode
  }, { status: 200 })
}