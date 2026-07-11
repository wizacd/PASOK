const STATS = [
  { value: 12, label: "Menunggu", className: "bg-chip border-border-soft text-warning" },
  { value: 45, label: "Diterima", className: "bg-forest/5 border-forest/20 text-forest" },
  { value: 3, label: "Ditolak", className: "bg-danger/5 border-danger/20 text-danger" },
];

export function OfferSummaryWidget() {
  return (
    <div className="flex flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h3 className="text-xl font-semibold text-ink">Ringkasan Penawaran</h3>

      <div className="flex justify-center gap-2">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-1 flex-col items-center rounded-sm border p-3 ${stat.className}`}
          >
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="pt-1 text-[10px] font-bold uppercase text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="rounded-xs border border-forest/20 py-2 text-sm font-bold text-forest"
      >
        Lihat Detail Laporan
      </button>
    </div>
  );
}
