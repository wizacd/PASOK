import { RegisterSidebar } from "@/components/koperasi/register/register-sidebar";
import { RegisterTopBar } from "@/components/koperasi/register/register-top-bar";

export default function KoperasiRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-canvas">
      <RegisterSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <RegisterTopBar />
        <main className="flex flex-1 justify-center px-16 py-10">
          <div className="flex w-full max-w-4xl flex-col gap-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
