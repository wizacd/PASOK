import { Lightbulb } from "lucide-react";

export function EfficiencyTipsCard() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-sm bg-info px-6 pb-6 pt-6 shadow-sm">
      <div className="flex gap-3">
        <Lightbulb className="size-6 shrink-0 text-white" strokeWidth={2} />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.6px] text-white">
            Tips Efisiensi
          </span>
          <p className="text-sm text-white/90">
            Radius operasi yang lebih luas berarti lebih banyak produsen
            potensial, tapi juga jarak tempuh pengumpulan yang lebih jauh.
            Sesuaikan dengan kapasitas logistik koperasi Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
