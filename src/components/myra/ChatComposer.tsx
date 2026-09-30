import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

export function ChatComposer({ prefill, disabled, onSend }: {
  prefill: string;
  disabled?: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState(prefill);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { setValue(prefill); }, [prefill]);
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 128)}px`;
    }
  }, [value]);
  function handleSend() {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  }
  return (
    <div className="composer-area">
      <div className="chat-composer">
        <Sparkles className="composer-sparkle" size={18} aria-hidden="true" />
        <textarea
          ref={inputRef}
          aria-label="Message Myra"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          placeholder={disabled ? "Choose an option above to continue…" : "A thought, a question, a change of plan…"}
        />
        <button type="button" onClick={handleSend} disabled={disabled || !value.trim()} aria-label="Send">
          <ArrowUp size={20} />
        </button>
      </div>
      <div className="composer-footer"><span>Made for your kind of travel.</span><span>Scripted demo <span aria-hidden="true">·</span> <span className="composer-key-hint">Enter to send</span></span></div>
    </div>
  );
}
