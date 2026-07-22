"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  HelpCircle,
  History,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { signOut } from "@/lib/auth";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/produsen", label: "Dashboard", icon: LayoutDashboard },
  { href: "/produsen/harga", label: "Harga", icon: Tag },
  { href: "/produsen/tawaran/buat", label: "Transaksi", icon: Receipt },
  { href: "/produsen/riwayat", label: "Riwayat", icon: History },
  { href: "/produsen/pengaturan", label: "Pengaturan", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-border-soft bg-white py-6">
      <div className="flex flex-col gap-4">
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
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-info-deep">
              Portal Produsen
            </span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xs px-3 py-2.5 text-xs font-semibold tracking-[0.6px] ${
                  isActive
                    ? "bg-brand text-white"
                    : "text-body hover:bg-canvas"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-border-soft px-4 pt-6">
        <button
          type="button"
          className="flex items-center gap-3 rounded-xs px-3 py-2.5 text-left text-xs font-semibold tracking-[0.6px] text-body hover:bg-canvas"
        >
          <HelpCircle className="size-5" strokeWidth={2} />
          Pusat Bantuan
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 rounded-xs px-3 py-2.5 text-left text-xs font-semibold tracking-[0.6px] text-body hover:bg-canvas"
        >
          <LogOut className="size-[18px]" strokeWidth={2} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
