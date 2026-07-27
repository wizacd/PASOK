export type AktivitasMatching = {
  matching_id: string;
  status: "diterima" | "selesai";
  created_at: string;
  komoditas: string;
  produsen: string;
  volume_kg: number;
};

const STATUS_STYLES: Record<string, string> = {
  diterima: "bg-info/10 text-info",
  selesai: "bg-success/10 text-success",
};

const STATUS_LABEL: Record<string, string> = {
  diterima: "Diterima",
  selesai: "Selesai",
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function LatestOffersTable({ items }: { items: AktivitasMatching[] }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <h3 className="text-xl font-semibold text-ink">
          Aktivitas Matching Terbaru
        </h3>
      </div>

      <table className="w-full text-left">
        <thead className="bg-canvas">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Produsen
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Komoditas
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Volume
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Tanggal
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-body">
                Belum ada aktivitas matching.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={item.matching_id}
                className={index % 2 === 1 ? "bg-canvas/50" : undefined}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-chip text-base font-bold text-info">
                      {item.produsen.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-base font-medium text-ink">
                      {item.produsen}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-ink">{item.komoditas}</td>
                <td className="px-6 py-4 text-sm text-ink">
                  {item.volume_kg.toLocaleString("id-ID")} Kg
                </td>
                <td className="px-6 py-4 text-sm text-ink">
                  {formatTanggal(item.created_at)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-xs px-2 py-1 text-[11px] font-bold uppercase ${STATUS_STYLES[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
