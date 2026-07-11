"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-1 items-center justify-center bg-canvas p-8">
      <div className="flex w-full max-w-[448px] flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Image
            src="/logo-pasok.png"
            alt="PASOK"
            width={49}
            height={55}
            className="h-[55px] w-[49px] object-contain"
            priority
          />
          <div className="flex flex-col gap-2 pt-6">
            <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
              Selamat Datang Kembali
            </h1>
            <p className="text-base leading-6 text-body">
              Masuk ke Portal Hub Koperasi Agri-Maritim Anda.
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="login-email"
                className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
              >
                Email atau Nama Pengguna
              </label>
              <div className="relative pt-1.5">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-body"
                  strokeWidth={2}
                />
                <input
                  id="login-email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  placeholder="Contoh: manager@coop.id"
                  className="h-12 w-full rounded-sm border border-border-soft bg-white pl-10 pr-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
                >
                  Kata Sandi
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-danger"
                >
                  Lupa Kata Sandi?
                </button>
              </div>
              <div className="relative pt-1.5">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-body"
                  strokeWidth={2}
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-sm border border-border-soft bg-white pl-10 pr-11 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                  }
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-body"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" strokeWidth={2} />
                  ) : (
                    <Eye className="size-4" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm text-body">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded-sm border border-border-soft text-brand focus:ring-brand"
            />
            Ingat saya untuk login berikutnya
          </label>

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-brand-deep text-xl font-semibold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90"
          >
            Masuk Sekarang
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </form>

        <div className="flex gap-1 border-t border-border-soft pt-8 text-sm">
          <span className="text-body">Belum punya akun?</span>
          <Link href="/onboarding/koperasi" className="font-bold text-brand">
            Daftar Koperasi Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
