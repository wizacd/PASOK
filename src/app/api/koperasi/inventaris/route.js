import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const koperasi_ref = searchParams.get('koperasi_ref')

  if (!koperasi_ref) {
    return Response.json({ error: 'koperasi_ref wajib diisi' }, { status: 400 })
  }

  const { data: lots, error: errLots } = await supabase
    .from('barang_masuk_produk')
    .select('barang_masuk_ref, nama_produk, jumlah_masuk, jumlah_tersedia, harga_beli, total_biaya, status, tanggal_masuk')
    .eq('koperasi_ref', koperasi_ref)
    .order('tanggal_masuk', { ascending: false })
  if (errLots) return Response.json({ error: errLots.message }, { status: 400 })

  const { data: stokProduk, error: errStok } = await supabase
    .from('inventaris_produk')
    .select('nama_produk, stok')
    .eq('koperasi_ref', koperasi_ref)
  if (errStok) return Response.json({ error: errStok.message }, { status: 400 })

  const items = lots.map((l) => ({
    barang_masuk_ref: l.barang_masuk_ref,
    komoditas: l.nama_produk,
    jumlah_masuk_kg: l.jumlah_masuk,
    jumlah_tersedia_kg: l.jumlah_tersedia,
    harga_beli_per_kg: l.harga_beli,
    total_biaya: l.total_biaya,
    status: l.status,
    tanggal_masuk: l.tanggal_masuk,
  }))

  const totalVolumeKg = stokProduk.reduce((sum, p) => sum + (p.stok ?? 0), 0)
  const totalNilai = lots.reduce(
    (sum, l) => sum + (l.jumlah_tersedia ?? 0) * (l.harga_beli ?? 0),
    0
  )
  const jumlahJenisProduk = stokProduk.length

  const breakdownKomoditas = stokProduk
    .map((p) => ({
      nama: p.nama_produk,
      volume_kg: p.stok,
      persen: totalVolumeKg > 0 ? Math.round((p.stok / totalVolumeKg) * 100) : 0,
    }))
    .sort((a, b) => b.volume_kg - a.volume_kg)

  return Response.json(
    {
      items,
      ringkasan: {
        totalVolumeKg,
        totalNilai,
        jumlahLot: lots.length,
        jumlahJenisProduk,
        breakdownKomoditas,
      },
    },
    { status: 200 }
  )
}
