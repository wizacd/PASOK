const FACILITIES = [
  {
    name: "Pelabuhan Tanjung Perak",
    type: "Pelabuhan Utama",
    capacity: "450 TEUs/hari",
    access: "Tinggi",
  },
  {
    name: "Gudang Dingin Sidoarjo",
    type: "Cold Storage",
    capacity: "120 Ton",
    access: "Sedang",
  },
  {
    name: "Pangkalan Truk Gresik",
    type: "Pusat Distribusi",
    capacity: "85 Armada",
    access: "Tinggi",
  },
];

export function LogisticsHubTable() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-sm border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <h3 className="text-xl font-semibold text-ink">
          Hub Logistik &amp; Pelabuhan di Wilayah
        </h3>
        <span className="text-xs font-semibold tracking-[0.6px] text-info">
          4 Fasilitas Terdeteksi
        </span>
      </div>

      <table className="w-full text-left">
        <thead className="bg-canvas">
          <tr>
            <th className="px-6 py-3 text-xs font-bold tracking-[0.6px] text-body">
              Nama Fasilitas
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-[0.6px] text-body">
              Tipe
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-[0.6px] text-body">
              Kapasitas Sisa
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-[0.6px] text-body">
              Aksesibilitas
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          {FACILITIES.map((facility, index) => (
            <tr
              key={facility.name}
              className={index % 2 === 1 ? "bg-canvas" : undefined}
            >
              <td className="px-6 py-4 text-sm font-semibold text-ink">
                {facility.name}
              </td>
              <td className="px-6 py-4 text-sm text-ink">{facility.type}</td>
              <td className="px-6 py-4 text-sm text-ink">
                {facility.capacity}
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-1.5 text-sm text-body">
                  <span
                    className={`size-2 rounded-full ${
                      facility.access === "Tinggi" ? "bg-brand" : "bg-warning"
                    }`}
                  />
                  {facility.access}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button type="button" className="text-sm font-bold text-info">
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
