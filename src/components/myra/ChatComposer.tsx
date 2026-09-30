import { useEffect, useState } from "react";
import { Send } from "lucide-react";

export function ChatComposer({
  prefill,
  disabled,
  onSend,
}: {
  prefill: string;
  disabled?: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState(prefill);

  useEffect(() => {
    setValue(prefill);
  }, [prefill]);

  function handleSend() {
    if (!value.trim() || disabled) return;
    onSend(value);
  }

  return (
    <div className="chat-composer flex items-end gap-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      <textarea
        aria-label="Message Myra"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={1}
        className="app-scroll max-h-24 flex-1 resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)] disabled:opacity-60"
        placeholder="Ask Myra anything about your trip..."
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-red)] text-white transition hover:opacity-90 disabled:opacity-40"
        aria-label="Send"
      >
        <Send size={15} />
      </button>
    </div>
  );
}
