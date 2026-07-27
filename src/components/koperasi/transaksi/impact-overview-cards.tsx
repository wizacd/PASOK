import { Handshake, Users, Wallet } from "lucide-react";

function formatRupiahRingkas(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`;
  }
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} Jt`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export type RingkasanTransaksi = {
  totalNilai: number;
  jumlahTransaksi: number;
  jumlahProdusen: number;
  rataRataNilai: number;
};

export function ImpactOverviewCards({
  ringkasan,
  loading,
}: {
  ringkasan: RingkasanTransaksi | null;
  loading: boolean;
}) {
  return (
    <div className="flex w-full gap-6">
      <div className="relative flex flex-1 flex-col gap-1 overflow-hidden rounded-xs border border-border-soft bg-white p-6">
        <Wallet className="size-8 text-success" strokeWidth={1.5} />
        <span className="pt-3 text-xs font-semibold tracking-[0.6px] text-body">
          Total Nilai Transaksi
        </span>
        <span className="text-[40px] font-bold leading-[56px] text-ink">
          {loading ? "..." : formatRupiahRingkas(ringkasan?.totalNilai ?? 0)}
        </span>
        <span className="pt-1 text-sm text-body">
          Dari {loading ? "..." : (ringkasan?.jumlahTransaksi ?? 0)} transaksi terkonfirmasi
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 rounded-xs border border-border-soft bg-white p-6">
        <Users className="size-8 text-info" strokeWidth={1.5} />
        <span className="pt-3 text-xs font-semibold tracking-[0.6px] text-body">
          Produsen dengan Rekam Jejak Transaksi
        </span>
        <span className="text-[40px] font-bold leading-[56px] text-ink">
          {loading ? "..." : (ringkasan?.jumlahProdusen ?? 0)}
        </span>
        <span className="pt-1 text-sm text-body">
          Produsen dengan minimal 1 transaksi selesai
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-1 overflow-hidden rounded-xs border border-border-soft bg-white p-6">
        <Handshake className="size-8 text-warning" strokeWidth={1.5} />
        <span className="pt-3 text-xs font-semibold tracking-[0.6px] text-body">
          Rata-rata Nilai per Transaksi
        </span>
        <span className="text-[40px] font-bold leading-[56px] text-ink">
          {loading ? "..." : formatRupiahRingkas(ringkasan?.rataRataNilai ?? 0)}
        </span>
        <span className="pt-1 text-sm text-body">Per transaksi selesai</span>
      </div>
    </div>
  );
}
