import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

export type PriceCardProps = {
  icon: LucideIcon;
  iconClassName: string;
  commodity: string;
  price: string;
  metaLabel: string;
  metaValue: string;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
};

export function PriceCard({
  icon: Icon,
  iconClassName,
  commodity,
  price,
  metaLabel,
  metaValue,
  trend,
}: PriceCardProps) {
  const TrendIcon = trend?.direction === "up" ? TrendingUp : TrendingDown;
  const trendClassName =
    trend?.direction === "up"
      ? "bg-success/10 text-success"
      : "bg-danger/10 text-danger";

  return (
    <div className="flex flex-col gap-2 rounded-sm border border-border-soft bg-white px-6 py-6">
      <div className="flex items-start justify-between">
        <Icon className={`size-9 ${iconClassName}`} strokeWidth={1.5} />
        {trend ? (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${trendClassName}`}
          >
            <TrendIcon className="size-2.5" strokeWidth={2.5} />
            {trend.value}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col pt-2">
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-muted">
          {commodity}
        </span>
        <div className="flex items-baseline gap-2 pb-2 pt-1">
          <span className="text-3xl font-bold text-ink">{price}</span>
          <span className="text-sm text-muted">/ kg</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-soft pt-4">
        <span className="text-[11px] text-muted">{metaLabel}</span>
        <span className="text-[11px] font-bold text-ink">{metaValue}</span>
      </div>
    </div>
  );
}
