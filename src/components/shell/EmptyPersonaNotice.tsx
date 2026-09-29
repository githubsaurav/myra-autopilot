import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export function EmptyPersonaNotice({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <Icon size={22} className="text-[var(--color-slate)]" />
      <p className="text-sm font-semibold text-[var(--color-ink)]">{message}</p>
      <button type="button" onClick={() => navigate("/myra")} className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-bold text-white">
        Pick a scenario
      </button>
    </div>
  );
}
