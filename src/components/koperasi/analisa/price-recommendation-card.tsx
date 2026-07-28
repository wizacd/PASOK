import { Sparkles } from "lucide-react";

export type RekomendasiHarga = {
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

export function PriceRecommendationCard({ harga }: { harga: RekomendasiHarga }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
      <div className="flex items-center gap-2">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/10">
          <Sparkles className="size-5 text-info" strokeWidth={2} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
          Rekomendasi Harga Hari Ini
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-[40px] font-bold leading-[48px] text-ink">
          {harga.harga_rekomendasi != null
            ? formatRupiah(harga.harga_rekomendasi)
            : "Belum ada data"}
        </span>
        {harga.harga_rekomendasi != null ? (
          <span className="text-lg font-medium text-body">/Kg</span>
        ) : null}
      </div>

      <p className="text-sm text-body">{harga.metode}</p>
    </div>
  );
}
