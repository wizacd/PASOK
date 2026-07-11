import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function StepActionsFooter({
  backHref,
  nextHref,
  nextLabel = "Lanjutkan",
}: {
  backHref?: string;
  nextHref: string;
  nextLabel?: string;
}) {
  return (
    <div className="flex w-full items-center justify-between border-t border-border-soft px-6 py-6">
      {backHref ? (
        <Link
          href={backHref}
          className="flex items-center gap-2 rounded-xs border border-body px-6 py-2 text-base text-body"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2} />
          Kembali
        </Link>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-4">
        <span className="text-[11px] font-medium text-body">
          Data tersimpan otomatis
        </span>
        <Link
          href={nextHref}
          className="flex items-center gap-2 rounded-xs bg-info px-8 py-2 text-base text-white"
        >
          {nextLabel}
          <ArrowRight className="size-3.5" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
