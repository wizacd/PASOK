import { Info, TrendingUp } from "lucide-react";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function TotalAccumulationCard({ totalRupiah }: { totalRupiah: number }) {
  return (
    <div className="relative col-span-2 flex flex-col gap-4 overflow-hidden rounded-lg border border-border-soft bg-white p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-xl bg-forest/5 blur-[32px]"
      />

      <div className="relative flex items-center gap-2">
        <TrendingUp className="size-[18px] text-body" strokeWidth={2} />
        <span className="text-base uppercase tracking-[0.8px] text-body">
          Total Akumulasi Transaksi Selesai
        </span>
      </div>

      <div className="relative flex items-center gap-3">
        <span className="text-base text-forest">{formatRupiah(totalRupiah)}</span>
      </div>

      <div className="relative flex max-w-[512px] items-start gap-3 rounded-sm border border-border-soft/50 bg-chip p-4">
        <Info className="size-5 shrink-0 text-brand" strokeWidth={2} />
        <p className="text-sm text-body">
          Akumulasi transaksi ini valid digunakan sebagai dokumen pendukung
          pengajuan <strong>KUR (Kredit Usaha Rakyat)</strong> melalui mitra
          perbankan PASOK.
        </p>
      </div>
    </div>
  );
}
