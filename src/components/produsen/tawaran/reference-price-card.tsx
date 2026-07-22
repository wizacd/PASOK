"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

type Rekomendasi = {
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

export function ReferencePriceCard({ komoditasRef }: { komoditasRef: string }) {
  const [data, setData] = useState<Rekomendasi | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!komoditasRef) {
      setData(null);
      return;
    }
    setIsLoading(true);
    fetch(`/api/harga/rekomendasi?komoditas_ref=${encodeURIComponent(komoditasRef)}`)
      .then((res) => res.json())
      .then((result) => setData(result.error ? null : result))
      .finally(() => setIsLoading(false));
  }, [komoditasRef]);

  return (
    <div className="w-full overflow-hidden rounded-sm border border-border-soft bg-white">
      <div className="flex items-center gap-2 border-b border-border-soft bg-chip px-4 py-4">
        <TrendingUp className="size-[15px] text-ink" strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
          Rekomendasi Harga AI
        </span>
      </div>

      <div className="flex flex-col gap-2 p-6">
        {!komoditasRef ? (
          <p className="text-sm text-body">Pilih komoditas dulu untuk lihat rekomendasi harga.</p>
        ) : isLoading ? (
          <p className="text-sm text-body">Memuat rekomendasi...</p>
        ) : !data || data.harga_rekomendasi === null ? (
          <p className="text-sm text-body">Belum ada data harga untuk komoditas ini.</p>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-ink">{data.nama_komoditas}</span>
            <span className="text-2xl font-bold text-brand">
              {formatRupiah(data.harga_rekomendasi)}
              <span className="text-sm font-normal text-muted"> /kg</span>
            </span>
            <span className="pt-1 text-[11px] text-body">{data.metode}</span>
          </div>
        )}
      </div>
    </div>
  );
}
