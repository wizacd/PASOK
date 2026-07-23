"use client";

import { useEffect, useState } from "react";
import { Bell, Building2, CreditCard, ShieldCheck } from "lucide-react";
import { getAccessToken } from "@/lib/auth";

type Tab = "profil" | "notifikasi" | "keamanan" | "rekening";

const TABS: { id: Tab; label: string; icon: typeof Building2 }[] = [
  { id: "profil", label: "Profil Bisnis", icon: Building2 },
  { id: "notifikasi", label: "Notifikasi", icon: Bell },
  { id: "keamanan", label: "Keamanan", icon: ShieldCheck },
  { id: "rekening", label: "Rekening Bank", icon: CreditCard },
];

const TIPE_BISNIS_OPTIONS = ["Petani", "Nelayan", "Lainnya"];

type Profil = {
  nama: string;
  pekerjaan: string;
  telepon: string;
  alamat: string;
  email: string;
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

  async function handleSave() {
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
                onClick={() => setActiveTab(tab.id)}
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
          ) : activeTab !== "profil" ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="text-base font-medium text-ink">
                {TABS.find((t) => t.id === activeTab)?.label} belum tersedia
              </p>
              <p className="text-sm text-body">
                Fitur ini masih dalam pengembangan.
              </p>
            </div>
          ) : profil ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-soft pb-4">
                <h2 className="text-base text-ink">Profil Bisnis</h2>
                <button
                  type="button"
                  onClick={handleSave}
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
