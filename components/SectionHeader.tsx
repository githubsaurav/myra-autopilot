export function SectionHeader({
  index,
  title,
  subtitle,
  color = "var(--color-accent)",
}: {
  index: string;
  title: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
          style={{ background: color }}
        >
          {index}
        </span>
        <h2 className="text-lg font-black tracking-tight text-[var(--color-ink)] sm:text-xl">{title}</h2>
      </div>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-[var(--color-slate)]">{subtitle}</p>}
    </div>
  );
}
