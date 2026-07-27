export type InventoryItem = {
  matching_id: string;
  penawaran_id: string;
  komoditas: string;
  produsen: string;
  volume_kg: number;
  harga_per_kg: number;
  tanggal_panen: string;
  diterima_pada: string;
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function InventoryDetailTable({ items }: { items: InventoryItem[] }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-ink">Detail Stok Diterima</h3>
          <p className="text-sm text-body">
            Stok yang sudah diterima dari produsen dan dikelola koperasi
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-canvas">
            <tr>
              {[
                "Komoditas",
                "Produsen",
                "Volume",
                "Harga Disepakati",
                "Estimasi Panen",
                "Diterima Pada",
              ].map((label) => (
                <th
                  key={label}
                  className="whitespace-nowrap px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-body">
                  Belum ada stok yang diterima dari produsen.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={item.matching_id}
                  className={index % 2 === 1 ? "bg-canvas/30" : undefined}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-xs bg-info/10 px-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.55px] text-info">
                      {item.komoditas}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                    {item.produsen}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                    {item.volume_kg.toLocaleString("id-ID")} Kg
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-ink">
                    {formatRupiah(item.harga_per_kg)}/Kg
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                    {formatTanggal(item.tanggal_panen)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-body">
                    {formatTanggal(item.diterima_pada)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
