"use client";

import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

export function DocumentUploadCard({
  icon,
  label,
  onFileSelect,
}: {
  icon: ReactNode;
  label: string;
  onFileSelect?: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex flex-1 flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border-soft bg-chip p-8 text-center"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          setFileName(file ? file.name : null);
          onFileSelect?.(file);
        }}
      />

      {fileName ? (
        <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} />
      ) : (
        icon
      )}

      <span className="text-xs font-semibold tracking-[0.6px] text-ink">
        {label}
      </span>

      {fileName ? (
        <span className="max-w-full truncate text-[11px] font-medium text-success">
          {fileName}
        </span>
      ) : (
        <span className="text-[11px] font-medium text-body">
          Klik untuk unggah atau drag-and-drop
        </span>
      )}
    </button>
  );
}
