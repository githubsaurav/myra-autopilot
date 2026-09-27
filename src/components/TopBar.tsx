import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function TopBar({ title, showBack = true }: { title: string; showBack?: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      {showBack ? (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-black/5"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </button>
      ) : (
        <span className="w-8" />
      )}
      <h1 className="flex-1 truncate text-center text-[15px] font-bold text-[var(--color-ink)]">{title}</h1>
      <span className="w-8" />
    </div>
  );
}
