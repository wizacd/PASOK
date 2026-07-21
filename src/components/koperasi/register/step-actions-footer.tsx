"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function StepActionsFooter({
  backHref,
  nextHref,
  nextLabel = "Lanjutkan",
  onNext,
  nextDisabled,
  helperText = "Data tersimpan otomatis",
}: {
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  helperText?: string;
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
          {helperText}
        </span>
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="flex items-center gap-2 rounded-xs bg-info px-8 py-2 text-base text-white disabled:opacity-50"
          >
            {nextLabel}
            <ArrowRight className="size-3.5" strokeWidth={2} />
          </button>
        ) : (
          <Link
            href={nextHref ?? "#"}
            className="flex items-center gap-2 rounded-xs bg-info px-8 py-2 text-base text-white"
          >
            {nextLabel}
            <ArrowRight className="size-3.5" strokeWidth={2} />
          </Link>
        )}
      </div>
    </div>
  );
}
