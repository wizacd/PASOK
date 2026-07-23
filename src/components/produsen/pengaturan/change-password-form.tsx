"use client";

import { useState } from "react";
import { changePassword } from "@/lib/auth";

export function ChangePasswordForm({ email }: { email: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Lengkapi semua kolom kata sandi.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Kata sandi baru minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword(email, currentPassword, newPassword);
      setSuccess("Kata sandi berhasil diubah.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah kata sandi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-base text-ink">Ubah Kata Sandi</h3>

      <div className="flex max-w-[448px] flex-col gap-4">
        <input
          type="password"
          placeholder="Kata Sandi Saat Ini"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
        />
        <input
          type="password"
          placeholder="Kata Sandi Baru"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
        />
        <input
          type="password"
          placeholder="Konfirmasi Kata Sandi Baru"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="rounded-xs border border-border-soft bg-canvas p-3 text-sm text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
        />
      </div>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {success ? <p className="text-sm text-success">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-xs bg-brand px-4 py-2 text-sm text-white disabled:opacity-60"
      >
        {isSubmitting ? "Menyimpan..." : "Ubah Kata Sandi"}
      </button>
    </form>
  );
}
