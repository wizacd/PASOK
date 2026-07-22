import { Award, TrendingUp, Users, Wallet } from "lucide-react";

export function ImpactOverviewCards() {
  return (
    <div className="flex w-full gap-6">
      <div className="relative flex flex-1 flex-col gap-1 overflow-hidden rounded-xs border border-border-soft bg-white p-6">
        <div className="flex items-start justify-between">
          <Wallet className="size-8 text-success" strokeWidth={1.5} />
          <span className="flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-success">
            <TrendingUp className="size-3" strokeWidth={2.5} />
            +12.4%
          </span>
        </div>
        <span className="pt-3 text-xs font-semibold tracking-[0.6px] text-body">
          Total Nilai Transaksi
        </span>
        <span className="text-[40px] font-bold leading-[56px] text-ink">
          Rp 4.2 Miliar
        </span>
        <span className="pt-1 text-sm text-body">
          Bulan ini dari 2,4k transaksi
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 rounded-xs border border-border-soft bg-white p-6">
        <Users className="size-8 text-info" strokeWidth={1.5} />
        <span className="pt-3 text-xs font-semibold tracking-[0.6px] text-body">
          Produsen Baru Berjejak Finansial
        </span>
        <span className="text-[40px] font-bold leading-[56px] text-ink">
          128
        </span>
        <span className="pt-1 text-sm text-body">
          Individu baru dalam ekosistem perbankan
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-1 overflow-hidden rounded-xs border border-border-soft bg-white p-6">
        <div className="absolute -bottom-4 -right-4 size-20 rounded-xl bg-warning/5" />
        <Award className="size-8 text-warning" strokeWidth={1.5} />
        <span className="pt-3 text-xs font-semibold tracking-[0.6px] text-body">
          Estimasi Eligible KUR
        </span>
        <span className="text-[40px] font-bold leading-[56px] text-ink">
          85
        </span>
        <span className="pt-1 text-sm text-body">
          Berdasarkan konsistensi hasil panen
        </span>
      </div>
    </div>
  );
}
