const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

export type MonthlyPoint = {
  label: string;
  jumlah: number;
};

export function buildMonthlyDistribution(dates: string[], monthsBack = 6): MonthlyPoint[] {
  const now = new Date();
  const buckets: MonthlyPoint[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ label: `${BULAN[d.getMonth()]} ${d.getFullYear()}`, jumlah: 0 });
  }

  for (const iso of dates) {
    const d = new Date(iso);
    const monthsAgo =
      (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
    if (monthsAgo >= 0 && monthsAgo < monthsBack) {
      buckets[monthsBack - 1 - monthsAgo].jumlah += 1;
    }
  }

  return buckets;
}

export function MonthlyDistributionChart({ data }: { data: MonthlyPoint[] }) {
  const max = Math.max(1, ...data.map((point) => point.jumlah));

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border-soft bg-white p-6">
      <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
        Distribusi Transaksi Bulanan
      </span>

      {data.every((point) => point.jumlah === 0) ? (
        <p className="text-sm text-body">Belum ada transaksi dalam 6 bulan terakhir.</p>
      ) : (
        <div className="flex h-40 items-end gap-3">
          {data.map((point) => (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end">
                <div
                  className="w-full rounded-t-xs bg-brand"
                  style={{ height: `${(point.jumlah / max) * 100}%`, minHeight: point.jumlah > 0 ? "4px" : 0 }}
                  title={`${point.jumlah} transaksi`}
                />
              </div>
              <span className="text-[11px] font-medium text-muted">{point.label.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
