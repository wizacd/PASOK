export async function hitungHargaRekomendasi(supabase, komoditasRef) {
  const { data: penawaranList } = await supabase
    .from('penawaran')
    .select('harga_ditawarkan')
    .eq('komoditas_ref', komoditasRef)
    .eq('status', 'tersedia')
    .not('harga_ditawarkan', 'is', null)

  const { data: acuanRow } = await supabase
    .from('harga_acuan_pemerintah')
    .select('harga_acuan, sumber')
    .eq('komoditas_ref', komoditasRef)
    .order('tanggal_berlaku', { ascending: false })
    .limit(1)
    .maybeSingle()

  const hargaPasarLokal = penawaranList && penawaranList.length > 0
    ? penawaranList.reduce((sum, p) => sum + p.harga_ditawarkan, 0) / penawaranList.length
    : null
  const hargaAcuan = acuanRow?.harga_acuan ?? null

  if (hargaAcuan !== null && hargaPasarLokal !== null) {
    return {
      harga_rekomendasi: Math.round(0.4 * hargaAcuan + 0.6 * hargaPasarLokal),
      metode: 'Kombinasi 40% harga acuan pemerintah + 60% rata-rata harga transaksi sekitar',
    }
  }
  if (hargaPasarLokal !== null) {
    return {
      harga_rekomendasi: Math.round(hargaPasarLokal),
      metode: 'Rata-rata harga transaksi sekitar (belum ada data harga acuan pemerintah)',
    }
  }
  if (hargaAcuan !== null) {
    return {
      harga_rekomendasi: hargaAcuan,
      metode: 'Harga acuan pemerintah (belum ada data transaksi sekitar)',
    }
  }
  return { harga_rekomendasi: null, metode: 'Belum ada data harga untuk komoditas ini' }
}
