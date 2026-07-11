import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PrimaryActionCard() {
  return (
    <div className="col-span-2 flex h-full items-center justify-center rounded-sm bg-brand p-8 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex max-w-md flex-col items-start gap-2">
        <h3 className="text-4xl font-bold leading-tight text-white">
          Tawarkan Hasil Panen Sekarang
        </h3>
        <p className="pb-4 text-sm text-white/80">
          Kirimkan rincian hasil panen atau tangkapan Anda langsung ke gudang
          regional kami untuk mendapatkan harga terbaik.
        </p>
        <Link
          href="/produsen/tawaran/buat"
          className="flex items-center gap-2 rounded-sm bg-white px-8 py-3 text-base font-bold text-brand"
        >
          Tawarkan Hasil Panen/Tangkapan
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
