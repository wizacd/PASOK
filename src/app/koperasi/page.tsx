"use client";

import { useEffect, useState } from "react";
import { Handshake, Package, Users, Wallet } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import {
  LatestOffersTable,
  type AktivitasMatching,
} from "@/components/koperasi/dashboard/latest-offers-table";
import { MetricCard } from "@/components/koperasi/dashboard/metric-card";
import {
  PriorityNotificationsCard,
  type PenawaranMendekatiPanen,
} from "@/components/koperasi/dashboard/priority-notifications-card";
import { QuickShortcutCard } from "@/components/koperasi/dashboard/quick-shortcut-card";
import {
  VolumeTrendChart,
  type TrendHarian,
} from "@/components/koperasi/dashboard/volume-trend-chart";
import { getAccessToken } from "@/lib/auth";

type Ringkasan = {
  totalVolumeDiterimaKg: number;
  jumlahTransaksiSelesai: number;
  totalNilaiSelesai: number;
  jumlahProdusen: number;
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

export default function KoperasiDashboardPage() {
  const [ringkasan, setRingkasan] = useState<Ringkasan | null>(null);
  const [trendMingguan, setTrendMingguan] = useState<TrendHarian[]>([]);
  const [aktivitasTerbaru, setAktivitasTerbaru] = useState<AktivitasMatching[]>([]);
  const [penawaranMendekatiPanen, setPenawaranMendekatiPanen] = useState<
    PenawaranMendekatiPanen[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) {
        setError("Sesi tidak ditemukan. Silakan masuk kembali.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/koperasi/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Gagal memuat data");
        setRingkasan(data.ringkasan);
        setTrendMingguan(data.trendMingguan);
        setAktivitasTerbaru(data.aktivitasTerbaru);
        setPenawaranMendekatiPanen(data.penawaranMendekatiPanen);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    load();
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
                Ringkasan Operasional
              </h1>
              <p className="text-base text-body">
                Data terkini operasional koperasi per{" "}
                <span className="font-semibold">
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
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
                    label="Stok Diterima"
                    value={
                      loading
                        ? "..."
                        : (ringkasan?.totalVolumeDiterimaKg ?? 0).toLocaleString("id-ID")
                    }
                    unit="Kg"
                  />
                  <MetricCard
                    icon={Handshake}
                    iconBgClassName="bg-success/5"
                    iconClassName="text-success"
                    label="Transaksi Selesai"
                    value={loading ? "..." : `${ringkasan?.jumlahTransaksiSelesai ?? 0}`}
                  />
                  <MetricCard
                    icon={Wallet}
                    iconBgClassName="bg-warning/5"
                    iconClassName="text-warning"
                    label="Nilai Transaksi Selesai"
                    value={
                      loading
                        ? "..."
                        : formatRupiahRingkas(ringkasan?.totalNilaiSelesai ?? 0)
                    }
                  />
                  <MetricCard
                    icon={Users}
                    iconBgClassName="bg-body/5"
                    iconClassName="text-body"
                    label="Produsen Terlibat"
                    value={loading ? "..." : `${ringkasan?.jumlahProdusen ?? 0}`}
                  />
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <VolumeTrendChart data={trendMingguan} />
                  </div>
                  <div className="col-span-4 flex flex-col gap-6">
                    <PriorityNotificationsCard items={penawaranMendekatiPanen} />
                    <QuickShortcutCard />
                  </div>
                </div>

                <LatestOffersTable items={aktivitasTerbaru} />
              </>
            )}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
