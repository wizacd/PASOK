import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Pusat Bantuan", href: "/produsen/bantuan" },
  { label: "Syarat & Ketentuan", href: "/produsen/syarat-ketentuan" },
  { label: "Kebijakan Privasi", href: "/produsen/kebijakan-privasi" },
];

export function DashboardFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-border-soft px-8 py-8 text-[11px] text-muted">
      <span>© 2024 PASOK Logistics. Semua Hak Dilindungi.</span>
      <div className="flex gap-6">
        {FOOTER_LINKS.map((item) => (
          <Link key={item.label} href={item.href} className="hover:text-body">
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
