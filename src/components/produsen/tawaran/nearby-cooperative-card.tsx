import { BadgeCheck, Building2, MapPin, Star } from "lucide-react";

export function NearbyCooperativeCard() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-sm border border-border-soft bg-white p-6">
      <div className="flex items-center gap-2">
        <MapPin className="size-[15px] text-body" strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
          Koperasi Terdekat
        </span>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-chip">
          <Building2 className="size-5 text-brand" strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-ink">Koperasi Maju Tani</h3>
          <p className="text-sm text-body">
            Jl. Raya Tani KM 4.2, Surabaya
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="flex items-center gap-1 rounded-xs bg-success/10 px-2 py-0.5 text-[10px] font-bold text-brand">
              <BadgeCheck className="size-3" strokeWidth={2} />
              Verifikasi A
            </span>
            <span className="flex items-center gap-1 text-[10px] text-body">
              <Star className="size-2.5 fill-current text-warning" strokeWidth={0} />
              4.8 (124)
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="rounded-xs border border-border-soft py-2 text-xs font-semibold uppercase tracking-[0.6px] text-body"
      >
        Ubah Koperasi
      </button>
    </div>
  );
}
