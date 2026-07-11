import Image from "next/image";
import { Anchor, BarChart3, ShieldCheck, Waves } from "lucide-react";

const GRID_CELLS = [
  "border border-white",
  "border border-white bg-white/20",
  "border border-white",
  "border border-white",
  "border border-white bg-white/40",
  "border border-white",
  "border border-white bg-white/10",
  "border border-white",
];

const TRUST_BADGES = [
  { icon: Anchor, label: "Agri Hub" },
  { icon: Waves, label: "Maritime Data" },
  { icon: BarChart3, label: "Analytics 2.0" },
];

export function LoginHero() {
  return (
    <div className="relative hidden flex-1 self-stretch overflow-hidden lg:block">
      <Image
        src="/login-koperasi-hero.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      <div
        aria-hidden
        className="absolute right-0 top-0 grid grid-cols-4 grid-rows-2 gap-4 p-12 opacity-10"
      >
        {GRID_CELLS.map((className, index) => (
          <div key={index} className={`size-8 ${className}`} />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="flex max-w-[672px] flex-col gap-6 pb-12">
          <div className="flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-[6px]">
            <ShieldCheck className="size-4 text-white" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-white">
              Sistem Keamanan Terverifikasi
            </span>
          </div>

          <h2 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px] text-white">
            Memberdayakan Koperasi melalui Agri-Maritime Intelligence.
          </h2>

          <p className="max-w-[512px] text-base leading-6 text-white/80">
            Membangun jembatan digital antara daratan dan lautan untuk masa
            depan ketahanan pangan yang berkelanjutan dan efisien.
          </p>
        </div>

        <div className="flex items-center gap-8 border-t border-white/20 pt-8 opacity-60">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="size-[18px] text-white" strokeWidth={2} />
              <span className="text-xs font-semibold uppercase tracking-[0.6px] text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
