import { Download } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  Masuk: "bg-info/10 text-info",
  Diproses: "bg-info/10 text-info",
  Prioritas: "bg-warning/10 text-warning",
};

const OFFERS = [
  {
    initial: "A",
    nama: "Andi Pratama",
    komoditas: "Kopra Grade A",
    volume: "2,400 Kg",
    lokasi: "Bitung, Sulut",
    status: "Masuk",
  },
  {
    initial: "K",
    nama: "Koperasi Bahari",
    komoditas: "Cakalang Segar",
    volume: "850 Kg",
    lokasi: "Likupang, Sulut",
    status: "Diproses",
  },
  {
    initial: "S",
    nama: "Siti Rahma",
    komoditas: "Jagung Kering",
    volume: "5,000 Kg",
    lokasi: "Gorontalo",
    status: "Prioritas",
  },
];

export function LatestOffersTable() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <h3 className="text-xl font-semibold text-ink">
          Penawaran Produsen Terbaru
        </h3>
        <button
          type="button"
          className="text-xs font-semibold tracking-[0.6px] text-info"
        >
          Ekspor Laporan (CSV)
        </button>
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
              Lokasi
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {OFFERS.map((offer, index) => (
            <tr
              key={offer.nama}
              className={index % 2 === 1 ? "bg-canvas/50" : undefined}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-chip text-base font-bold text-info">
                    {offer.initial}
                  </div>
                  <span className="text-base font-medium text-ink">
                    {offer.nama}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-ink">
                {offer.komoditas}
              </td>
              <td className="px-6 py-4 text-sm text-ink">{offer.volume}</td>
              <td className="px-6 py-4 text-sm text-ink">{offer.lokasi}</td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-xs px-2 py-1 text-[11px] font-bold uppercase ${STATUS_STYLES[offer.status]}`}
                >
                  {offer.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  aria-label="Unduh"
                  className="text-body"
                >
                  <Download className="size-4" strokeWidth={2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
