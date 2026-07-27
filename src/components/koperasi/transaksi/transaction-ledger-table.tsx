"use client";

import { Download } from "lucide-react";

export type TransaksiSelesai = {
  matching_id: string;
  tanggal: string;
  produsen: string;
  komoditas: string;
  volume_kg: number;
  total_harga: number;
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function exportCsv(items: TransaksiSelesai[]) {
  const header = ["Tanggal", "ID Transaksi", "Produsen", "Komoditas", "Volume (Kg)", "Total Harga"];
  const rows = items.map((t) => [
    formatTanggal(t.tanggal),
    t.matching_id,
    t.produsen,
    t.komoditas,
    t.volume_kg,
    t.total_harga,
  ]);
  const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transaksi-koperasi-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function TransactionLedgerTable({ items }: { items: TransaksiSelesai[] }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-ink">
            Daftar Transaksi Terkonfirmasi
          </h3>
          <p className="text-sm text-body">
            Rekam jejak transaksi selesai antara koperasi dan produsen
          </p>
        </div>
        <button
          type="button"
          onClick={() => exportCsv(items)}
          disabled={items.length === 0}
          className="flex items-center gap-2 rounded-xs bg-info px-4 py-2 text-xs font-semibold tracking-[0.6px] text-white disabled:opacity-50"
        >
          <Download className="size-3" strokeWidth={2} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-canvas">
            <tr>
              {["Tanggal", "ID Transaksi", "Nama Produsen", "Komoditas", "Volume", "Total Harga"].map(
                (label) => (
                  <th
                    key={label}
                    className="whitespace-nowrap px-6 py-4 text-xs font-semibold tracking-[0.6px] text-body"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-body">
                  Belum ada transaksi yang selesai.
                </td>
              </tr>
            ) : (
              items.map((trx, index) => (
                <tr
                  key={trx.matching_id}
                  className={index % 2 === 1 ? "bg-canvas/30" : undefined}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                    {formatTanggal(trx.tanggal)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink">
                    {trx.matching_id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-chip text-[10px] font-bold text-info">
                        {trx.produsen.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-ink">{trx.produsen}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-xs bg-info/10 px-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.55px] text-info">
                      {trx.komoditas}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-ink">
                    {trx.volume_kg.toLocaleString("id-ID")} Kg
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-ink">
                    {formatRupiah(trx.total_harga)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {items.length > 0 ? (
        <div className="flex items-center justify-between border-t border-border-soft px-6 py-6">
          <span className="text-sm text-body">
            Menampilkan {items.length} dari {items.length} transaksi
          </span>
        </div>
      ) : null}
    </div>
  );
}
