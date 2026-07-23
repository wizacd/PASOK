"use client";

import { useEffect, useState } from "react";
import { Bell, Building2, CreditCard, History, Laptop, ShieldCheck } from "lucide-react";
import { getAccessToken } from "@/lib/auth";
import { ToggleRow } from "@/components/produsen/pengaturan/toggle-row";
import { ChangePasswordForm } from "@/components/produsen/pengaturan/change-password-form";

type Tab = "profil" | "notifikasi" | "keamanan" | "rekening";

const TABS: { id: Tab; label: string; icon: typeof Building2 }[] = [
  { id: "profil", label: "Profil Bisnis", icon: Building2 },
  { id: "notifikasi", label: "Notifikasi", icon: Bell },
  { id: "keamanan", label: "Keamanan", icon: ShieldCheck },
  { id: "rekening", label: "Rekening Bank", icon: CreditCard },
];

const TIPE_BISNIS_OPTIONS = ["Petani", "Nelayan", "Lainnya"];

const BANK_OPTIONS = [
  "Bank Central Asia (BCA)",
  "Bank Rakyat Indonesia (BRI)",
  "Bank Negara Indonesia (BNI)",
  "Bank Mandiri",
  "Bank Syariah Indonesia (BSI)",
  "CIMB Niaga",
  "Lainnya",
];

type PreferensiNotifikasi = {
  harga_komoditas: boolean;
  status_penawaran: boolean;
  informasi_koperasi: boolean;
  laporan_mingguan: boolean;
  keamanan_akun: boolean;
};

type Profil = {
  nama: string;
  pekerjaan: string;
  telepon: string;
  alamat: string;
  email: string;
  preferensi_notifikasi: PreferensiNotifikasi;
  bank_name: string;
  nomor_rekening: string;
};

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profil");
  const [profil, setProfil] = useState<Profil | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) {
        setError("Sesi tidak ditemukan. Silakan masuk kembali.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/produsen/pengaturan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal memuat data pengaturan.");
        setIsLoading(false);
        return;
      }

      setProfil(result);
      setIsLoading(false);
    }

    load();
  }, []);

  async function handleSaveProfil() {
    if (!profil) return;
    setError("");
    setSavedMessage("");
    setIsSaving(true);

    const token = await getAccessToken();
    const response = await fetch("/api/produsen/pengaturan", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama: profil.nama,
        pekerjaan: profil.pekerjaan,
        telepon: profil.telepon,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Gagal menyimpan perubahan.");
      setIsSaving(false);
      return;
    }

    setSavedMessage("Perubahan berhasil disimpan.");
    setIsSaving(false);
  }

  async function handleSaveNotifikasi() {
    if (!profil) return;
    setError("");
    setSavedMessage("");
    setIsSaving(true);

    const token = await getAccessToken();
    const response = await fetch("/api/produsen/pengaturan", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        preferensi_notifikasi: profil.preferensi_notifikasi,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Gagal menyimpan perubahan.");
      setIsSaving(false);
      return;
    }

    setSavedMessage("Preferensi notifikasi berhasil disimpan.");
    setIsSaving(false);
  }

  async function handleSaveRekening() {
    if (!profil) return;
    setError("");
    setSavedMessage("");
    setIsSaving(true);

    const token = await getAccessToken();
    const response = await fetch("/api/produsen/pengaturan", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bank_name: profil.bank_name,
        nomor_rekening: profil.nomor_rekening,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Gagal menyimpan perubahan.");
      setIsSaving(false);
      return;
    }

    setSavedMessage("Data rekening berhasil disimpan.");
    setIsSaving(false);
  }

  function updatePreferensi(key: keyof PreferensiNotifikasi, value: boolean) {
    if (!profil) return;
    setProfil({
      ...profil,
      preferensi_notifikasi: { ...profil.preferensi_notifikasi, [key]: value },
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-base text-ink">Pengaturan</h1>
        <p className="text-base text-body">
          Kelola profil bisnis dan preferensi akun Anda secara terpusat.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <nav className="col-span-1 flex flex-col gap-1 self-start rounded-lg border border-border-soft bg-white p-2 shadow-sm">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSavedMessage("");
                }}
                className={`flex items-center gap-3 rounded-xs px-4 py-3 text-left text-sm font-medium ${
                  isActive
                    ? "border-l-4 border-brand bg-chip text-info-deep"
                    : "border-l-4 border-transparent text-body hover:bg-canvas"
                }`}
              >
                <Icon className="size-5 shrink-0" strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="col-span-3 rounded-lg border border-border-soft bg-white p-8">
          {isLoading ? (
            <p className="text-sm text-body">Memuat data...</p>
          ) : error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : !profil ? null : activeTab === "profil" ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-soft pb-4">
                <h2 className="text-base text-ink">Profil Bisnis</h2>
                <button
                  type="button"
                  onClick={handleSaveProfil}
                  disabled={isSaving}
                  className="rounded-xs bg-brand px-4 py-2 text-sm text-white disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>

              {savedMessage ? (
                <p className="text-sm text-success">{savedMessage}</p>
              ) : null}

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                    Nama Bisnis / Kelompok Tani
                  </label>
                  <input
                    type="text"
                    value={profil.nama}
                    onChange={(event) =>
                      setProfil({ ...profil, nama: event.target.value })
                    }
                    className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                    Tipe Bisnis
                  </label>
                  <select
                    value={profil.pekerjaan}
                    onChange={(event) =>
                      setProfil({ ...profil, pekerjaan: event.target.value })
                    }
                    className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
                  >
                    <option value="">Pilih tipe bisnis</option>
                    {TIPE_BISNIS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                    Alamat Operasional (Tersinkronisasi)
                  </label>
                  <textarea
                    value={profil.alamat}
                    disabled
                    rows={3}
                    className="resize-none rounded-xs border border-border-soft bg-canvas/60 p-3 text-sm text-body"
                  />
                  <p className="text-[11px] text-muted">
                    Diambil dari data lokasi saat pendaftaran, belum bisa diubah di sini.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    value={profil.email}
                    disabled
                    className="rounded-xs border border-border-soft bg-canvas/60 p-3 text-sm text-body"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 0812-3456-7890"
                    value={profil.telepon}
                    onChange={(event) =>
                      setProfil({ ...profil, telepon: event.target.value })
                    }
                    className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : activeTab === "notifikasi" ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-border-soft pb-4">
                <h2 className="text-base text-ink">Pengaturan Notifikasi</h2>
                <button
                  type="button"
                  onClick={handleSaveNotifikasi}
                  disabled={isSaving}
                  className="rounded-xs bg-brand px-4 py-2 text-sm text-white disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>

              {savedMessage ? (
                <p className="text-sm text-success">{savedMessage}</p>
              ) : null}

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.8px] text-body">
                  Notifikasi Aplikasi
                </h3>
                <div className="flex flex-col gap-4">
                  <ToggleRow
                    title="Harga Komoditas"
                    description="Update harga pasar secara real-time."
                    checked={profil.preferensi_notifikasi.harga_komoditas}
                    onChange={(value) => updatePreferensi("harga_komoditas", value)}
                  />
                  <ToggleRow
                    title="Status Penawaran"
                    description="Notifikasi saat penawaran Anda diterima atau dinegosiasi."
                    checked={profil.preferensi_notifikasi.status_penawaran}
                    onChange={(value) => updatePreferensi("status_penawaran", value)}
                  />
                  <ToggleRow
                    title="Informasi Koperasi"
                    description="Pengumuman penting dari pengurus koperasi."
                    checked={profil.preferensi_notifikasi.informasi_koperasi}
                    onChange={(value) => updatePreferensi("informasi_koperasi", value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.8px] text-body">
                  Notifikasi Email
                </h3>
                <div className="flex flex-col gap-4">
                  <ToggleRow
                    title="Laporan Mingguan"
                    description="Ringkasan transaksi dan performa bisnis mingguan."
                    checked={profil.preferensi_notifikasi.laporan_mingguan}
                    onChange={(value) => updatePreferensi("laporan_mingguan", value)}
                  />
                  <ToggleRow
                    title="Keamanan Akun"
                    description="Peringatan login baru atau perubahan kata sandi."
                    checked={profil.preferensi_notifikasi.keamanan_akun}
                    onChange={(value) => updatePreferensi("keamanan_akun", value)}
                  />
                </div>
              </div>
            </div>
          ) : activeTab === "keamanan" ? (
            <div className="flex flex-col gap-8">
              <div className="border-b border-border-soft pb-4">
                <h2 className="text-base text-ink">Keamanan Akun</h2>
              </div>

              <ChangePasswordForm email={profil.email} />

              <div className="flex items-center justify-between border-t border-border-soft pt-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-base text-ink">
                    Verifikasi Dua Faktor (2FA)
                  </span>
                  <span className="text-sm text-muted">
                    Tambahkan lapisan keamanan ekstra pada akun Anda dengan kode
                    verifikasi. Segera hadir.
                  </span>
                </div>
                <button
                  type="button"
                  disabled
                  aria-disabled
                  className="relative h-6 w-11 shrink-0 cursor-not-allowed rounded-full bg-border-soft opacity-60"
                >
                  <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white" />
                </button>
              </div>

              <div className="flex flex-col gap-4 border-t border-border-soft pt-6">
                <h3 className="flex items-center gap-2 text-base text-ink">
                  <History className="size-[18px]" strokeWidth={2} />
                  Riwayat Login
                </h3>
                <div className="flex flex-col items-center gap-2 rounded-xs bg-canvas py-10 text-center">
                  <Laptop className="size-6 text-muted" strokeWidth={1.5} />
                  <p className="text-sm text-body">
                    Riwayat perangkat & lokasi login belum tersedia.
                  </p>
                  <p className="max-w-xs text-xs text-muted">
                    Fitur ini butuh sistem pencatatan sesi login yang belum
                    dibangun.
                  </p>
                </div>
              </div>
            </div>
          ) : activeTab === "rekening" ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-border-soft pb-4">
                <h2 className="text-base text-ink">Rekening Bank</h2>
                <button
                  type="button"
                  onClick={handleSaveRekening}
                  disabled={isSaving}
                  className="rounded-xs bg-brand px-4 py-2 text-sm text-white disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>

              {savedMessage ? (
                <p className="text-sm text-success">{savedMessage}</p>
              ) : null}

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.8px] text-info">
                  Rekening Utama
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                      Nama Bank
                    </label>
                    <select
                      value={profil.bank_name}
                      onChange={(event) =>
                        setProfil({ ...profil, bank_name: event.target.value })
                      }
                      className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
                    >
                      <option value="">Pilih bank</option>
                      {BANK_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                      Nomor Rekening
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Contoh: 8892001234"
                      value={profil.nomor_rekening}
                      onChange={(event) =>
                        setProfil({ ...profil, nomor_rekening: event.target.value })
                      }
                      className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                      Nama Pemilik Rekening
                    </label>
                    <div className="rounded-xs border border-border-soft bg-chip p-3 text-sm font-semibold text-ink">
                      {profil.nama || "-"}
                    </div>
                    <p className="text-[11px] text-muted">
                      Mengikuti Nama Bisnis di tab Profil Bisnis. Pastikan sama
                      dengan nama di buku rekening.
                    </p>
                  </div>
                </div>
              </div>

              <p className="border-t border-border-soft pt-6 text-xs italic text-muted">
                Data rekening ini akan digunakan sebagai tujuan pencairan dana.
                Pastikan data yang Anda masukkan sudah benar.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="text-base font-medium text-ink">
                {TABS.find((t) => t.id === activeTab)?.label} belum tersedia
              </p>
              <p className="text-sm text-body">
                Fitur ini masih dalam pengembangan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
