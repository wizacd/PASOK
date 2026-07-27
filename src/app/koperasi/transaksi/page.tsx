"use client";

import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import {
  ImpactOverviewCards,
  type RingkasanTransaksi,
} from "@/components/koperasi/transaksi/impact-overview-cards";
import { SocialImpactSection } from "@/components/koperasi/transaksi/social-impact-section";
import {
  TransactionLedgerTable,
  type TransaksiSelesai,
} from "@/components/koperasi/transaksi/transaction-ledger-table";
import { supabase } from "@/lib/supabase";

export default function TransaksiPage() {
  const [items, setItems] = useState<TransaksiSelesai[]>([]);
  const [ringkasan, setRingkasan] = useState<RingkasanTransaksi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalVolumeKg = items.reduce((sum, i) => sum + i.volume_kg, 0);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("koperasi_ref")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile?.koperasi_ref) {
        setError("Tidak menemukan data koperasi untuk akun ini.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/koperasi/transaksi-selesai?koperasi_ref=${profile.koperasi_ref}`,
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Gagal memuat data");
        setItems(data.items);
        setRingkasan(data.ringkasan);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <main className="flex flex-1 flex-col gap-8 px-8 py-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
                Transaksi &amp; Dampak Sosial
              </h1>
              <p className="text-base text-body">
                Riwayat transaksi terkonfirmasi dan dampaknya bagi produsen.
              </p>
            </div>

            {error ? (
              <p className="rounded-xs border border-danger/20 bg-danger/5 px-6 py-4 text-sm text-danger">
                {error}
              </p>
            ) : (
              <>
                <ImpactOverviewCards ringkasan={ringkasan} loading={loading} />
                <TransactionLedgerTable items={items} />
                <SocialImpactSection
                  jumlahProdusen={ringkasan?.jumlahProdusen ?? 0}
                  totalVolumeKg={totalVolumeKg}
                  loading={loading}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
