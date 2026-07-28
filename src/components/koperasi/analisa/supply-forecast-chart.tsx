export type PrediksiKomoditas = {
  total_volume_akan_panen_kg: number;
  jumlah_penawaran: number;
  confidence: "rendah" | "sedang" | "tinggi";
  per_bulan: { bulan: string; volume_kg: number }[];
  metode: string;
};

const CONFIDENCE_LABEL: Record<PrediksiKomoditas["confidence"], string> = {
  rendah: "Keyakinan Rendah",
  sedang: "Keyakinan Sedang",
  tinggi: "Keyakinan Tinggi",
};

const CONFIDENCE_STYLE: Record<PrediksiKomoditas["confidence"], string> = {
  rendah: "bg-danger/10 text-danger",
  sedang: "bg-warning/10 text-warning",
  tinggi: "bg-success/10 text-success",
};

function formatBulan(bulan: string) {
  const [year, month] = bulan.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("id-ID", {
    month: "short",
    year: "2-digit",
  });
}

export function SupplyForecastChart({ prediksi }: { prediksi: PrediksiKomoditas }) {
  const peak = Math.max(...prediksi.per_bulan.map((p) => p.volume_kg), 1);

  return (
    <div className="flex w-full flex-col rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-ink">
            Prediksi Volume Panen per Bulan
          </h3>
          <p className="text-sm text-body">{prediksi.metode}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.6px] ${CONFIDENCE_STYLE[prediksi.confidence]}`}
        >
          {CONFIDENCE_LABEL[prediksi.confidence]}
        </span>
      </div>

      <div className="flex gap-8 border-b border-border-soft px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
            Total Estimasi Panen
          </span>
          <span className="text-2xl font-bold text-ink">
            {prediksi.total_volume_akan_panen_kg.toLocaleString("id-ID")} Kg
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
            Jumlah Penawaran Aktif
          </span>
          <span className="text-2xl font-bold text-ink">
            {prediksi.jumlah_penawaran}
          </span>
        </div>
      </div>

      <div className="flex min-h-[280px] items-end justify-between gap-4 px-8 py-8">
        {prediksi.per_bulan.length === 0 ? (
          <p className="w-full py-20 text-center text-sm text-body">
            Belum ada penawaran dengan estimasi panen untuk komoditas ini.
          </p>
        ) : (
          prediksi.per_bulan.map((item) => {
            const heightPx = Math.max(4, Math.round((item.volume_kg / peak) * 200));
            return (
              <div
                key={item.bulan}
                className="group flex flex-1 flex-col items-center gap-4"
              >
                <div className="relative flex w-full flex-col items-center">
                  <span className="pointer-events-none absolute -top-8 rounded-xs bg-ink px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {item.volume_kg.toLocaleString("id-ID")} Kg
                  </span>
                  <div
                    className="w-full rounded-t-xs bg-info"
                    style={{ height: `${heightPx}px` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-body">
                  {formatBulan(item.bulan)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
