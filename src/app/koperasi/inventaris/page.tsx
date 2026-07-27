"use client";

import { useEffect, useState } from "react";
import { Archive, Boxes, Package, Wallet } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import { MetricCard } from "@/components/koperasi/dashboard/metric-card";
import {
  CommodityBreakdownChart,
  type KomoditasBreakdown,
} from "@/components/koperasi/inventaris/commodity-breakdown-chart";
import {
  InventoryDetailTable,
  type InventoryItem,
} from "@/components/koperasi/inventaris/inventory-detail-table";
import { supabase } from "@/lib/supabase";

type Ringkasan = {
  totalVolumeKg: number;
  totalNilai: number;
  jumlahLot: number;
  jumlahJenisProduk: number;
  breakdownKomoditas: KomoditasBreakdown[];
};

function formatRupiahRingkas(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`;
  }
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} Jt`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InventarisPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [ringkasan, setRingkasan] = useState<Ringkasan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          `/api/koperasi/inventaris?koperasi_ref=${profile.koperasi_ref}`,
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
                Manajemen Inventaris &amp; Stok
              </h1>
              <p className="text-base text-body">
                Stok komoditas yang sudah ditimbang dan diterima secara fisik oleh koperasi.
              </p>
            </div>

            {error ? (
              <p className="rounded-xs border border-danger/20 bg-danger/5 px-6 py-4 text-sm text-danger">
                {error}
              </p>
            ) : (
              <>
                <div className="flex gap-6">
                  <MetricCard
                    icon={Package}
                    iconBgClassName="bg-info/5"
                    iconClassName="text-info"
                    label="Total Stok"
                    value={
                      loading
                        ? "..."
                        : (ringkasan?.totalVolumeKg ?? 0).toLocaleString("id-ID")
                    }
                    unit="Kg"
                  />
                  <MetricCard
                    icon={Wallet}
                    iconBgClassName="bg-success/5"
                    iconClassName="text-success"
                    label="Total Nilai Stok"
                    value={
                      loading
                        ? "..."
                        : formatRupiahRingkas(ringkasan?.totalNilai ?? 0)
                    }
                  />
                  <MetricCard
                    icon={Archive}
                    iconBgClassName="bg-warning/5"
                    iconClassName="text-warning"
                    label="Jumlah Lot Masuk"
                    value={loading ? "..." : `${ringkasan?.jumlahLot ?? 0}`}
                  />
                  <MetricCard
                    icon={Boxes}
                    iconBgClassName="bg-body/5"
                    iconClassName="text-body"
                    label="Jenis Produk"
                    value={loading ? "..." : `${ringkasan?.jumlahJenisProduk ?? 0}`}
                  />
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-4">
                    <CommodityBreakdownChart
                      data={ringkasan?.breakdownKomoditas ?? []}
                      totalVolumeKg={ringkasan?.totalVolumeKg ?? 0}
                    />
                  </div>
                  <div className="col-span-8">
                    <InventoryDetailTable items={items} />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
