const STEPS = [
  { number: 1, label: "Profil Koperasi" },
  { number: 2, label: "Cakupan Operasi" },
  { number: 3, label: "Kelola Komoditas" },
  { number: 4, label: "Selesai" },
];

export function RegistrationStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full items-center justify-center">
      <nav className="flex items-center">
        {STEPS.map((step, index) => {
          const isActive = step.number === currentStep;
          const isLast = index === STEPS.length - 1;
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-xl border-2 text-xs font-bold tracking-[0.6px] ${
                    isActive
                      ? "border-info text-info"
                      : "border-muted text-muted"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`pl-2 text-xs font-semibold tracking-[0.6px] ${
                    isActive ? "text-info" : "text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className="mx-4 h-px w-12 bg-border-soft" />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
