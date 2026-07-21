import { Users } from "lucide-react";

const KECAMATAN = [
  "Mulyorejo",
  "Kenjeran",
  "Pabean Cantian",
  "Tambak Rejo",
  "Gresik Kota",
  "+7 Lainnya",
];

export function CoverageSummaryCard() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h3 className="text-xl font-semibold text-ink">Ringkasan Cakupan</h3>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
            Kecamatan Tercover
          </span>
          <span className="rounded-full bg-info px-2 py-0.5 text-[11px] font-bold text-white">
            12 Wilayah
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {KECAMATAN.map((name) => (
            <span
              key={name}
              className="rounded-xl border border-border-soft/30 bg-chip px-3 py-1 text-xs text-body"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-sm border border-success/20 bg-chip p-4">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success/10">
            <Users className="size-6 text-success" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.6px] text-body">
              Estimasi Produsen
            </span>
            <span className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-brand">
              2,450+
            </span>
          </div>
        </div>
        <p className="text-xs italic text-body">
          Berdasarkan data sensus pertanian 2023 di wilayah radius 25km.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1 rounded-xs border border-border-soft p-4">
          <span className="text-[11px] font-bold uppercase text-body">
            Potensi Hasil
          </span>
          <span className="text-xl font-semibold text-ink">1.2k Ton</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 rounded-xs border border-border-soft p-4">
          <span className="text-[11px] font-bold uppercase text-body">
            Biaya Logistik
          </span>
          <span className="text-xl font-semibold text-brand">-12%</span>
        </div>
      </div>
    </div>
  );
}
