import { RegisterTopBar } from "@/components/koperasi/register/register-top-bar";
import { RegistrationWizardProvider } from "@/components/koperasi/register/registration-wizard-context";

export default function KoperasiRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegistrationWizardProvider>
      <div className="flex min-h-screen w-full flex-col bg-canvas">
        <RegisterTopBar />
        <main className="flex flex-1 justify-center px-16 py-10">
          <div className="flex w-full max-w-6xl flex-col gap-8">
            {children}
          </div>
        </main>
      </div>
    </RegistrationWizardProvider>
  );
}
