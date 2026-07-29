import Link from "next/link";
import { ChevronRight, LayoutDashboard, ListChecks } from "lucide-react";

const NEXT_STEPS = [
  {
    href: "/koperasi/supply-matching",
    icon: ListChecks,
    iconBgClassName: "bg-success/10",
    iconClassName: "text-success",
    title: "Mulai Terima Tawaran",
    description: "Lihat penawaran produsen yang cocok dengan wilayah Anda.",
  },
  {
    href: "/koperasi",
    icon: LayoutDashboard,
    iconBgClassName: "bg-info/10",
    iconClassName: "text-info",
    title: "Buka Dashboard Operasional",
    description: "Pantau ringkasan stok, transaksi, dan aktivitas terbaru.",
  },
];

export function NextStepsCard() {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">Langkah Selanjutnya</h2>

      <div className="flex flex-col gap-4">
        {NEXT_STEPS.map(
          ({ href, icon: Icon, iconBgClassName, iconClassName, title, description }) => (
            <Link
              key={title}
              href={href}
              className="flex w-full items-center gap-4 rounded-sm border border-border-soft p-[17px] text-left"
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xs ${iconBgClassName}`}
              >
                <Icon className={`size-5 ${iconClassName}`} strokeWidth={2} />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-semibold text-ink">
                  {title}
                </span>
                <span className="text-[11px] font-medium text-body">
                  {description}
                </span>
              </div>
              <ChevronRight className="size-3 shrink-0 text-body" strokeWidth={2} />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
