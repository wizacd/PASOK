"use client";

import { useRouter } from "next/navigation";
import { Calendar, Handshake, Inbox, PlusCircle, Truck } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import { LatestOffersTable } from "@/components/koperasi/dashboard/latest-offers-table";
import { MetricCard } from "@/components/koperasi/dashboard/metric-card";
import { PriorityNotificationsCard } from "@/components/koperasi/dashboard/priority-notifications-card";
import { QuickShortcutCard } from "@/components/koperasi/dashboard/quick-shortcut-card";
import { VolumeTrendChart } from "@/components/koperasi/dashboard/volume-trend-chart";
import { signOut } from "@/lib/auth";

export default function KoperasiDashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <main className="flex flex-1 flex-col gap-8 px-8 py-8">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
                  Ringkasan Operasional
                </h1>
                <p className="text-base text-body">
                  Data terkini operasional hub per{" "}
                  <span className="font-semibold">24 Mei 2024</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xs border border-border-soft bg-white px-4 py-2 text-xs font-semibold tracking-[0.6px] text-ink"
                >
                  <Calendar className="size-4" strokeWidth={2} />
                  Atur Periode
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xs bg-info px-4 py-2 text-xs font-semibold tracking-[0.6px] text-white"
                >
                  <PlusCircle className="size-3.5" strokeWidth={2} />
                  Input Penawaran Baru
                </button>
              </div>
            </div>

            <div className="flex gap-6">
              <MetricCard
                icon={Inbox}
                iconBgClassName="bg-success/5"
                iconClassName="text-success"
                trend="+12%"
                label="Jumlah Tawaran Masuk"
                value="48"
              />
              <MetricCard
                icon={Truck}
                iconBgClassName="bg-info/5"
                iconClassName="text-info"
                trend="Stabil"
                label="Total Volume Komoditas"
                value="12.5"
                unit="Ton"
              />
              <MetricCard
                icon={Handshake}
                iconBgClassName="bg-warning/5"
                iconClassName="text-warning"
                trend="94%"
                label="Transaksi Berhasil"
                value="312"
                unit="Juta"
              />
              <MetricCard
                icon={Truck}
                iconBgClassName="bg-body/5"
                iconClassName="text-body"
                label="Armada Aktif"
                value="14"
                unit="Unit"
              />
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8">
                <VolumeTrendChart />
              </div>
              <div className="col-span-4 flex flex-col gap-6">
                <PriorityNotificationsCard />
                <QuickShortcutCard />
              </div>
            </div>

            <LatestOffersTable />

            <button
              type="button"
              onClick={handleLogout}
              className="w-fit rounded-xs bg-brand-deep px-6 py-3 text-white"
            >
              Keluar
            </button>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
