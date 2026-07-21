import { ChevronRight, Download, ListChecks, UserCog } from "lucide-react";

const NEXT_STEPS = [
  {
    icon: UserCog,
    iconBgClassName: "bg-info/10",
    iconClassName: "text-info",
    title: "Lengkapi Profil Detail",
    description: "Tambahkan data pengurus dan armada.",
  },
  {
    icon: ListChecks,
    iconBgClassName: "bg-success/10",
    iconClassName: "text-success",
    title: "Mulai Terima Tawaran",
    description: "Aktifkan notifikasi penawaran produsen.",
  },
  {
    icon: Download,
    iconBgClassName: "bg-warning/10",
    iconClassName: "text-warning",
    title: "Unduh Sertifikat Kemitraan",
    description: "Simpan dokumen bukti registrasi Anda.",
  },
];

export function NextStepsCard() {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">Langkah Selanjutnya</h2>

      <div className="flex flex-col gap-4">
        {NEXT_STEPS.map(
          ({ icon: Icon, iconBgClassName, iconClassName, title, description }) => (
            <button
              key={title}
              type="button"
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
            </button>
          ),
        )}
      </div>
    </div>
  );
}
