"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BarChart3,
  Handshake,
  LayoutDashboard,
  LogOut,
  Settings,
  Truck,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/koperasi", label: "Dashboard", icon: LayoutDashboard },
  { href: "/koperasi/tawaran-produsen", label: "Tawaran Produsen", icon: Handshake },
  { href: "/koperasi/inventaris", label: "Inventaris", icon: Archive },
  { href: "/koperasi/logistik", label: "Logistik", icon: Truck },
  { href: "/koperasi/analisa", label: "Analisa", icon: BarChart3 },
];

export function RegisterSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-border-soft bg-canvas py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col px-4">
          <span className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-info">
            Coop Manager
          </span>
          <span className="text-xs font-semibold tracking-[0.6px] text-body">
            Verified Member
          </span>
        </div>

        <nav className="flex flex-col gap-2 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xs px-3 py-2 text-xs font-semibold tracking-[0.6px] ${
                  isActive
                    ? "bg-info-soft text-info-deep"
                    : "text-body hover:bg-white"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-soft px-2 pt-6">
        <Link
          href="/koperasi/pengaturan"
          className="flex items-center gap-3 rounded-xs px-3 py-2 text-xs font-semibold tracking-[0.6px] text-body hover:bg-white"
        >
          <Settings className="size-[18px]" strokeWidth={2} />
          Pengaturan
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-xs px-3 py-2 text-xs font-semibold tracking-[0.6px] text-body hover:bg-white"
        >
          <LogOut className="size-[18px]" strokeWidth={2} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}
