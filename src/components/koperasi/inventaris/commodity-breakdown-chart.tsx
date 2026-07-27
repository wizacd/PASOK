const SEGMENT_COLORS = [
  "#0369a1",
  "#059669",
  "#e5a80d",
  "#008aa9",
  "#ba1a1a",
  "#7bc2ff",
  "#006948",
];

export type KomoditasBreakdown = {
  nama: string;
  volume_kg: number;
  persen: number;
};

function formatVolume(kg: number) {
  if (kg >= 1000) return `${(kg / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} T`;
  return `${kg.toLocaleString("id-ID")} Kg`;
}

export function CommodityBreakdownChart({
  data,
  totalVolumeKg,
}: {
  data: KomoditasBreakdown[];
  totalVolumeKg: number;
}) {
  let cursor = 0;
  const stops = data.map((item, index) => {
    const start = cursor;
    const end = cursor + item.persen;
    cursor = end;
    return `${SEGMENT_COLORS[index % SEGMENT_COLORS.length]} ${start}% ${end}%`;
  });
  const gradient =
    stops.length > 0
      ? `conic-gradient(${stops.join(", ")})`
      : "var(--color-border-soft)";

  return (
    <div className="flex w-full flex-col rounded-xs border border-border-soft bg-white">
      <div className="border-b border-border-soft px-6 py-6">
        <h3 className="text-xl font-semibold text-ink">Sebaran Komoditas</h3>
        <p className="text-sm text-body">
          Distribusi stok yang sudah diterima berdasarkan komoditas
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 p-8">
        {data.length === 0 ? (
          <p className="py-8 text-sm text-body">Belum ada stok yang diterima.</p>
        ) : (
          <>
            <div
              className="relative flex size-48 items-center justify-center rounded-full"
              style={{ background: gradient }}
            >
              <div className="flex size-32 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                  Total
                </span>
                <span className="text-xl font-bold text-ink">
                  {formatVolume(totalVolumeKg)}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              {data.map((item, index) => (
                <div
                  key={item.nama}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                      }}
                    />
                    <span className="text-ink">{item.nama}</span>
                  </div>
                  <span className="font-medium text-body">
                    {formatVolume(item.volume_kg)} ({item.persen}%)
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
