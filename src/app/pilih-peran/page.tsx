import { Anchor, Building2 } from "lucide-react";
import { BrandHero } from "@/components/pilih-peran/brand-hero";
import { PageFooter } from "@/components/pilih-peran/page-footer";
import { RoleCard, type Role } from "@/components/pilih-peran/role-card";

const ROLES: Role[] = [
  {
    id: "produsen",
    title: "Produsen",
    description:
      "Produsen: Kelola tawaran hasil bumi dan pantau harga. Ideal untuk petani mandiri, kelompok tani, atau nelayan.",
    icon: Anchor,
    iconBgClassName: "bg-role-produsen-soft/30",
    accentClassName: "text-role-produsen",
    ctaLabel: "Mulai sebagai Produsen",
    href: "/login?role=produsen",
  },
  {
    id: "koperasi",
    title: "Koperasi",
    description:
      "Koperasi: Kelola logistik, matching supply, dan transaksi. Dirancang untuk manajer gudang dan administrator rantai pasok.",
    icon: Building2,
    iconBgClassName: "bg-role-koperasi-soft/30",
    accentClassName: "text-role-koperasi",
    ctaLabel: "Mulai sebagai Koperasi",
    href: "/login?role=koperasi",
  },
];

export default function PilihPeranPage() {
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-[102px] size-[512px] rounded-xl bg-[#006948]/5 blur-[32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[102px] -left-16 size-[512px] rounded-xl bg-role-produsen/5 blur-[32px]"
      />

      <BrandHero />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-12 px-8 py-24">
        <div className="flex max-w-xl flex-col items-center gap-4 text-center">
          <h1 className="text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-ink">
            Pilih Peran Anda
          </h1>
          <p className="text-base leading-6 text-body">
            Selamat datang di ekosistem PASOK. Silakan pilih kategori akun
            Anda untuk melanjutkan proses pendaftaran atau masuk.
          </p>
        </div>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          {ROLES.map((role) => (
            <RoleCard key={role.id} {...role} />
          ))}
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
