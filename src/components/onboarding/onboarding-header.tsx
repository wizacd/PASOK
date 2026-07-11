import Image from "next/image";
import { User } from "lucide-react";

export function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between border-b border-border-soft bg-[rgba(248,249,255,0.9)] px-8 backdrop-blur-[6px]">
      <div className="flex shrink-0 items-center gap-3">
        <Image
          src="/logo-pasok.png"
          alt="PASOK"
          width={49}
          height={55}
          className="h-[55px] w-[49px] shrink-0 object-contain"
          priority
        />
        <span className="text-[32px] font-black leading-10 tracking-[-0.32px] text-brand">
          PASOK
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
          Pendaftaran Produsen
        </span>
        <button
          type="button"
          aria-label="Akun"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-soft bg-chip-strong text-ink"
        >
          <User className="size-4" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
