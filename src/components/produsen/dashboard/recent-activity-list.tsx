import { CheckCircle2, Clock, Truck, type LucideIcon } from "lucide-react";

type Activity = {
  id: string;
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
  time: string;
};

const ACTIVITIES: Activity[] = [
  {
    id: "1",
    icon: CheckCircle2,
    iconClassName: "bg-success/10 text-success",
    title: "Penawaran Diterima",
    description: "500kg Jagung Pipil telah divalidasi oleh Gudang A.",
    time: "2 jam yang lalu",
  },
  {
    id: "2",
    icon: Clock,
    iconClassName: "bg-warning/10 text-warning",
    title: "Verifikasi Dokumen",
    description: "Dokumen pengiriman sedang dalam pengecekan sistem.",
    time: "5 jam yang lalu",
  },
  {
    id: "3",
    icon: Truck,
    iconClassName: "bg-info/10 text-info",
    title: "Pengiriman Dijadwalkan",
    description: "Logistik akan menjemput 200kg Ikan di Pelabuhan B.",
    time: "Kemarin",
  },
];

export function RecentActivityList() {
  return (
    <div className="flex flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-ink">Aktivitas Terakhir</h3>
        <button type="button" className="text-[11px] font-bold text-forest">
          LIHAT SEMUA
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${activity.iconClassName}`}
              >
                <Icon className="size-5" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-ink">
                  {activity.title}
                </span>
                <span className="text-xs text-body">
                  {activity.description}
                </span>
                <span className="pt-1 text-[10px] italic text-muted">
                  {activity.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
