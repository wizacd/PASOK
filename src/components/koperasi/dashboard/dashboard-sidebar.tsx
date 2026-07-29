"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BarChart3,
  FileText,
  LayoutDashboard,
  Map,
  Receipt,
  Shuffle,
  type LucideIcon,
} from "lucide-react";
import { getAccessToken } from "@/lib/auth";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/koperasi", label: "Dashboard", icon: LayoutDashboard },
  { href: "/koperasi/peta-sebaran", label: "Peta Sebaran", icon: Map },
  { href: "/koperasi/e-surat-jalan", label: "E-Surat Jalan", icon: FileText },
  { href: "/koperasi/transaksi", label: "Transaksi", icon: Receipt },
  {
    href: "/koperasi/supply-matching",
    label: "Supply Matching",
    icon: Shuffle,
  },
  { href: "/koperasi/inventaris", label: "Inventaris", icon: Archive },
  { href: "/koperasi/analisa", label: "Analisa", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [totalStokKg, setTotalStokKg] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) return;
      const response = await fetch("/api/koperasi/inventaris", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) return;
      const data = await response.json();
      setTotalStokKg(data.ringkasan?.totalVolumeKg ?? 0);
    }
    load();
  }, []);

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-border-soft bg-[#f8f9ff] py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 px-6">
          <span className="text-[32px] font-bold leading-10 tracking-[-0.32px] text-brand">
            PASOK
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-info-deep">
            Portal Koperasi
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xs px-4 py-3 text-base ${
                  isActive
                    ? "border-r-4 border-info bg-chip-strong text-info"
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

      <div className="flex flex-col gap-2 px-4">
        <div className="flex flex-col gap-2 rounded-xl border border-info/10 bg-info/5 p-[17px]">
          <span className="text-[11px] font-bold text-info">
            STOK GUDANG SAAT INI
          </span>
          <span className="text-base font-bold text-ink">
            {totalStokKg !== null ? totalStokKg.toLocaleString("id-ID") : "..."} Kg
          </span>
          <span className="text-[11px] text-body">
            Total stok yang sudah diterima dan tercatat.
          </span>
        </div>
      </div>
    </aside>
  );
}
