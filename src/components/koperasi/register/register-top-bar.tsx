import { Bell, HelpCircle, Search, User } from "lucide-react";

export function RegisterTopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border-soft bg-[rgba(248,249,255,0.9)] px-8">
      <span className="text-xl font-semibold text-info">
        Setup Koperasi Baru
      </span>

      <div className="flex items-center gap-6">
        <label className="flex w-64 items-center gap-2 rounded-xs border border-border-soft bg-chip px-4 py-1.5">
          <Search className="size-[15px] shrink-0 text-body" strokeWidth={2} />
          <input
            type="search"
            placeholder="Cari panduan..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-body/70 focus:outline-none"
          />
        </label>

        <div className="flex items-center gap-4">
          <button type="button" aria-label="Notifikasi" className="text-body">
            <Bell className="size-4" strokeWidth={2} />
          </button>
          <button type="button" aria-label="Bantuan" className="text-body">
            <HelpCircle className="size-5" strokeWidth={2} />
          </button>
          <div className="flex size-8 items-center justify-center rounded-xl border border-border-soft bg-chip-strong text-ink">
            <User className="size-4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </header>
  );
}
