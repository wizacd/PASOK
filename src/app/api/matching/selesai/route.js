import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { matching_id, produk_sample_id, jumlah_masuk, harga_beli } = body

  const { data: matching, error: errMatching } = await supabase
    .from('matching')
    .select('*, penawaran(*)')
    .eq('id', matching_id)
    .single()
  if (errMatching) return Response.json({ error: errMatching.message }, { status: 400 })

  const { data: barangMasuk, error: errBarang } = await supabase
    .from('barang_masuk_produk')
    .insert({
      produk_sample_id,
      koperasi_ref: matching.koperasi_ref,
      nama_produk: 'Cabai Merah',
      jumlah_masuk,
      jumlah_tersedia: jumlah_masuk,
      harga_beli,
      status: 'Approved'
    })
    .select()
    .single()
  if (errBarang) return Response.json({ error: errBarang.message }, { status: 400 })

  const { data: inventarisAda } = await supabase
    .from('inventaris_produk')
    .select('*')
    .eq('produk_sample_id', produk_sample_id)
    .eq('koperasi_ref', matching.koperasi_ref)
    .maybeSingle()

  if (inventarisAda) {
    await supabase
      .from('inventaris_produk')
      .update({ stok: inventarisAda.stok + jumlah_masuk })
      .eq('inventaris_ref', inventarisAda.inventaris_ref)
  } else {
    await supabase
      .from('inventaris_produk')
      .insert({ produk_sample_id, koperasi_ref: matching.koperasi_ref, nama_produk: 'Cabai Merah', stok: jumlah_masuk })
  }

  let { data: jenisDokumen } = await supabase
    .from('referensi_dokumen_koperasi')
    .select('jenis_dokumen_ref')
    .eq('nama_dokumen', 'Surat Jalan Pasokan')
    .single()

  const nomorSurat = 'SJ-' + Date.now()
  const { data: suratJalan, error: errSurat } = await supabase
    .from('dokumen_koperasi')
    .insert({
      koperasi_ref: matching.koperasi_ref,
      jenis_dokumen_ref: jenisDokumen.jenis_dokumen_ref,
      nomor: nomorSurat,
      unggahan_dokumen: null
    })
    .select()
    .single()
  if (errSurat) return Response.json({ error: errSurat.message }, { status: 400 })

  await supabase.from('matching').update({ status: 'selesai' }).eq('id', matching_id)
  await supabase.from('penawaran').update({ status: 'terjual' }).eq('id', matching.penawaran_id)

  return Response.json({ barang_masuk: barangMasuk, surat_jalan: suratJalan }, { status: 201 })
}