import { ShieldCheck } from "lucide-react";

export function AccountSummaryCard({
  koperasiRef,
  statusRegistrasi,
  wilayahLabel,
  komoditasUtama,
}: {
  koperasiRef: string;
  statusRegistrasi: string;
  wilayahLabel: string;
  komoditasUtama: string[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">Ringkasan Akun</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border-soft pb-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-body">
            ID Koperasi
          </span>
          <span className="text-base font-bold text-ink">{koperasiRef}</span>
        </div>

        <div className="flex items-center justify-between border-b border-border-soft pb-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-body">
            Status
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1">
            <ShieldCheck className="size-3.5 text-brand" strokeWidth={2} />
            <span className="text-xs font-semibold tracking-[0.6px] text-brand">
              {statusRegistrasi}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border-soft pb-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-body">
            Wilayah
          </span>
          <span className="text-base text-ink">{wilayahLabel}</span>
        </div>

        {komoditasUtama.length > 0 ? (
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs font-semibold tracking-[0.6px] text-body">
              Komoditas Utama
            </span>
            <div className="flex flex-wrap gap-2">
              {komoditasUtama.map((name) => (
                <span
                  key={name}
                  className="rounded-xs border border-border-soft bg-canvas px-3 py-1 text-xs font-semibold tracking-[0.6px] text-ink"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
