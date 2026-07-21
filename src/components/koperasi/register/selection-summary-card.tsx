import { Info, PackageSearch } from "lucide-react";

export function SelectionSummaryCard({ selected }: { selected: string[] }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-sm border border-border-soft bg-white">
      <div className="flex flex-col gap-1 bg-info p-4">
        <h3 className="text-xl font-semibold text-white">
          Ringkasan Seleksi
        </h3>
        <p className="text-base text-white/80">
          Produk yang akan diinisialisasi
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {selected.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center opacity-60">
            <PackageSearch className="size-8 text-body" strokeWidth={1.5} />
            <p className="text-base text-body">
              Belum ada komoditas
              <br />
              yang dipilih
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {selected.map((label) => (
              <li
                key={label}
                className="rounded-xs bg-chip px-3 py-2 text-sm text-ink"
              >
                {label}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-4 border-t border-border-soft pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base text-body">Total Terpilih</span>
            <span className="text-xl font-semibold text-info">
              {selected.length}
            </span>
          </div>

          <div className="flex gap-3 rounded-sm bg-info-soft p-4">
            <Info className="size-5 shrink-0 text-info-deep" strokeWidth={2} />
            <p className="text-base text-info-deep">
              Konfigurasi standar akan diterapkan untuk produk tanpa
              pengaturan manual.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border-soft bg-canvas p-4">
        <div className="h-32 w-full rounded-xs border border-border-soft bg-chip" />
      </div>
    </div>
  );
}
