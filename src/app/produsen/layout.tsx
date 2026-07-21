import { DashboardFooter } from "@/components/produsen/dashboard-footer";
import { SidebarNav } from "@/components/produsen/sidebar-nav";
import { TopAppBar } from "@/components/produsen/top-app-bar";
import { RequireAuth } from "@/components/auth/require-auth";

export default function ProdusenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth role="produsen">
      <div className="flex min-h-screen w-full bg-canvas">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopAppBar />
          <main className="flex-1 p-8">{children}</main>
          <DashboardFooter />
        </div>
      </div>
    </RequireAuth>
  );
}
