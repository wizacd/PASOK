import { CheckCircle2, Clock, PackageCheck } from "lucide-react";

export type ActivityOffer = {
  id: string;
  namaKomoditas: string;
  estimasiVolume: number | null;
  status: "tersedia" | "matched" | "terjual";
  createdAt: string;
};

const STATUS_META = {
  tersedia: {
    icon: Clock,
    iconClassName: "bg-warning/10 text-warning",
    title: "Penawaran Dibuat",
  },
  matched: {
    icon: CheckCircle2,
    iconClassName: "bg-success/10 text-success",
    title: "Penawaran Dicocokkan",
  },
  terjual: {
    icon: PackageCheck,
    iconClassName: "bg-info/10 text-info",
    title: "Transaksi Selesai",
  },
} as const;

function formatRelativeTime(isoDate: string) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Baru saja";
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Kemarin";
  return `${diffDays} hari yang lalu`;
}

export function RecentActivityList({ offers }: { offers: ActivityOffer[] }) {
  const recent = offers.slice(0, 3);

  return (
    <div className="flex flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h3 className="text-xl font-semibold text-ink">Aktivitas Terakhir</h3>

      {recent.length === 0 ? (
        <p className="text-sm text-body">Belum ada aktivitas penawaran.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {recent.map((offer) => {
            const meta = STATUS_META[offer.status];
            const Icon = meta.icon;
            return (
              <div key={offer.id} className="flex items-start gap-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${meta.iconClassName}`}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-ink">{meta.title}</span>
                  <span className="text-xs text-body">
                    {offer.estimasiVolume ?? "-"} kg {offer.namaKomoditas}
                  </span>
                  <span className="pt-1 text-[10px] italic text-muted">
                    {formatRelativeTime(offer.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
