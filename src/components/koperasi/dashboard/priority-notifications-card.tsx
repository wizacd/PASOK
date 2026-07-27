import Link from "next/link";
import { Clock } from "lucide-react";

export type PenawaranMendekatiPanen = {
  id: string;
  produsen: string;
  komoditas: string;
  volume_kg: number;
  estimasi_tanggal_panen: string;
};

function hariLagi(tanggalPanen: string) {
  const diffMs = new Date(tanggalPanen).getTime() - Date.now();
  const diffHari = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffHari <= 0) return "Siap panen";
  return `${diffHari} hari lagi`;
}

export function PriorityNotificationsCard({
  items,
}: {
  items: PenawaranMendekatiPanen[];
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-4 py-4">
        <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
          Penawaran Mendekati Panen
        </h4>
        {items.length > 0 ? (
          <span className="rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold text-white">
            {items.length}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col">
        {items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-body">
            Tidak ada penawaran yang perlu segera ditindaklanjuti.
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`flex gap-3 px-4 py-4 ${
                index > 0 ? "border-t border-border-soft" : ""
              }`}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xs bg-warning/10">
                <Clock className="size-4 text-warning" strokeWidth={2} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold tracking-[0.6px] text-ink">
                    {item.komoditas} — {item.produsen}
                  </span>
                  <span className="shrink-0 text-[10px] text-body">
                    {hariLagi(item.estimasi_tanggal_panen)}
                  </span>
                </div>
                <p className="text-sm text-body">
                  Volume {item.volume_kg.toLocaleString("id-ID")} Kg
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/koperasi/supply-matching"
        className="border-t border-border-soft py-3 text-center text-sm text-body"
      >
        Lihat di Supply Matching
      </Link>
    </div>
  );
}
