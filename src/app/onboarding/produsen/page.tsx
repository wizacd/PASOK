import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { OnboardingSidebar } from "@/components/onboarding/onboarding-sidebar";
import { CommoditySelector } from "@/components/onboarding/commodity-selector";

export default function OnboardingProdusenStep1Page() {
  return (
    <div className="isolate flex min-h-screen w-full flex-col bg-canvas">
      <OnboardingHeader />
      <main className="flex flex-1 items-start">
        <OnboardingSidebar currentStep={1} />
        <section className="flex flex-1 justify-center overflow-y-auto bg-canvas p-12">
          <div className="w-full max-w-4xl">
            <CommoditySelector />
          </div>
        </section>
      </main>
    </div>
  );
}
