"use client";

import { useEffect, useState } from "react";
import { Lightbulb, Sprout } from "lucide-react";
import { PriceCard } from "@/components/produsen/dashboard/price-card";
import { getAccessToken } from "@/lib/auth";

type HargaRow = {
  komoditas_ref: string;
  nama_komoditas: string;
  harga_rekomendasi: number | null;
  metode: string;
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HargaKomoditasPage() {
  const [harga, setHarga] = useState<HargaRow[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) {
        setError("Sesi tidak ditemukan. Silakan masuk kembali.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/produsen/harga", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal memuat data harga.");
        setIsLoading(false);
        return;
      }

      setHarga(result.harga);
      setIsLoading(false);
    }

    load();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
          Harga Komoditas
        </h1>
        <p className="text-base text-body">
          Rekomendasi harga untuk komoditas di wilayah Anda, dihitung otomatis
          oleh sistem PASOK.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-body">Memuat data harga...</p>
      ) : error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : harga.length === 0 ? (
        <p className="text-sm text-body">
          Belum ada data komoditas untuk wilayah Anda.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            {harga.map((item) => (
              <PriceCard
                key={item.komoditas_ref}
                icon={Sprout}
                iconClassName="text-forest"
                commodity={item.nama_komoditas}
                price={
                  item.harga_rekomendasi != null
                    ? formatRupiah(item.harga_rekomendasi)
                    : "Belum ada data"
                }
                metaLabel="Rekomendasi AI"
                metaValue={item.metode}
              />
            ))}
          </div>

          <div className="flex items-start gap-4 rounded-sm border border-border-soft bg-white p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning/10">
              <Lightbulb className="size-5 text-warning" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-ink">
                Cara Kerja Rekomendasi Harga
              </h3>
              <p className="text-sm leading-6 text-body">
                Setiap harga di atas dihitung dari kombinasi{" "}
                <strong>harga acuan pemerintah</strong> dan{" "}
                <strong>rata-rata harga transaksi produsen lain</strong> di
                wilayah yang sama untuk komoditas tersebut. Semakin banyak
                penawaran yang tercatat, semakin akurat rekomendasinya.
                Kolom &quot;Rekomendasi AI&quot; di setiap kartu menjelaskan
                sumber data yang dipakai untuk komoditas itu.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
