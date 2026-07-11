import { ArrowUpRight, ShieldCheck } from "lucide-react";

const CAPACITY_KG = 5000;
const USED_KG = 2800;

export function HubStatusCard() {
  const usedPercent = Math.round((USED_KG / CAPACITY_KG) * 100);

  return (
    <div className="flex flex-col justify-between rounded-lg border border-ink bg-ink p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <ShieldCheck className="size-5 text-border-soft" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[1.2px] text-muted">
            Status Hub
          </span>
        </div>

        <p className="pt-7 text-sm text-border-soft">Hub Terdaftar</p>
        <p className="text-base text-white">Banyuwangi Maritime Port</p>

        <div className="flex flex-col gap-4 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Jagung Pipil</span>
            <span className="text-white">
              {USED_KG.toLocaleString("id-ID")} kg /{" "}
              {CAPACITY_KG.toLocaleString("id-ID")} kg
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-xl bg-[#1e293b]">
            <div
              className="h-full rounded-xl bg-forest"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-8 flex items-center gap-2 self-start text-base text-[#85f8c4]"
      >
        Lihat Performa Hub
        <ArrowUpRight className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
