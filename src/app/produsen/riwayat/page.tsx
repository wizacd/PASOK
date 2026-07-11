import { Download, Plus } from "lucide-react";
import { HubStatusCard } from "@/components/produsen/riwayat/hub-status-card";
import { TotalAccumulationCard } from "@/components/produsen/riwayat/total-accumulation-card";
import { TransactionsTable } from "@/components/produsen/riwayat/transactions-table";

export default function RiwayatTransaksiPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-base text-ink">Riwayat Transaksi</h1>
          <p className="text-base text-body">
            Kelola dan pantau semua aliran dana serta pengiriman komoditas
            Anda.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xs border border-border-soft bg-white px-4 py-2.5 text-base text-ink"
          >
            <Download className="size-3.5" strokeWidth={2} />
            Export PDF
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xs bg-forest px-4 py-2.5 text-base text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
          >
            <Plus className="size-3" strokeWidth={2.5} />
            Input Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <TotalAccumulationCard />
        <HubStatusCard />
      </div>

      <TransactionsTable />
    </div>
  );
}
