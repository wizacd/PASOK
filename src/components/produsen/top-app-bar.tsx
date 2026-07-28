"use client";

import { HelpCircle, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export function TopAppBar() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-soft bg-[rgba(248,250,252,0.8)] px-8 py-4 backdrop-blur-[6px]">
      <span className="text-xl font-bold text-brand">PASOK Logistics</span>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Bantuan"
          onClick={() => router.push("/produsen/bantuan")}
          className="text-body"
        >
          <HelpCircle className="size-5" strokeWidth={2} />
        </button>
        <div className="flex size-8 items-center justify-center rounded-xl border border-border-soft bg-chip-strong text-ink">
          <User className="size-4" strokeWidth={2} />
        </div>
        <button
          type="button"
          aria-label="Keluar"
          onClick={handleLogout}
          className="text-body"
        >
          <LogOut className="size-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
