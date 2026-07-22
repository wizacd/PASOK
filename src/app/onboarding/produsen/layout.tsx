"use client";

import { usePathname } from "next/navigation";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { OnboardingSidebar } from "@/components/onboarding/onboarding-sidebar";
import { ProdusenWizardProvider } from "@/components/onboarding/produsen/registration-wizard-context";

function currentStepFromPath(pathname: string) {
  if (pathname.endsWith("/kapasitas")) return 4;
  if (pathname.endsWith("/komoditas")) return 3;
  if (pathname.endsWith("/lokasi")) return 2;
  return 1;
}

export default function OnboardingProdusenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = currentStepFromPath(pathname);

  return (
    <ProdusenWizardProvider>
      <div className="isolate flex min-h-screen w-full flex-col bg-canvas">
        <OnboardingHeader />
        <main className="flex flex-1 items-start">
          <OnboardingSidebar currentStep={currentStep} />
          <section className="flex flex-1 justify-center overflow-y-auto bg-canvas p-12">
            {children}
          </section>
        </main>
      </div>
    </ProdusenWizardProvider>
  );
}
