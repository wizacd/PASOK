"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Printer, Save, Truck, UserCheck } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import { TransactionSummaryCard } from "@/components/koperasi/surat-jalan/transaction-summary-card";
import { WaybillPreview } from "@/components/koperasi/surat-jalan/waybill-preview";

const DRIVER_OPTIONS = ["Andi Wijaya", "Rudi Hartono", "Made Sutrisna"];
const KENDARAAN_OPTIONS = ["B 9012 XYZ (Truk Engkel)", "B 4521 ABC (Pickup)"];
const GRADE_OPTIONS = ["Grade A", "Grade B", "Grade C"];

export default function ESuratJalanPage() {
  const [tanggalMuat, setTanggalMuat] = useState("2023-11-24T08:00");
  const [asal, setAsal] = useState("Kebun Kopi Arjuno, Malang");
  const [tujuan, setTujuan] = useState("PASOK Central Hub, Surabaya");
  const [driver, setDriver] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [grade, setGrade] = useState("Grade B");
  const [beratFinal, setBeratFinal] = useState("450");

  return (
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <main className="flex flex-1 flex-col gap-8 px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
                  Generate E-Surat Jalan
                </h1>
                <p className="text-base text-body">
                  Konfigurasi dokumen pengiriman untuk pengangkutan komoditas.
                </p>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold tracking-[0.6px] text-warning">
                <Clock className="size-3" strokeWidth={2.5} />
                Menunggu Pengiriman
              </span>
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 flex flex-col gap-8">
                <TransactionSummaryCard />

                <div className="flex w-full flex-col gap-6 rounded-xs border border-border-soft bg-white p-6">
                  <div className="flex items-center gap-2">
                    <Truck className="size-5 text-ink" strokeWidth={2} />
                    <h3 className="text-xl font-semibold text-ink">
                      Detail Logistik
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="tanggal-muat"
                      className="text-base text-ink"
                    >
                      Tanggal &amp; Waktu Pemuatan
                    </label>
                    <div className="relative">
                      <Calendar
                        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-body"
                        strokeWidth={2}
                      />
                      <input
                        id="tanggal-muat"
                        type="datetime-local"
                        value={tanggalMuat}
                        onChange={(event) => setTanggalMuat(event.target.value)}
                        className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="asal" className="text-base text-ink">
                        Asal (Lokasi Produser)
                      </label>
                      <div className="relative">
                        <textarea
                          id="asal"
                          value={asal}
                          onChange={(event) => setAsal(event.target.value)}
                          rows={2}
                          className="w-full resize-none rounded-xs border border-border-soft bg-canvas px-4 py-3 pr-10 text-base text-ink focus:border-info focus:outline-none"
                        />
                        <MapPin
                          className="pointer-events-none absolute right-3 top-3 size-4 text-body"
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="tujuan" className="text-base text-ink">
                        Tujuan (Gudang Koperasi)
                      </label>
                      <div className="relative">
                        <textarea
                          id="tujuan"
                          value={tujuan}
                          onChange={(event) => setTujuan(event.target.value)}
                          rows={2}
                          className="w-full resize-none rounded-xs border border-border-soft bg-canvas px-4 py-3 pr-10 text-base text-ink focus:border-info focus:outline-none"
                        />
                        <MapPin
                          className="pointer-events-none absolute right-3 top-3 size-4 text-body"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-6 rounded-xs border border-border-soft bg-white p-6">
                  <div className="flex items-center gap-2">
                    <UserCheck className="size-5 text-ink" strokeWidth={2} />
                    <h3 className="text-xl font-semibold text-ink">
                      Penugasan Armada
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="driver" className="text-base text-ink">
                        Pilih Driver
                      </label>
                      <select
                        id="driver"
                        value={driver}
                        onChange={(event) => setDriver(event.target.value)}
                        className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                      >
                        <option value="">Pilih Driver Tersedia</option>
                        {DRIVER_OPTIONS.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="kendaraan"
                        className="text-base text-ink"
                      >
                        Pilih Kendaraan
                      </label>
                      <select
                        id="kendaraan"
                        value={kendaraan}
                        onChange={(event) => setKendaraan(event.target.value)}
                        className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                      >
                        <option value="">Pilih Kendaraan</option>
                        {KENDARAAN_OPTIONS.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-6 rounded-xs border border-border-soft bg-white p-6">
                  <div className="flex items-center gap-2">
                    <Save className="size-5 text-ink" strokeWidth={2} />
                    <h3 className="text-xl font-semibold text-ink">
                      Verifikasi Kargo
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-base text-ink">
                        Grade Kualitas
                      </span>
                      <div className="flex gap-2">
                        {GRADE_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setGrade(option)}
                            className={`flex-1 rounded-xs border px-1 py-3 text-center text-base ${
                              grade === option
                                ? "border-info bg-info/10 text-info"
                                : "border-border-soft text-ink"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="berat" className="text-base text-ink">
                        Berat Timbang Akhir (kg)
                      </label>
                      <div className="relative">
                        <input
                          id="berat"
                          type="number"
                          value={beratFinal}
                          onChange={(event) =>
                            setBeratFinal(event.target.value)
                          }
                          className="h-12 w-full rounded-xs border border-border-soft px-4 pr-12 text-base text-ink focus:border-info focus:outline-none"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-muted">
                          KG
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-4 flex flex-col gap-4">
                <WaybillPreview
                  data={{
                    idTransaksi: "TRX-99210",
                    namaProduser: "Bambang S.",
                    tanggalMuat,
                    asal,
                    tujuan,
                    driver,
                    kendaraan,
                    beratFinal,
                    namaLogistikHub: "Budi Santoso",
                    nomorDokumen: "SJ-20231124-99210",
                  }}
                />

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xs bg-info px-4 py-3 text-base text-white"
                  >
                    <Printer className="size-5" strokeWidth={2} />
                    Terbitkan &amp; Cetak Surat Jalan
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xs border border-border-soft px-4 py-3 text-base text-body"
                  >
                    <Save className="size-[18px]" strokeWidth={2} />
                    Simpan Draft
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
