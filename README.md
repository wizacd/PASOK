# PASOK

**Platform B2B Agregasi Supply dan Order Komoditas Berbasis AI untuk Rantai Distribusi Petani, Nelayan, dan Koperasi Desa Merah Putih**

**Link Deploy:** [pasok-theta.vercel.app](https://pasok-theta.vercel.app/)

---

## Latar Belakang

Petani dan nelayan di Indonesia masih sangat bergantung pada tengkulak untuk menjual hasil produksinya, tanpa akses informasi harga pasar yang objektif dan tanpa rekam jejak transaksi yang bisa dipakai untuk mengajukan pembiayaan (KUR/simpan-pinjam). Di sisi lain, Koperasi Desa Merah Putih kesulitan memetakan produsen di wilayahnya, sehingga sulit merencanakan pembelian dan distribusi komoditas secara efektif.

## Solusi

PASOK menghubungkan petani dan nelayan langsung dengan Koperasi Desa Merah Putih sebagai agregator komoditas resmi, melalui lima fitur utama:

1. **Supply Matching** — mencocokkan penawaran hasil panen dengan koperasi terdekat secara otomatis berdasarkan komoditas, volume, dan jarak.
2. **Peta Sebaran Komoditas** — memetakan produsen, jenis komoditas, dan estimasi stok di suatu wilayah secara real-time.
3. **Rekomendasi Harga Berbasis AI** — menggabungkan data harga acuan pemerintah (Badan Pangan Nasional) dengan rata-rata harga transaksi lokal.
4. **E-Surat Jalan & Riwayat Transaksi** — menghasilkan bukti transaksi digital otomatis sebagai rekam jejak finansial untuk mempermudah akses pembiayaan.
5. **Prediksi Pasokan** — menganalisis data penawaran aktif untuk memperkirakan volume komoditas pada periode mendatang.

### Kebaruan

PASOK tidak sekadar memotong rantai pasok, tetapi mengubah kebiasaan transaksi tunai yang tidak tercatat menjadi rekam jejak finansial digital. Skema database dirancang selaras dengan skema sistem resmi Koperasi Desa Merah Putih — begitu transaksi selesai, data otomatis tercatat ke tabel inventaris dan dokumen resmi koperasi, bukan berdiri sebagai sistem terpisah.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes |
| Database & Auth | Supabase (PostgreSQL + PostGIS) |
| Hosting | Vercel |

## Status Implementasi

Seluruh **backend dan business logic sudah selesai diimplementasikan dan diuji**, mencakup 9 endpoint API yang menjalankan alur inti end-to-end: registrasi produsen & koperasi, input penawaran, peta sebaran, supply matching (skoring jarak + kategori + volume), rekomendasi harga (kombinasi data resmi + pasar lokal), penerimaan matching, transaksi selesai dengan e-surat jalan otomatis, riwayat transaksi, dan prediksi pasokan.

Integrasi antarmuka pengguna (UI) untuk producer app dan koperasi dashboard sedang dalam tahap penyelesaian. Fungsi backend dapat diverifikasi langsung melalui endpoint API sesuai dokumentasi terlampir.

---

## Cara Menjalankan (Lokal)

### 1. Clone repo

```bash
git clone https://github.com/wizacd/PASOK.git
cd PASOK
npm install
```

### 2. Buat file `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxx
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Setup Database

Jalankan seluruh isi file `schema_pasok_supabase.sql` di **Supabase SQL Editor** (New Query → paste → Run) pada project Supabase baru. File ini membuat seluruh tabel, Row Level Security policy, dan seed data awal.

## Deploy ke Vercel

1. Import repo ini di [vercel.com](https://vercel.com) (framework Next.js terdeteksi otomatis)
2. Tambahkan 3 environment variable yang sama seperti `.env.local`
3. Deploy — setiap push ke branch `main` otomatis memicu re-deploy

---

## Tim

| Peran | Nama |
|---|---|
| Backend & Database | Nadzira |
| Frontend & UX | ALiyyah |
| AI/Data Logic & Product | Chinthya |
