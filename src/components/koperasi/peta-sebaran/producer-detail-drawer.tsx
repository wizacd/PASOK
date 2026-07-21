"use client";

import { MapPin, MessageCircle, Phone, User, X } from "lucide-react";
import type { ProducerPin } from "@/components/koperasi/peta-sebaran/producer-data";

const STATUS_STYLES: Record<ProducerPin["status"], string> = {
  Tersedia: "bg-success/10 text-success",
  "Segera Panen": "bg-warning/10 text-warning",
};

export function ProducerDetailDrawer({
  pin,
  onClose,
}: {
  pin: ProducerPin | null;
  onClose: () => void;
}) {
  return (
    <div
      className={`absolute right-0 top-0 z-[500] h-full w-96 border-l border-chip-strong bg-white shadow-xl transition-transform duration-300 ${
        pin ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {pin ? (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xs border-2 border-white bg-chip shadow-md">
                <User className="size-7 text-body" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`w-fit rounded-xs px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_STYLES[pin.status]}`}
                >
                  {pin.status}
                </span>
                <h3 className="text-lg font-semibold text-ink">{pin.nama}</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="text-body"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col gap-4 px-6">
            <div className="flex items-center justify-between border-b border-chip-strong pb-3">
              <span className="text-xs font-semibold tracking-[0.6px] text-body">
                Komoditas
              </span>
              <span className="text-sm font-semibold text-ink">
                {pin.komoditas}
              </span>
            </div>
            <div className="flex items-center gap-2 pb-3 text-sm text-body">
              <MapPin className="size-4 shrink-0" strokeWidth={2} />
              {pin.lokasi}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-chip-strong bg-canvas px-6 pb-6 pt-6">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xs bg-[#25d366] py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="size-5" strokeWidth={2} />
                WhatsApp
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xs bg-info py-3 text-sm font-semibold text-white"
              >
                <Phone className="size-5" strokeWidth={2} />
                Telepon
              </button>
            </div>
            <button
              type="button"
              className="rounded-xs border border-chip-strong bg-white py-3 text-sm font-semibold text-ink"
            >
              Ajukan Penawaran
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
