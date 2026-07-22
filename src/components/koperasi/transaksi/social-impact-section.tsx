import { Map } from "lucide-react";

export function SocialImpactSection() {
  return (
    <div className="flex w-full gap-6">
      <div className="flex flex-1 gap-6 rounded-xs border border-info/20 bg-info/5 p-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold text-info-deep">
            Pemberdayaan Terukur
          </h4>
          <p className="text-base text-body">
            Sistem pencatatan otomatis PASOK telah membantu memvalidasi
            kelayakan kredit mikro bagi para petani dan nelayan yang
            sebelumnya &quot;unbankable&quot;.
          </p>

          <div className="flex gap-8 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[40px] font-bold leading-[56px] text-info-deep">
                94%
              </span>
              <span className="text-[11px] font-medium text-body">
                Ketepatan Distribusi
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[40px] font-bold leading-[56px] text-info-deep">
                Rp 12.5jt
              </span>
              <span className="text-[11px] font-medium text-body">
                Rata-rata Pendapatan Baru
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
        <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
          Penyebaran Regional Dampak
        </span>
        <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xs bg-chip">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base text-forest shadow-md"
          >
            <Map className="size-[18px]" strokeWidth={2} />
            Buka Visualisasi Geografis
          </button>
        </div>
      </div>
    </div>
  );
}
