import { Bell, HelpCircle, Search, User } from "lucide-react";

export function DashboardTopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border-soft bg-white px-8">
      <label className="flex w-80 items-center gap-2 rounded-xs border border-transparent bg-chip px-4 py-2.5">
        <Search className="size-[15px] shrink-0 text-body" strokeWidth={2} />
        <input
          type="search"
          placeholder="Cari data, mitra, atau armada..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-body/70 focus:outline-none"
        />
      </label>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex items-center justify-center rounded-xl p-2 text-body"
        >
          <Bell className="size-5" strokeWidth={2} />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-white bg-danger" />
        </button>
        <button
          type="button"
          aria-label="Bantuan"
          className="flex items-center justify-center rounded-xl p-2 text-body"
        >
          <HelpCircle className="size-5" strokeWidth={2} />
        </button>

        <div className="h-8 w-px bg-border-soft" />

        <div className="flex items-center gap-3 rounded-xs p-1">
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold tracking-[0.6px] text-ink">
              Budi Santoso
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.5px] text-body">
              Manager Hub
            </span>
          </div>
          <div className="flex size-10 items-center justify-center rounded-xl border border-border-soft bg-chip-strong text-ink">
            <User className="size-5" strokeWidth={2} />
          </div>
        </div>
      </div>
    </header>
  );
}
