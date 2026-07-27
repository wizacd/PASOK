import { FileText } from "lucide-react";

export type TransaksiDiterima = {
  matching_id: string;
  produsen: string;
  alamat_produsen: string | null;
  komoditas: string;
  volume_kg: number;
  harga_per_kg: number;
};

export function TransactionSummaryCard({
  transaksi,
}: {
  transaksi: TransaksiDiterima;
}) {
  const fields = [
    { label: "ID Transaksi", value: transaksi.matching_id.slice(0, 8).toUpperCase() },
    { label: "Nama Produsen", value: transaksi.produsen },
    { label: "Komoditas", value: transaksi.komoditas },
    { label: "Volume", value: `${transaksi.volume_kg.toLocaleString("id-ID")} kg` },
  ];

  return (
    <div className="flex w-full flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
      <div className="flex items-center gap-2">
        <FileText className="size-5 text-ink" strokeWidth={2} />
        <h3 className="text-xl font-semibold text-ink">Ringkasan Transaksi</h3>
      </div>
      <div className="flex gap-6 rounded-xs bg-canvas p-4">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-muted">
              {field.label}
            </span>
            <span className="text-base text-ink">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
