"use client";

import { useEffect, useState } from "react";
import { Building2, ShieldCheck } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { ChangePasswordForm } from "@/components/produsen/pengaturan/change-password-form";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import { getAccessToken } from "@/lib/auth";

type Tab = "profil" | "keamanan";

type Profil = {
  nama_koperasi: string;
  bentuk_koperasi: string;
  kategori_usaha: string;
  alamat_lengkap: string;
  kode_pos: string;
  nik_pengurus: string;
  nikop: string;
  status_registrasi: string;
  email: string;
};

export default function KoperasiPengaturanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profil");
  const [profil, setProfil] = useState<Profil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) {
        setError("Sesi tidak ditemukan. Silakan masuk kembali.");
        setLoading(false);
        return;
      }
      const response = await fetch("/api/koperasi/pengaturan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal memuat data pengaturan.");
        setLoading(false);
        return;
      }
      setProfil(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSaveProfil() {
    if (!profil) return;
    setError("");
    setSavedMessage("");
    setIsSaving(true);

    const token = await getAccessToken();
    const response = await fetch("/api/koperasi/pengaturan", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama_koperasi: profil.nama_koperasi,
        bentuk_koperasi: profil.bentuk_koperasi,
        kategori_usaha: profil.kategori_usaha,
        alamat_lengkap: profil.alamat_lengkap,
        kode_pos: profil.kode_pos,
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
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <main className="flex flex-1 flex-col gap-8 px-8 py-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
                Pengaturan
              </h1>
              <p className="text-base text-body">
                Kelola profil koperasi dan keamanan akun Anda.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-8">
              <nav className="col-span-1 flex flex-col gap-1 self-start rounded-lg border border-border-soft bg-white p-2 shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profil");
                    setSavedMessage("");
                  }}
                  className={`flex items-center gap-3 rounded-xs px-4 py-3 text-left text-sm font-medium ${
                    activeTab === "profil"
                      ? "border-l-4 border-brand bg-chip text-info-deep"
                      : "border-l-4 border-transparent text-body hover:bg-canvas"
                  }`}
                >
                  <Building2 className="size-5 shrink-0" strokeWidth={2} />
                  Profil Koperasi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("keamanan");
                    setSavedMessage("");
                  }}
                  className={`flex items-center gap-3 rounded-xs px-4 py-3 text-left text-sm font-medium ${
                    activeTab === "keamanan"
                      ? "border-l-4 border-brand bg-chip text-info-deep"
                      : "border-l-4 border-transparent text-body hover:bg-canvas"
                  }`}
                >
                  <ShieldCheck className="size-5 shrink-0" strokeWidth={2} />
                  Keamanan
                </button>
              </nav>

              <div className="col-span-3 rounded-lg border border-border-soft bg-white p-8">
                {loading ? (
                  <p className="text-sm text-body">Memuat data...</p>
                ) : error ? (
                  <p className="text-sm text-danger" role="alert">
                    {error}
                  </p>
                ) : !profil ? null : activeTab === "profil" ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-border-soft pb-4">
                      <h2 className="text-base text-ink">Profil Koperasi</h2>
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
                      <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                          Nama Koperasi
                        </label>
                        <input
                          type="text"
                          value={profil.nama_koperasi}
                          onChange={(event) =>
                            setProfil({ ...profil, nama_koperasi: event.target.value })
                          }
                          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                          Bentuk Koperasi
                        </label>
                        <input
                          type="text"
                          value={profil.bentuk_koperasi}
                          onChange={(event) =>
                            setProfil({ ...profil, bentuk_koperasi: event.target.value })
                          }
                          placeholder="Cth: Koperasi Produsen"
                          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                          Kategori Usaha
                        </label>
                        <input
                          type="text"
                          value={profil.kategori_usaha}
                          onChange={(event) =>
                            setProfil({ ...profil, kategori_usaha: event.target.value })
                          }
                          placeholder="Cth: Pertanian"
                          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                        />
                      </div>

                      <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                          Alamat Lengkap
                        </label>
                        <textarea
                          value={profil.alamat_lengkap}
                          onChange={(event) =>
                            setProfil({ ...profil, alamat_lengkap: event.target.value })
                          }
                          rows={3}
                          className="resize-none rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                          Kode Pos
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={profil.kode_pos}
                          onChange={(event) =>
                            setProfil({ ...profil, kode_pos: event.target.value })
                          }
                          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
                        />
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
                          NIK Pengurus
                        </label>
                        <input
                          type="text"
                          value={profil.nik_pengurus || "-"}
                          disabled
                          className="rounded-xs border border-border-soft bg-canvas/60 p-3 text-sm text-body"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                          NIKOP
                        </label>
                        <input
                          type="text"
                          value={profil.nikop || "-"}
                          disabled
                          className="rounded-xs border border-border-soft bg-canvas/60 p-3 text-sm text-body"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted">
                      NIK Pengurus, NIKOP, dan Email adalah identitas legal yang
                      tercatat saat registrasi — belum bisa diubah dari sini.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    <div className="border-b border-border-soft pb-4">
                      <h2 className="text-base text-ink">Keamanan Akun</h2>
                    </div>
                    <ChangePasswordForm email={profil.email} />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
