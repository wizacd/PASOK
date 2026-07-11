import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  FileText,
  Fish,
  Lock,
  Truck,
  Wheat,
  type LucideIcon,
} from "lucide-react";

type Status = "Selesai" | "Dalam Pengiriman" | "Verifikasi";

type Action =
  | { type: "e-surat" }
  | { type: "lacak" }
  | { type: "unavailable" };

type Transaction = {
  id: string;
  date: string;
  commodity: string;
  commodityIcon: LucideIcon;
  commodityIconClassName: string;
  volume: string;
  unitPrice: string;
  totalValue: string;
  status: Status;
  action: Action;
};

const STATUS_STYLES: Record<Status, string> = {
  Selesai: "bg-success/10 text-success",
  "Dalam Pengiriman": "bg-info/10 text-info",
  Verifikasi: "bg-role-koperasi-soft/30 text-[#825100]",
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "TX-2024-1012-001",
    date: "12 Okt 2024",
    commodity: "Jagung Pipil Kering",
    commodityIcon: Wheat,
    commodityIconClassName: "bg-warning/10 text-warning",
    volume: "500 kg",
    unitPrice: "Rp 5.450",
    totalValue: "Rp 2.725.000",
    status: "Selesai",
    action: { type: "e-surat" },
  },
  {
    id: "TX-2024-1010-042",
    date: "10 Okt 2024",
    commodity: "Ikan Tongkol Segar",
    commodityIcon: Fish,
    commodityIconClassName: "bg-info/10 text-info",
    volume: "120 kg",
    unitPrice: "Rp 18.000",
    totalValue: "Rp 2.160.000",
    status: "Dalam Pengiriman",
    action: { type: "lacak" },
  },
  {
    id: "TX-2024-1008-019",
    date: "08 Okt 2024",
    commodity: "Jagung Pipil Kering",
    commodityIcon: Wheat,
    commodityIconClassName: "bg-warning/10 text-warning",
    volume: "1.200 kg",
    unitPrice: "Rp 5.400",
    totalValue: "Rp 6.480.000",
    status: "Verifikasi",
    action: { type: "unavailable" },
  },
  {
    id: "TX-2024-1005-088",
    date: "05 Okt 2024",
    commodity: "Padi Giling Medium",
    commodityIcon: Wheat,
    commodityIconClassName: "bg-warning/10 text-warning",
    volume: "2.500 kg",
    unitPrice: "Rp 12.200",
    totalValue: "Rp 30.500.000",
    status: "Selesai",
    action: { type: "e-surat" },
  },
];

const PAGES = [1, 2, 3, "...", 9];

function ActionCell({ action }: { action: Action }) {
  if (action.type === "e-surat") {
    return (
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-semibold text-forest"
      >
        <FileText className="size-3.5" strokeWidth={2} />
        E-Surat Jalan
      </button>
    );
  }
  if (action.type === "lacak") {
    return (
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-semibold text-forest"
      >
        <Truck className="size-3.5" strokeWidth={2} />
        Lacak
      </button>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-sm font-semibold text-body/50">
      <Lock className="size-3.5" strokeWidth={2} />
      Belum Tersedia
    </span>
  );
}

export function TransactionsTable() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white">
      <div className="flex items-center border-b border-border-soft px-6">
        <button
          type="button"
          className="border-b-2 border-forest px-6 py-4 text-base text-forest"
        >
          Riwayat Transaksi
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-4 text-base text-body"
        >
          Notifikasi
          <span className="flex size-5 items-center justify-center rounded-full bg-danger text-[10px] text-white">
            3
          </span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-canvas p-6">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xs border border-border-soft bg-white px-3 py-2 text-sm text-ink"
        >
          <Calendar className="size-[15px] text-body" strokeWidth={2} />
          01 Okt - 31 Okt 2024
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xs border border-border-soft bg-white px-3 py-2 text-sm text-ink"
        >
          Komoditas: Semua
          <ChevronDown className="size-[9px] text-body" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xs border border-border-soft bg-white px-3 py-2 text-sm text-ink"
        >
          <Filter className="size-3 text-body" strokeWidth={2} />
          Status: Semua
          <ChevronDown className="size-[9px] text-body" strokeWidth={2.5} />
        </button>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-[11px] font-medium text-muted">
            Menampilkan 1-10 dari 84 transaksi
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled
              className="flex size-8 items-center justify-center rounded-xs border border-border-soft opacity-50"
            >
              <ChevronLeft className="size-[9px]" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-xs border border-border-soft bg-white"
            >
              <ChevronRight className="size-[9px]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-soft text-[11px] font-bold uppercase tracking-[1.1px] text-body">
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">ID Transaksi</th>
              <th className="px-6 py-4">Komoditas</th>
              <th className="px-6 py-4">Volume</th>
              <th className="px-6 py-4 text-right">Harga Satuan</th>
              <th className="px-6 py-4 text-right">Total Nilai</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx) => {
              const CommodityIcon = tx.commodityIcon;
              return (
                <tr
                  key={tx.id}
                  className="border-b border-border-soft/30 last:border-b-0 odd:bg-canvas/30"
                >
                  <td className="px-6 py-4 text-sm font-medium text-ink">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-muted">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-xs ${tx.commodityIconClassName}`}
                      >
                        <CommodityIcon className="size-3.5" strokeWidth={2} />
                      </span>
                      <span className="text-sm text-ink">{tx.commodity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-ink">
                    {tx.volume}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-ink">
                    {tx.unitPrice}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-ink">
                    {tx.totalValue}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[tx.status]}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <ActionCell action={tx.action} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border-soft px-6 py-6">
        <span className="text-sm text-muted">
          Menampilkan {TRANSACTIONS.length} dari 84 transaksi
        </span>
        <div className="flex gap-2">
          {PAGES.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="flex items-center px-2 text-base text-muted"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                className={`rounded-xs border px-4 py-2 text-sm ${
                  page === 1
                    ? "border-border-soft bg-white text-ink"
                    : "border-border-soft text-ink"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
