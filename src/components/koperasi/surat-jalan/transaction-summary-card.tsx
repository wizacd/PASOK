import { FileText } from "lucide-react";

const SUMMARY_FIELDS = [
  { label: "ID Transaksi", value: "TRX-99210" },
  { label: "Nama Produser", value: "Bambang S." },
  { label: "Komoditas", value: "Kopi Arabika" },
  { label: "Volume", value: "450 kg" },
];

export function TransactionSummaryCard() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
      <div className="flex items-center gap-2">
        <FileText className="size-5 text-ink" strokeWidth={2} />
        <h3 className="text-xl font-semibold text-ink">Ringkasan Transaksi</h3>
      </div>
      <div className="flex gap-6 rounded-xs bg-canvas p-4">
        {SUMMARY_FIELDS.map((field) => (
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
