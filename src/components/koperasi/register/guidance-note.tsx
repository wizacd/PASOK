import { Info } from "lucide-react";

export function GuidanceNote({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-4 rounded-sm border border-border-soft bg-chip-strong p-4">
      <Info className="size-5 shrink-0 text-info" strokeWidth={2} />
      <p className="text-sm italic text-body">
        <span className="font-bold not-italic">{title}: </span>
        {children}
      </p>
    </div>
  );
}
