"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, LogOut, User } from "lucide-react";
import { getAccessToken, signOut } from "@/lib/auth";

export function DashboardTopBar() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [namaKoperasi, setNamaKoperasi] = useState("");

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) return;
      const response = await fetch("/api/koperasi/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) return;
      const data = await response.json();
      setNama(data.nama);
      setNamaKoperasi(data.nama_koperasi);
    }
    load();
  }, []);

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border-soft bg-white px-8">
      <span className="text-sm font-semibold text-body">{namaKoperasi}</span>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Bantuan"
          onClick={() => router.push("/koperasi/bantuan")}
          className="flex items-center justify-center rounded-xl p-2 text-body"
        >
          <HelpCircle className="size-5" strokeWidth={2} />
        </button>

        <div className="h-8 w-px bg-border-soft" />

        <div className="flex items-center gap-3 rounded-xs p-1">
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold tracking-[0.6px] text-ink">
              {nama || "..."}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.5px] text-body">
              Pengurus Koperasi
            </span>
          </div>
          <div className="flex size-10 items-center justify-center rounded-xl border border-border-soft bg-chip-strong text-ink">
            <User className="size-5" strokeWidth={2} />
          </div>
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
