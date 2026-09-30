import { Sparkles } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/** Reveals a Myra reply word by word on mount, to read as live typing rather than a static block appearing. */
function TypingWords({ text }: { text: string }) {
  const words = text.length ? text.split(" ") : [];
  const [count, setCount] = useState(Math.min(1, words.length));

  useEffect(() => {
    setCount(Math.min(1, words.length));
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= words.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 55);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <>{words.slice(0, count).join(" ")}</>;
}

export function MyraBubble({ children, from = "myra" }: { children: ReactNode; from?: "user" | "myra" }) {
  if (from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[var(--color-navy)] px-3.5 py-2.5 text-sm font-medium text-white">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
        <Sparkles size={13} />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-ink)]">
        {typeof children === "string" ? <TypingWords text={children} /> : children}
      </div>
    </div>
  );
}
