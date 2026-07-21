import { TrendingUp, type LucideIcon } from "lucide-react";

export function MetricCard({
  icon: Icon,
  iconBgClassName,
  iconClassName,
  trend,
  label,
  value,
  unit,
}: {
  icon: LucideIcon;
  iconBgClassName: string;
  iconClassName: string;
  trend?: string;
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="relative flex flex-1 flex-col gap-1 overflow-hidden rounded-xs border border-border-soft bg-white p-6">
      <div
        className={`absolute -right-8 -top-8 size-24 rounded-xl ${iconBgClassName}`}
      />
      <div className="relative flex items-start justify-between">
        <div
          className={`flex size-12 items-center justify-center rounded-xl ${iconBgClassName}`}
        >
          <Icon className={`size-6 ${iconClassName}`} strokeWidth={2} />
        </div>
        {trend ? (
          <span className="flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-info">
            <TrendingUp className="size-3" strokeWidth={2.5} />
            {trend}
          </span>
        ) : null}
      </div>
      <span className="relative pt-3 text-xs font-semibold tracking-[0.6px] text-body">
        {label}
      </span>
      <div className="relative flex items-baseline gap-1.5">
        <span className="text-[32px] font-bold leading-[48px] text-ink">
          {value}
        </span>
        {unit ? (
          <span className="text-xl font-medium text-body">{unit}</span>
        ) : null}
      </div>
    </div>
  );
}
