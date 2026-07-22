import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import { ImpactOverviewCards } from "@/components/koperasi/transaksi/impact-overview-cards";
import { SocialImpactSection } from "@/components/koperasi/transaksi/social-impact-section";
import { TransactionLedgerTable } from "@/components/koperasi/transaksi/transaction-ledger-table";

export default function TransaksiPage() {
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

            <ImpactOverviewCards />
            <TransactionLedgerTable />
            <SocialImpactSection />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
