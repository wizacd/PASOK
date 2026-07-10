'use client'

import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState('')

  async function testRegisterKoperasi() {
    setResult('Mendaftarkan...')
    const res = await fetch('/api/koperasi/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kode_wilayah: '32.01.01.2001',
        nama_koperasi: 'Koperasi Desa Bendungan',
        bentuk_koperasi: 'Koperasi Produsen',
        kategori_usaha: 'Pertanian',
        alamat_lengkap: 'Jl. Raya Bendungan No. 1',
        kode_pos: '16720',
        lat: -6.65,
        lng: 106.85
      })
    })
    const data = await res.json()
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Test Endpoint Koperasi</h1>
      <button onClick={testRegisterKoperasi} style={{ padding: '10px 20px', fontSize: 16 }}>
        Test Register Koperasi
      </button>
      <button onClick={testRegisterProdusen} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Register Produsen
      </button>
      <button onClick={testInputPenawaran} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Input Penawaran
      </button>
      <button onClick={testPeta} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Peta
      </button>
      <button onClick={testMatching} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Matching
      </button>
      <button onClick={testTerimaMatching} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Terima Matching
      </button>
      <button onClick={testBuatProduk} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Buat Produk
      </button>
      <button onClick={testTransaksiSelesai} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Transaksi Selesai
      </button>
      <button onClick={testHargaRekomendasi} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Harga Rekomendasi
      </button>
      <button onClick={testRiwayat} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Riwayat
      </button>
      <button onClick={testPrediksi} style={{ padding: '10px 20px', fontSize: 16, marginLeft: 10 }}>
        Test Prediksi
      </button>
      <pre>{result}</pre>
    </main>
  )

  async function testRegisterProdusen() {
  setResult('Mendaftarkan produsen...')
  const res = await fetch('/api/produsen/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      koperasi_ref: 'KOP-388910EE548D6A22', 
      nama: 'Pak Budi',
      kode_wilayah: '32.01.01.2001',
      jenis_kelamin: 'LAKI-LAKI',
      pekerjaan: 'Petani',
      lokasi_lat: -6.652,
      lokasi_lng: 106.851
    })
  })
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testInputPenawaran() {
  setResult('Menyimpan penawaran...')
  const res = await fetch('/api/penawaran', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      anggota_ref: '0E465AB0EB8FAF6D', 
      komoditas_ref: '6B6142ADA0D49113', 
      estimasi_volume: 500,
      estimasi_tanggal_panen: '2026-08-15',
      harga_ditawarkan: 8500
    })
  })
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testPeta() {
  setResult('Mengambil data peta...')
  const res = await fetch('/api/koperasi/peta')
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testMatching() {
  setResult('Menghitung matching...')
  const res = await fetch('/api/koperasi/matching?koperasi_ref=KOP-388910EE548D6A22')
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testTerimaMatching() {
  setResult('Menerima matching...')
  const res = await fetch('/api/koperasi/matching/terima', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      penawaran_id: '77dcd3bc-7488-4b0b-a593-65472406e51f', 
      koperasi_ref: 'KOP-388910EE548D6A22', // ganti sesuai koperasi_ref kamu
      skor_matching: 1
    })
  })
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testBuatProduk() {
  setResult('Membuat produk...')
  const res = await fetch('/api/koperasi/produk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      koperasi_ref: 'KOP-388910EE548D6A22', // sesuaikan punya kamu
      nama_produk: 'Cabai Merah',
      unit: 'kg',
      kode_barcode: null
    })
  })
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testTransaksiSelesai() {
  setResult('Memproses transaksi...')
  const res = await fetch('/api/matching/selesai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matching_id: 'ff2d6555-e90e-4d65-a80d-0ddc0a78fded', // ganti sesuai id matching kamu
      produk_sample_id: 'A6C8BC175D752B24', // dari hasil test buat produk barusan
      jumlah_masuk: 500,
      harga_beli: 8500
    })
  })
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testHargaRekomendasi() {
  setResult('Menghitung rekomendasi harga...')
  const res = await fetch('/api/harga/rekomendasi?komoditas_ref=6B6142ADA0D49113')
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

  async function testRiwayat() {
  setResult('Mengambil riwayat...')
  const res = await fetch('/api/produsen/riwayat?anggota_ref=0E465AB0EB8FAF6D')
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }
  async function testPrediksi() {
  setResult('Menghitung prediksi...')
  const res = await fetch('/api/koperasi/prediksi?kode_wilayah=32.01.01.2001')
  const data = await res.json()
  setResult(JSON.stringify(data, null, 2))
  }

}

