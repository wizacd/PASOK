import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export type OnboardingStep = {
  number: number;
  title: string;
  href: string;
};

const STEPS: OnboardingStep[] = [
  { number: 1, title: "Akun", href: "/onboarding/produsen" },
  { number: 2, title: "Lokasi", href: "/onboarding/produsen/lokasi" },
  { number: 3, title: "Komoditas", href: "/onboarding/produsen/komoditas" },
  { number: 4, title: "Kapasitas", href: "/onboarding/produsen/kapasitas" },
];

export function OnboardingSidebar({ currentStep }: { currentStep: number }) {
  return (
    <aside className="flex h-full w-80 shrink-0 flex-col gap-12 border-r border-border-soft bg-white py-8 pl-8 pr-[33px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
          Lengkapi Profil
        </h1>
        <p className="text-sm leading-5 text-body">
          Bantu kami menyesuaikan layanan untuk kebutuhan produksi Anda.
        </p>
      </div>

      <nav className="flex flex-col gap-8">
        {STEPS.map((step) => {
          const isActive = step.number === currentStep;
          return (
            <Link
              key={step.number}
              href={step.href}
              className={`flex items-center gap-4 rounded-xs transition-opacity hover:opacity-100 ${isActive ? "" : "opacity-50"}`}
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-base font-bold ${
                  isActive ? "bg-brand text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {step.number}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                  Langkah {step.number}
                </span>
                <span
                  className={`text-xl font-semibold ${isActive ? "text-ink" : "text-body"}`}
                >
                  {step.title}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1.5 rounded-lg border border-border-soft bg-chip p-[17px]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-brand" strokeWidth={2.25} />
          <span className="text-[10px] uppercase tracking-[-0.5px] text-brand">
            Data Terproteksi
          </span>
        </div>
        <p className="text-[11px] leading-[17.88px] text-body">
          Informasi Anda dienkripsi dan hanya digunakan untuk keperluan ekosistem PASOK.
        </p>
      </div>
    </aside>
  );
}
