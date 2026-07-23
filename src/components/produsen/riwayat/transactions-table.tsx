import { Sprout } from "lucide-react";

type Status = "tersedia" | "matched" | "terjual";

export type TransactionRow = {
  id: string;
  date: string;
  namaKomoditas: string;
  estimasiVolume: number | null;
  hargaSatuan: number | null;
  status: Status;
};

const STATUS_LABEL: Record<Status, string> = {
  tersedia: "Menunggu",
  matched: "Dicocokkan",
  terjual: "Selesai",
};

const STATUS_STYLES: Record<Status, string> = {
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

export function TransactionsTable({
  transactions,
  totalCount,
}: {
  transactions: TransactionRow[];
  totalCount: number;
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-4">
        <span className="text-base text-forest">Riwayat Transaksi</span>
        <span className="text-[11px] font-medium text-muted">
          Menampilkan {transactions.length} dari {totalCount} transaksi
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-soft text-[11px] font-bold uppercase tracking-[1.1px] text-body">
              <th className="px-6 py-4">ID Transaksi</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Komoditas</th>
              <th className="px-6 py-4">Kuantitas</th>
              <th className="px-6 py-4 text-right">Total Harga</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-body">
                  Belum ada transaksi.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => {
                const total =
                  tx.hargaSatuan != null && tx.estimasiVolume != null
                    ? tx.hargaSatuan * tx.estimasiVolume
                    : null;
                return (
                  <tr
                    key={tx.id}
                    className="border-b border-border-soft/30 last:border-b-0 odd:bg-canvas/30"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-muted">
                      #{tx.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-ink">{tx.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-xs bg-forest/10">
                          <Sprout className="size-3.5 text-forest" strokeWidth={2} />
                        </span>
                        <span className="text-sm text-ink">{tx.namaKomoditas}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-ink">
                      {tx.estimasiVolume != null ? `${tx.estimasiVolume} kg` : "-"}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-ink">
                      {total != null ? formatRupiah(total) : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[tx.status]}`}
                        >
                          {STATUS_LABEL[tx.status]}
                        </span>
                      </div>
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
