import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { matching_id, driver, kendaraan, grade, berat_final } = body

  if (!matching_id || !berat_final) {
    return Response.json({ error: 'matching_id dan berat_final wajib diisi' }, { status: 400 })
  }

  const { data: matching, error: errMatching } = await supabase
    .from('matching')
    .select(`
      id, koperasi_ref, status,
      penawaran (
        id, harga_ditawarkan,
        anggota_koperasi ( nama, anggota_lokasi ( alamat ) ),
        referensi_komoditas_desa ( nama_komoditas )
      )
    `)
    .eq('id', matching_id)
    .single()
  if (errMatching) return Response.json({ error: errMatching.message }, { status: 400 })
  if (matching.status !== 'diterima') {
    return Response.json({ error: 'Transaksi ini sudah tidak berstatus diterima' }, { status: 400 })
  }

  const namaProduk = matching.penawaran?.referensi_komoditas_desa?.nama_komoditas ?? 'Tidak diketahui'
  const hargaBeli = matching.penawaran?.harga_ditawarkan ?? 0
  const jumlahMasuk = Number(berat_final)

  let { data: produk } = await supabase
    .from('produk_koperasi')
    .select('produk_sample_id')
    .eq('koperasi_ref', matching.koperasi_ref)
    .eq('nama_produk', namaProduk)
    .maybeSingle()

  if (!produk) {
    const { data: produkBaru, error: errProduk } = await supabase
      .from('produk_koperasi')
      .insert({ koperasi_ref: matching.koperasi_ref, nama_produk: namaProduk, unit: 'kg' })
      .select('produk_sample_id')
      .single()
    if (errProduk) return Response.json({ error: errProduk.message }, { status: 400 })
    produk = produkBaru
  }

  const { data: barangMasuk, error: errBarang } = await supabase
    .from('barang_masuk_produk')
    .insert({
      produk_sample_id: produk.produk_sample_id,
      koperasi_ref: matching.koperasi_ref,
      nama_produk: namaProduk,
      jumlah_masuk: jumlahMasuk,
      jumlah_tersedia: jumlahMasuk,
      harga_beli: hargaBeli,
      status: 'Approved',
    })
    .select()
    .single()
  if (errBarang) return Response.json({ error: errBarang.message }, { status: 400 })

  const { data: inventarisAda } = await supabase
    .from('inventaris_produk')
    .select('*')
    .eq('produk_sample_id', produk.produk_sample_id)
    .eq('koperasi_ref', matching.koperasi_ref)
    .maybeSingle()

  if (inventarisAda) {
    await supabase
      .from('inventaris_produk')
      .update({ stok: inventarisAda.stok + jumlahMasuk })
      .eq('inventaris_ref', inventarisAda.inventaris_ref)
  } else {
    await supabase.from('inventaris_produk').insert({
      produk_sample_id: produk.produk_sample_id,
      koperasi_ref: matching.koperasi_ref,
      nama_produk: namaProduk,
      stok: jumlahMasuk,
    })
  }

  const { data: jenisDokumen } = await supabase
    .from('referensi_dokumen_koperasi')
    .select('jenis_dokumen_ref')
    .eq('nama_dokumen', 'Surat Jalan Pasokan')
    .single()

  const nomorSurat = 'SJ-' + Date.now()
  const { data: suratJalan, error: errSurat } = await supabase
    .from('dokumen_koperasi')
    .insert({
      koperasi_ref: matching.koperasi_ref,
      jenis_dokumen_ref: jenisDokumen?.jenis_dokumen_ref,
      nomor: nomorSurat,
      tanggal_berlaku: new Date().toISOString().slice(0, 10),
      unggahan_dokumen: null,
    })
    .select()
    .single()
  if (errSurat) return Response.json({ error: errSurat.message }, { status: 400 })

  await supabase.from('matching').update({ status: 'selesai' }).eq('id', matching_id)
  await supabase.from('penawaran').update({ status: 'terjual' }).eq('id', matching.penawaran.id)

  return Response.json(
    {
      nomor_dokumen: nomorSurat,
      produsen: matching.penawaran?.anggota_koperasi?.nama ?? 'Produsen',
      alamat_produsen: matching.penawaran?.anggota_koperasi?.anggota_lokasi?.alamat ?? null,
      komoditas: namaProduk,
      driver: driver || null,
      kendaraan: kendaraan || null,
      grade: grade || null,
      berat_final: jumlahMasuk,
      barang_masuk: barangMasuk,
      surat_jalan: suratJalan,
    },
    { status: 201 }
  )
}
