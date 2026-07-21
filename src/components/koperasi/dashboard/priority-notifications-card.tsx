import { AlertTriangle, ShieldCheck, Ship } from "lucide-react";

const NOTIFICATIONS = [
  {
    icon: AlertTriangle,
    iconBgClassName: "bg-warning/10",
    iconClassName: "text-warning",
    title: "Penawaran Mendesak: Jagung",
    time: "2m lalu",
    description: "Volume 5 Ton - Kedaluwarsa dalam 3 jam.",
  },
  {
    icon: ShieldCheck,
    iconBgClassName: "bg-info/10",
    iconClassName: "text-info",
    title: "Verifikasi Akun Baru",
    time: "1j lalu",
    description: "3 Produsen dari wilayah Bitung menunggu verifikasi identitas.",
  },
  {
    icon: Ship,
    iconBgClassName: "bg-success/10",
    iconClassName: "text-success",
    title: "Jadwal Kapal Update",
    time: "4j lalu",
    description: "KM Nusantara 02 estimasi tiba 08:00 WIB besok.",
  },
];

export function PriorityNotificationsCard() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-4 py-4">
        <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
          Notifikasi Prioritas
        </h4>
        <span className="rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-white">
          2 Baru
        </span>
      </div>

      <div className="flex flex-col">
        {NOTIFICATIONS.map(
          ({ icon: Icon, iconBgClassName, iconClassName, title, time, description }, index) => (
            <div
              key={title}
              className={`flex gap-3 px-4 py-4 ${
                index > 0 ? "border-t border-border-soft" : ""
              }`}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-xs ${iconBgClassName}`}
              >
                <Icon className={`size-4 ${iconClassName}`} strokeWidth={2} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold tracking-[0.6px] text-ink">
                    {title}
                  </span>
                  <span className="shrink-0 text-[10px] text-body">
                    {time}
                  </span>
                </div>
                <p className="text-sm text-body">{description}</p>
                {index === 0 ? (
                  <button
                    type="button"
                    className="w-fit pt-1 text-[11px] font-semibold uppercase tracking-[0.6px] text-info"
                  >
                    Tindak Lanjuti
                  </button>
                ) : null}
              </div>
            </div>
          ),
        )}
      </div>

      <button
        type="button"
        className="border-t border-border-soft py-3 text-center text-sm text-body"
      >
        Lihat Semua Aktivitas
      </button>
    </div>
  );
}
