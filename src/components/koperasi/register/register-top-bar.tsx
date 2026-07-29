import { User } from "lucide-react";

export function RegisterTopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border-soft bg-[rgba(248,249,255,0.9)] px-8">
      <span className="text-xl font-semibold text-info">
        Setup Koperasi Baru
      </span>

      <div className="flex size-8 items-center justify-center rounded-xl border border-border-soft bg-chip-strong text-ink">
        <User className="size-4" strokeWidth={2} />
      </div>
    </header>
  );
}
