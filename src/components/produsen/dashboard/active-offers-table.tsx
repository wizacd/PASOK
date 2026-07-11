import { Download, MoreHorizontal, SlidersHorizontal } from "lucide-react";

type OfferStatus = "Dalam Proses" | "Pengecekan Mutu" | "Dijadwalkan";

type Offer = {
  id: string;
  commodity: string;
  quantity: string;
  total: string;
  status: OfferStatus;
};

const STATUS_STYLES: Record<OfferStatus, string> = {
  "Dalam Proses": "bg-success/10 text-success",
  "Pengecekan Mutu": "bg-warning/10 text-warning",
  Dijadwalkan: "bg-info/10 text-info",
};

const OFFERS: Offer[] = [
  {
    id: "#PNR-88421",
    commodity: "Jagung Pipil Kering Grade A",
    quantity: "1.250 kg",
    total: "Rp 6.562.500",
    status: "Dalam Proses",
  },
  {
    id: "#PNR-88390",
    commodity: "Ikan Tongkol Segar (Premium)",
    quantity: "450 kg",
    total: "Rp 11.160.000",
    status: "Pengecekan Mutu",
  },
  {
    id: "#PNR-88315",
    commodity: "Gabah Kering Giling",
    quantity: "3.000 kg",
    total: "Rp 21.000.000",
    status: "Dijadwalkan",
  },
];

export function ActiveOffersTable() {
  return (
    <div className="col-span-12 overflow-hidden rounded-sm border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft bg-canvas/50 px-6 py-5">
        <h3 className="text-xl font-semibold text-ink">
          Daftar Penawaran Aktif
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xs border border-border-soft px-3 py-1.5 text-xs font-bold text-ink"
          >
            <SlidersHorizontal className="size-3" strokeWidth={2} />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xs border border-border-soft px-3 py-1.5 text-xs font-bold text-ink"
          >
            <Download className="size-3" strokeWidth={2} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-canvas">
            <tr className="border-b border-border-soft text-sm font-bold text-ink">
              <th className="px-6 py-4 font-bold">ID Penawaran</th>
              <th className="px-6 py-4 font-bold">Komoditas</th>
              <th className="px-6 py-4 text-right font-bold">Kuantitas</th>
              <th className="px-6 py-4 text-right font-bold">Harga Total</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {OFFERS.map((offer) => (
              <tr
                key={offer.id}
                className="border-b border-border-soft/30 last:border-b-0"
              >
                <td className="px-6 py-4 text-base text-forest">
                  {offer.id}
                </td>
                <td className="px-6 py-4 text-base font-medium text-ink">
                  {offer.commodity}
                </td>
                <td className="px-6 py-4 text-right text-base text-ink">
                  {offer.quantity}
                </td>
                <td className="px-6 py-4 text-right text-base font-bold text-ink">
                  {offer.total}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[-0.5px] ${STATUS_STYLES[offer.status]}`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    aria-label="Aksi lainnya"
                    className="text-body"
                  >
                    <MoreHorizontal className="mx-auto size-4" strokeWidth={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
