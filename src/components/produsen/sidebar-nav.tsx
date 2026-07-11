"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  History,
  LayoutDashboard,
  PlusCircle,
  Receipt,
  Settings,
  Tag,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/produsen", label: "Dashboard", icon: LayoutDashboard },
  { href: "/produsen/harga", label: "Harga", icon: Tag },
  { href: "/produsen/transaksi", label: "Transaksi", icon: Receipt },
  { href: "/produsen/riwayat", label: "Riwayat", icon: History },
  { href: "/produsen/pengaturan", label: "Pengaturan", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-border-soft bg-canvas py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 px-6">
          <Image
            src="/logo-pasok.png"
            alt="PASOK"
            width={49}
            height={55}
            className="h-[55px] w-[49px] object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-[32px] font-bold leading-10 tracking-[-0.32px] text-brand">
              PASOK
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
              Producer Portal
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-4 rounded-sm py-3 pl-4 pr-5 text-xs font-semibold uppercase tracking-[0.6px] ${
                  isActive
                    ? "border-r-4 border-brand bg-chip text-brand"
                    : "text-ink hover:bg-white"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-1 border-t border-border-soft pt-4">
            <Link
              href="/produsen/pengaturan"
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-semibold uppercase tracking-[0.6px] text-body hover:bg-white"
            >
              <Settings className="size-5" strokeWidth={2} />
              Pengaturan
            </Link>
            <Link
              href="/produsen/profil"
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-semibold uppercase tracking-[0.6px] text-danger hover:bg-white"
            >
              <CircleUserRound className="size-[18px]" strokeWidth={2} />
              Profil
            </Link>
          </div>
        </nav>
      </div>

      <div className="px-4">
        <Link
          href="/produsen/tawaran/buat"
          className="flex items-center justify-center gap-2 rounded-sm bg-brand py-3 text-base font-bold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90"
        >
          <PlusCircle className="size-5" strokeWidth={2} />
          Buat Tawaran Baru
        </Link>
      </div>
    </aside>
  );
}
