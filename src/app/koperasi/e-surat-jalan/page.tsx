"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, MapPin, Printer, Truck, UserCheck } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import {
  TransactionSummaryCard,
  type TransaksiDiterima,
} from "@/components/koperasi/surat-jalan/transaction-summary-card";
import { WaybillPreview } from "@/components/koperasi/surat-jalan/waybill-preview";
import { supabase } from "@/lib/supabase";

const GRADE_OPTIONS = ["Grade A", "Grade B", "Grade C"];

export default function ESuratJalanPage() {
  const [koperasiRef, setKoperasiRef] = useState<string | null>(null);
  const [namaKoperasi, setNamaKoperasi] = useState("Koperasi");
  const [alamatKoperasi, setAlamatKoperasi] = useState("");

  const [daftarTransaksi, setDaftarTransaksi] = useState<TransaksiDiterima[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState("");
  const [tanggalMuat, setTanggalMuat] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [asal, setAsal] = useState("");
  const [driver, setDriver] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [grade, setGrade] = useState("Grade B");
  const [beratFinal, setBeratFinal] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [diterbitkan, setDiterbitkan] = useState<{ nomorDokumen: string } | null>(
    null,
  );

  const [selectedSnapshot, setSelectedSnapshot] = useState<TransaksiDiterima | null>(
    null,
  );
  const selected =
    selectedSnapshot?.matching_id === selectedId ? selectedSnapshot : null;

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("koperasi_ref")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile?.koperasi_ref) {
        setError("Tidak menemukan data koperasi untuk akun ini.");
        setLoading(false);
        return;
      }

      setKoperasiRef(profile.koperasi_ref);

      const { data: koperasiRow } = await supabase
        .from("profil_koperasi")
        .select("nama_koperasi, alamat_lengkap")
        .eq("koperasi_ref", profile.koperasi_ref)
        .single();
      if (koperasiRow?.nama_koperasi) setNamaKoperasi(koperasiRow.nama_koperasi);
      if (koperasiRow?.alamat_lengkap) setAlamatKoperasi(koperasiRow.alamat_lengkap);

      try {
        const response = await fetch(
          `/api/koperasi/transaksi-diterima?koperasi_ref=${profile.koperasi_ref}`,
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Gagal memuat data");
        setDaftarTransaksi(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  function handleSelect(matchingId: string) {
    setSelectedId(matchingId);
    setDiterbitkan(null);
    const t = daftarTransaksi.find((item) => item.matching_id === matchingId) ?? null;
    setSelectedSnapshot(t);
    setAsal(t?.alamat_produsen ?? "");
    setBeratFinal(t ? String(t.volume_kg) : "");
  }

  async function handleTerbitkan() {
    if (!selected) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/koperasi/surat-jalan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matching_id: selected.matching_id,
          driver,
          kendaraan,
          grade,
          berat_final: beratFinal,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Gagal menerbitkan surat jalan");
      setDiterbitkan({ nomorDokumen: data.nomor_dokumen });
      setDaftarTransaksi((prev) => prev.filter((t) => t.matching_id !== selected.matching_id));
      setTimeout(() => window.print(), 300);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  }

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
                  Terbitkan dokumen pengiriman untuk transaksi yang sudah diterima.
                </p>
              </div>
              {diterbitkan ? (
                <span className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold tracking-[0.6px] text-success">
                  <CheckCircle2 className="size-3" strokeWidth={2.5} />
                  Diterbitkan
                </span>
              ) : (
                <span className="flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold tracking-[0.6px] text-warning">
                  <Clock className="size-3" strokeWidth={2.5} />
                  Menunggu Pemilihan Transaksi
                </span>
              )}
            </div>

            {error ? (
              <p className="rounded-xs border border-danger/20 bg-danger/5 px-6 py-4 text-sm text-danger">
                {error}
              </p>
            ) : loading ? (
              <p className="text-sm text-body">Memuat transaksi...</p>
            ) : daftarTransaksi.length === 0 && !diterbitkan ? (
              <p className="rounded-xs border border-border-soft bg-white px-6 py-10 text-center text-sm text-body">
                Tidak ada transaksi berstatus &quot;diterima&quot; yang menunggu surat jalan.
                Terima penawaran dulu di Supply Matching.
              </p>
            ) : (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 flex flex-col gap-8">
                  <div className="flex flex-col gap-2 rounded-xs border border-border-soft bg-white p-6">
                    <label htmlFor="transaksi" className="text-base text-ink">
                      Pilih Transaksi Diterima
                    </label>
                    <select
                      id="transaksi"
                      value={selectedId}
                      onChange={(event) => handleSelect(event.target.value)}
                      disabled={!!diterbitkan}
                      className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                    >
                      <option value="">Pilih transaksi...</option>
                      {daftarTransaksi.map((t) => (
                        <option key={t.matching_id} value={t.matching_id}>
                          {t.komoditas} — {t.produsen} ({t.volume_kg} kg)
                        </option>
                      ))}
                    </select>
                  </div>

                  {selected ? (
                    <>
                      <TransactionSummaryCard transaksi={selected} />

                      <div className="flex w-full flex-col gap-6 rounded-xs border border-border-soft bg-white p-6">
                        <div className="flex items-center gap-2">
                          <Truck className="size-5 text-ink" strokeWidth={2} />
                          <h3 className="text-xl font-semibold text-ink">
                            Detail Logistik
                          </h3>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="tanggal-muat" className="text-base text-ink">
                            Tanggal &amp; Waktu Pemuatan
                          </label>
                          <input
                            id="tanggal-muat"
                            type="datetime-local"
                            value={tanggalMuat}
                            onChange={(event) => setTanggalMuat(event.target.value)}
                            className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="asal" className="text-base text-ink">
                              Asal (Lokasi Produsen)
                            </label>
                            <div className="relative">
                              <textarea
                                id="asal"
                                value={asal}
                                onChange={(event) => setAsal(event.target.value)}
                                rows={2}
                                placeholder="Alamat produsen belum tercatat"
                                className="w-full resize-none rounded-xs border border-border-soft bg-canvas px-4 py-3 pr-10 text-base text-ink focus:border-info focus:outline-none"
                              />
                              <MapPin
                                className="pointer-events-none absolute right-3 top-3 size-4 text-body"
                                strokeWidth={2}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-base text-ink">
                              Tujuan (Gudang Koperasi)
                            </span>
                            <div className="relative">
                              <div className="flex w-full items-start gap-2 rounded-xs border border-border-soft bg-canvas px-4 py-3">
                                <MapPin
                                  className="mt-0.5 size-4 shrink-0 text-body"
                                  strokeWidth={2}
                                />
                                <span className="text-base text-ink">
                                  {alamatKoperasi || namaKoperasi}
                                </span>
                              </div>
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
                        <p className="-mt-2 text-sm text-body">
                          Belum ada basis data driver/kendaraan tersimpan — isi manual.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="driver" className="text-base text-ink">
                              Nama Driver
                            </label>
                            <input
                              id="driver"
                              type="text"
                              value={driver}
                              onChange={(event) => setDriver(event.target.value)}
                              placeholder="Cth: Andi Wijaya"
                              className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="kendaraan" className="text-base text-ink">
                              Kendaraan
                            </label>
                            <input
                              id="kendaraan"
                              type="text"
                              value={kendaraan}
                              onChange={(event) => setKendaraan(event.target.value)}
                              placeholder="Cth: B 9012 XYZ (Truk Engkel)"
                              className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink focus:border-info focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-6 rounded-xs border border-border-soft bg-white p-6">
                        <h3 className="text-xl font-semibold text-ink">
                          Verifikasi Kargo
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <span className="text-base text-ink">Grade Kualitas</span>
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
                                onChange={(event) => setBeratFinal(event.target.value)}
                                className="h-12 w-full rounded-xs border border-border-soft px-4 pr-12 text-base text-ink focus:border-info focus:outline-none"
                              />
                              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-muted">
                                KG
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                {selected ? (
                  <div className="col-span-4 flex flex-col gap-4">
                    <WaybillPreview
                      data={{
                        idTransaksi: selected.matching_id.slice(0, 8).toUpperCase(),
                        namaProduser: selected.produsen,
                        tanggalMuat,
                        asal,
                        tujuan: alamatKoperasi || namaKoperasi,
                        driver,
                        kendaraan,
                        beratFinal,
                        namaLogistikHub: namaKoperasi,
                        nomorDokumen: diterbitkan?.nomorDokumen ?? "Belum diterbitkan",
                      }}
                    />

                    {submitError ? (
                      <p className="rounded-xs border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
                        {submitError}
                      </p>
                    ) : null}

                    <div className="flex flex-col gap-3 print:hidden">
                      <button
                        type="button"
                        onClick={handleTerbitkan}
                        disabled={submitting || !!diterbitkan || !beratFinal}
                        className="flex items-center justify-center gap-2 rounded-xs bg-info px-4 py-3 text-base text-white disabled:opacity-50"
                      >
                        <Printer className="size-5" strokeWidth={2} />
                        {diterbitkan
                          ? "Sudah Diterbitkan"
                          : submitting
                            ? "Menerbitkan..."
                            : "Terbitkan & Cetak Surat Jalan"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
