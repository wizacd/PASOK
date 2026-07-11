import type { LucideIcon } from "lucide-react";

export function DocumentUploadCard({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex flex-1 flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border-soft bg-chip p-8 text-center"
    >
      <Icon className="size-8 text-info" strokeWidth={1.5} />
      <span className="text-xs font-semibold tracking-[0.6px] text-ink">
        {label}
      </span>
      <span className="text-[11px] font-medium text-body">
        Klik untuk unggah atau drag-and-drop
      </span>
    </button>
  );
}
