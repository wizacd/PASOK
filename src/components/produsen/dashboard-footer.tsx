const FOOTER_LINKS = ["Pusat Bantuan", "Syarat & Ketentuan", "Kebijakan Privasi"];

export function DashboardFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-border-soft px-8 py-8 text-[11px] text-muted">
      <span>© 2024 PASOK Logistics. Semua Hak Dilindungi.</span>
      <div className="flex gap-6">
        {FOOTER_LINKS.map((label) => (
          <button key={label} type="button" className="hover:text-body">
            {label}
          </button>
        ))}
      </div>
    </footer>
  );
}
