import { Download, SlidersHorizontal } from "lucide-react";

type OfferStatus = "tersedia" | "matched" | "terjual";

export type DashboardOffer = {
  id: string;
  namaKomoditas: string;
  estimasiVolume: number | null;
  hargaDitawarkan: number | null;
  status: OfferStatus;
};

const STATUS_LABEL: Record<OfferStatus, string> = {
  tersedia: "Menunggu",
  matched: "Dicocokkan",
  terjual: "Terjual",
};

const STATUS_STYLES: Record<OfferStatus, string> = {
  tersedia: "bg-warning/10 text-warning",
  matched: "bg-info/10 text-info",
  terjual: "bg-success/10 text-success",
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ActiveOffersTable({ offers }: { offers: DashboardOffer[] }) {
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
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-body">
                  Belum ada penawaran. Buat penawaran pertama Anda.
                </td>
              </tr>
            ) : (
              offers.map((offer) => {
                const total =
                  offer.hargaDitawarkan != null && offer.estimasiVolume != null
                    ? offer.hargaDitawarkan * offer.estimasiVolume
                    : null;
                return (
                  <tr
                    key={offer.id}
                    className="border-b border-border-soft/30 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-base text-forest">
                      #{offer.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-base font-medium text-ink">
                      {offer.namaKomoditas}
                    </td>
                    <td className="px-6 py-4 text-right text-base text-ink">
                      {offer.estimasiVolume != null ? `${offer.estimasiVolume} kg` : "-"}
                    </td>
                    <td className="px-6 py-4 text-right text-base font-bold text-ink">
                      {total != null ? formatRupiah(total) : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[-0.5px] ${STATUS_STYLES[offer.status]}`}
                      >
                        {STATUS_LABEL[offer.status]}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
