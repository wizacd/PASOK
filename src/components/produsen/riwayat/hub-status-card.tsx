import { PackageCheck } from "lucide-react";

export type TransactionStatusCardProps = {
  menunggu: number;
  dicocokkan: number;
  selesai: number;
};

export function HubStatusCard({ menunggu, dicocokkan, selesai }: TransactionStatusCardProps) {
  const stats = [
    { value: menunggu, label: "Menunggu" },
    { value: dicocokkan, label: "Dicocokkan" },
    { value: selesai, label: "Selesai" },
  ];

  return (
    <div className="flex flex-col justify-between rounded-lg border border-ink bg-ink p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <PackageCheck className="size-5 text-border-soft" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[1.2px] text-muted">
            Status Transaksi
          </span>
        </div>

        <div className="flex flex-col gap-4 pt-7">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between text-sm">
              <span className="text-muted">{stat.label}</span>
              <span className="text-base font-semibold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
