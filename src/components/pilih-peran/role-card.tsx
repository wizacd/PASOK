import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export type Role = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgClassName: string;
  accentClassName: string;
  ctaLabel: string;
  href: string;
};

export function RoleCard({
  title,
  description,
  icon: Icon,
  iconBgClassName,
  accentClassName,
  ctaLabel,
  href,
}: Role) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between gap-6 rounded-lg border border-border-soft bg-white p-8 transition-colors hover:border-brand/50"
    >
      <div>
        <div className="flex items-start justify-between">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-lg ${iconBgClassName}`}
          >
            <Icon className={accentClassName} size={22} strokeWidth={2} />
          </div>
          <ArrowUpRight
            className="size-4 text-border-soft transition-colors group-hover:text-brand"
            strokeWidth={2}
          />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-base leading-6 text-body">{description}</p>
      </div>
      <div className="border-t border-border-soft pt-6">
        <span
          className={`text-xs font-semibold uppercase tracking-[0.6px] ${accentClassName}`}
        >
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}
