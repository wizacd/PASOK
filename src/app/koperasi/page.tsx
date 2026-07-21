"use client";

import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { signOut } from "@/lib/auth";

export default function KoperasiDashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-canvas p-8 text-center">
        <h1 className="text-2xl font-semibold text-ink">
          Dashboard Koperasi
        </h1>
        <p className="max-w-md text-body">
          Login berhasil. Dashboard koperasi masih dalam pengembangan.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-sm bg-brand-deep px-6 py-3 text-white"
        >
          Keluar
        </button>
      </div>
    </RequireAuth>
  );
}
