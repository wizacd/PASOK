import { Lightbulb } from "lucide-react";

export function EfficiencyTipsCard() {
  return (
    <div className="flex w-full flex-col gap-5 rounded-sm bg-info px-6 pb-6 pt-6 shadow-sm">
      <div className="flex gap-3">
        <Lightbulb className="size-6 shrink-0 text-white" strokeWidth={2} />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.6px] text-white">
            Tips Efisiensi
          </span>
          <p className="text-sm text-white/90">
            Memperluas radius di atas 50km dapat meningkatkan biaya
            pengumpulan hingga 15% jika armada koperasi terbatas.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="w-fit text-xs font-bold text-white underline underline-offset-2"
      >
        Pelajari Analisis Logistik →
      </button>
    </div>
  );
}
