"use client";

import { HelpCircle } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";

const FAQ_ITEMS = [
  {
    pertanyaan: "Bagaimana cara kerja Supply Matching?",
    jawaban:
      "Sistem menghitung skor kecocokan antara penawaran produsen aktif dan koperasi berdasarkan jarak, kesesuaian komoditas dengan wilayah, dan volume. Penawaran yang layak akan muncul di antrean Supply Matching. Klik \"Terima\" untuk menerima penawaran (statusnya jadi \"diterima\"), atau \"Tolak\" untuk menyembunyikannya dari antrean.",
  },
  {
    pertanyaan: "Bedanya status \"Diterima\" dan \"Selesai\" apa?",
    jawaban:
      "\"Diterima\" berarti koperasi sudah menyetujui penawaran tapi barang belum ditimbang dan diterima fisik. Setelah surat jalan diterbitkan di menu E-Surat Jalan, statusnya berubah jadi \"Selesai\" dan barang otomatis masuk ke Inventaris.",
  },
  {
    pertanyaan: "Dari mana data Inventaris berasal?",
    jawaban:
      "Inventaris menampilkan stok fisik yang sudah ditimbang dan diterima lewat proses E-Surat Jalan (tabel barang masuk), bukan sekadar penawaran yang disetujui. Ini memastikan angka stok mencerminkan barang yang benar-benar ada di gudang.",
  },
  {
    pertanyaan: "Bagaimana cara kerja Analisa (prediksi & rekomendasi harga)?",
    jawaban:
      "Prediksi volume dihitung dari agregat penawaran aktif yang dikelompokkan per bulan estimasi panen. Rekomendasi harga dihitung dari kombinasi harga acuan pemerintah dan rata-rata harga transaksi produsen di wilayah yang sama. Keduanya adalah agregasi data nyata, bukan model machine learning yang memprediksi masa depan secara probabilistik.",
  },
  {
    pertanyaan: "Kenapa Peta Sebaran atau Supply Matching kosong?",
    jawaban:
      "Biasanya karena koperasi belum punya koordinat lokasi tersimpan, atau belum ada produsen dengan komoditas yang sesuai wilayah koperasi dalam radius 50 km. Pastikan data lokasi koperasi lengkap saat pendaftaran.",
  },
];

export default function KoperasiBantuanPage() {
  return (
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <main className="flex flex-1 flex-col gap-6 px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/10">
                <HelpCircle className="size-5 text-info" strokeWidth={2} />
              </div>
              <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
                Pusat Bantuan
              </h1>
            </div>
            <p className="pb-2 text-base text-body">
              Pertanyaan yang sering ditanyakan seputar penggunaan Portal Koperasi PASOK.
            </p>

            <div className="flex flex-col gap-4">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.pertanyaan}
                  className="flex flex-col gap-2 rounded-xs border border-border-soft bg-white p-6"
                >
                  <h3 className="text-base font-semibold text-ink">
                    {item.pertanyaan}
                  </h3>
                  <p className="text-sm leading-6 text-body">{item.jawaban}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
