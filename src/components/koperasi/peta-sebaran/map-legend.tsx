const LEGEND_ITEMS = [
  { label: "Pertanian", color: "#008aa9" },
  { label: "Kelautan", color: "#0369a1" },
  { label: "Processing Hub", color: "#f59e0b" },
];

export function MapLegend() {
  return (
    <div className="absolute bottom-6 left-6 z-[400] flex items-center gap-4 rounded-xs border border-chip-strong bg-white/90 px-3 py-2.5 shadow-md backdrop-blur-sm">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className="size-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-[11px] font-bold text-ink">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
