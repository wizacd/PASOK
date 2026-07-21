import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export function QuickShortcutCard() {
  return (
    <Link
      href="/koperasi/peta-sebaran"
      className="relative flex h-48 w-full flex-col justify-end overflow-hidden rounded-xs border border-border-soft p-6"
      style={{
        backgroundImage:
          "linear-gradient(160deg, #0f172a 0%, #0369a1 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xs bg-white/20 backdrop-blur-md">
            <Map className="size-[18px] text-white" strokeWidth={2} />
          </div>
          <h4 className="text-xl font-bold text-white">Peta Sebaran</h4>
        </div>

        <p className="text-sm text-white/70">
          Pantau lokasi produsen dan armada logistik secara real-time di
          seluruh wilayah.
        </p>

        <span className="flex items-center gap-2 pt-2 text-xs font-semibold tracking-[0.6px] text-white">
          BUKA PETA
          <ArrowRight className="size-4" strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
