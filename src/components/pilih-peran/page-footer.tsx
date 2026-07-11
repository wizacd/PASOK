import { PhoneCall, ShieldCheck } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="relative z-10 mt-auto flex flex-col items-center gap-6 border-t border-border-soft/30 px-8 py-8">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-body" strokeWidth={2} />
          <span className="text-sm text-body">Sistem Terenkripsi & Aman</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCall className="size-3.5 text-body" strokeWidth={2} />
          <span className="text-sm text-body">Butuh Bantuan? Hubungi Kami</span>
        </div>
      </div>
      <p className="text-[11px] text-muted">
        © 2026 PASOK. Seluruh hak cipta dilindungi.
      </p>
    </footer>
  );
}
