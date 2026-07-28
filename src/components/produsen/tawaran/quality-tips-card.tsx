import { Lightbulb } from "lucide-react";

export function QualityTipsCard({ namaKomoditas }: { namaKomoditas?: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-brand/30 bg-forest/5 p-6">
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb className="size-[15px] text-brand-deep" strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-brand-deep">
          Tips Kualitas
        </span>
      </div>
      <p className="relative z-10 max-w-[85%] text-sm leading-relaxed text-ink">
        {namaKomoditas
          ? `Pastikan kualitas dan kadar air ${namaKomoditas} sesuai standar untuk mendapatkan harga premium Grade A.`
          : "Pilih komoditas terlebih dahulu untuk melihat tips kualitas."}{" "}
        Gunakan kemasan standar PASOK untuk mempercepat proses logistik.
      </p>
      <Lightbulb
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-4 size-24 text-brand/10"
        strokeWidth={1}
      />
    </div>
  );
}
