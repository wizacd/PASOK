import { CircleCheck, TrendingUp, Truck } from "lucide-react";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export type StatCardsProps = {
  totalPenjualan: number;
  perubahanPenjualanPersen: number | null;
  volumeTerkirimKg: number;
  jumlahSelesai: number;
  tingkatKeberhasilanPersen: number | null;
};

export function StatCards({
  totalPenjualan,
  perubahanPenjualanPersen,
  volumeTerkirimKg,
  jumlahSelesai,
  tingkatKeberhasilanPersen,
}: StatCardsProps) {
  const volumeTon = volumeTerkirimKg / 1000;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="flex flex-col gap-3 rounded-lg border border-border-soft bg-white p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-[18px] text-body" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
            Total Penjualan
          </span>
        </div>
        <span className="text-base text-forest">{formatRupiah(totalPenjualan)}</span>
        {perubahanPenjualanPersen != null && (
          <span
            className={`text-xs font-medium ${
              perubahanPenjualanPersen >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {perubahanPenjualanPersen >= 0 ? "+" : ""}
            {perubahanPenjualanPersen.toFixed(1)}% dari bulan lalu
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border-soft bg-white p-6">
        <div className="flex items-center gap-2">
          <Truck className="size-[18px] text-body" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
            Volume Terkirim
          </span>
        </div>
        <span className="text-base text-ink">
          {volumeTon.toLocaleString("id-ID", { maximumFractionDigits: 1 })} Ton
        </span>
        <span className="text-xs font-medium text-muted">Dari transaksi selesai</span>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border-soft bg-white p-6">
        <div className="flex items-center gap-2">
          <CircleCheck className="size-[18px] text-body" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
            Transaksi Berhasil
          </span>
        </div>
        <span className="text-base text-ink">{jumlahSelesai}</span>
        {tingkatKeberhasilanPersen != null && (
          <span className="text-xs font-medium text-muted">
            {tingkatKeberhasilanPersen.toFixed(0)}% tingkat keberhasilan
          </span>
        )}
      </div>
    </div>
  );
}
