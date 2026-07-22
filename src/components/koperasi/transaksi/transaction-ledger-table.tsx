import Link from "next/link";
import { Download, FileText, SlidersHorizontal } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  Selesai: "bg-info-deep text-white",
  Terkonfirmasi: "bg-info-deep text-white",
};

const TRANSACTIONS = [
  {
    tanggal: "12 Okt 2023",
    idTransaksi: "TRX-99210",
    initial: "BS",
    initialBg: "bg-success/40",
    nama: "Bambang S.",
    komoditas: "Kopi Arabika",
    volume: "450 kg",
    totalHarga: "Rp 31.500.000",
    status: "Selesai",
  },
  {
    tanggal: "12 Okt 2023",
    idTransaksi: "TRX-99208",
    initial: "MR",
    initialBg: "bg-info-soft/60",
    nama: "Maria R.",
    komoditas: "Udang Vaname",
    volume: "1.2 Ton",
    totalHarga: "Rp 108.000.000",
    status: "Terkonfirmasi",
  },
  {
    tanggal: "11 Okt 2023",
    idTransaksi: "TRX-99195",
    initial: "HY",
    initialBg: "bg-warning/20",
    nama: "Haji Yusuf",
    komoditas: "Gabah Kering",
    volume: "5.5 Ton",
    totalHarga: "Rp 35.750.000",
    status: "Selesai",
  },
  {
    tanggal: "11 Okt 2023",
    idTransaksi: "TRX-99182",
    initial: "KS",
    initialBg: "bg-success/40",
    nama: "Kelompok Suka Maju",
    komoditas: "Jagung Pipil",
    volume: "8.2 Ton",
    totalHarga: "Rp 41.000.000",
    status: "Selesai",
  },
];

export function TransactionLedgerTable() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-ink">
            Daftar Transaksi Terkonfirmasi
          </h3>
          <p className="text-sm text-body">
            Memantau aliran komoditas dan verifikasi pembayaran
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xs border border-body px-4 py-2 text-xs font-semibold tracking-[0.6px] text-ink"
          >
            <SlidersHorizontal className="size-3.5" strokeWidth={2} />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xs bg-info px-4 py-2 text-xs font-semibold tracking-[0.6px] text-white"
          >
            <Download className="size-3" strokeWidth={2} />
            Export CSV/PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-canvas">
            <tr>
              {[
                "Tanggal",
                "ID Transaksi",
                "Nama Produsen",
                "Komoditas",
                "Volume",
                "Total Harga",
                "Status",
                "Aksi",
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
            {TRANSACTIONS.map((trx, index) => (
              <tr
                key={trx.idTransaksi}
                className={index % 2 === 1 ? "bg-canvas/30" : undefined}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                  {trx.tanggal}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink">
                  {trx.idTransaksi}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex size-7 items-center justify-center rounded-full text-[10px] font-bold text-ink ${trx.initialBg}`}
                    >
                      {trx.initial}
                    </div>
                    <span className="text-sm text-ink">{trx.nama}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="rounded-xs bg-info/10 px-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.55px] text-info">
                    {trx.komoditas}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                  {trx.volume}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-ink">
                  {trx.totalHarga}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-bold ${STATUS_STYLES[trx.status]}`}
                  >
                    {trx.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Link
                    href="/koperasi/e-surat-jalan"
                    className="flex w-fit items-center gap-1.5 rounded-xs border border-border-soft px-3 py-1.5 text-[11px] font-medium text-ink"
                  >
                    <FileText className="size-3" strokeWidth={2} />
                    E-Surat Jalan
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border-soft px-6 py-6">
        <span className="text-sm text-body">
          Menampilkan 1-10 dari 2,420 transaksi
        </span>
        <div className="flex items-center gap-2">
          {["1", "2", "3", "...", "242"].map((page) => (
            <button
              key={page}
              type="button"
              className={`flex size-8 items-center justify-center rounded-xs text-xs font-semibold tracking-[0.6px] ${
                page === "1" ? "bg-info-deep text-white" : "text-ink"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
