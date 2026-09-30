import { useEffect, useRef } from "react";
import { useDemoStore } from "@/state/useDemoStore";
import { ArrowUp, Sparkles } from "lucide-react";

export function ChatComposer({ prefill, disabled, onSend }: {
  prefill: string;
  disabled?: boolean;
  onSend: (text: string) => void;
}) {
  const { activePersonaId, conversations, updateConversation } = useDemoStore();
  const value = activePersonaId ? conversations[activePersonaId].draft : "";
  const lastPrefill = useRef(prefill);
  function setValue(draft: string) {
    if (activePersonaId) updateConversation(activePersonaId, c => ({ ...c, draft }));
  }
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!activePersonaId) return;
    if (lastPrefill.current !== prefill) {
      updateConversation(activePersonaId, c => ({ ...c, draft: prefill }));
    } else if (prefill) {
      updateConversation(activePersonaId, c => c.draft ? c : { ...c, draft: prefill });
    }
    lastPrefill.current = prefill;
  }, [prefill, activePersonaId, updateConversation]);
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
      <details className="question-shortcuts"><summary>Ask a quick question</summary><div className="suggested-prompts" aria-label="Suggested questions">
        {(activePersonaId === "solo" ? ["लोकल अनुभव दिखाओ", "आज का प्लान", "मेरा बजट"] : ["What’s my itinerary today?", "Show my bookings", "What’s my budget?"]).map(prompt => <button key={prompt} disabled={disabled} onClick={(event) => { onSend(prompt); const menu = event.currentTarget.closest("details"); if (menu) menu.open = false; }}>{prompt}</button>)}
      </div></details>
      {prefill && !value && <button className="restore-trip-prompt" disabled={disabled} onClick={() => { setValue(prefill); inputRef.current?.focus(); }}>Continue trip conversation →</button>}
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
          placeholder={disabled ? "Myra is preparing your reply…" : "A thought, a question, a change of plan…"}
        />
        <button type="button" onClick={handleSend} disabled={disabled || !value.trim()} aria-label="Send">
          <ArrowUp size={20} />
        </button>
      </div>
      <div className="composer-footer"><span>Made for your kind of travel.</span><span>Scripted demo <span aria-hidden="true">·</span> <span className="composer-key-hint">Enter to send</span></span></div>
    </div>
  );
}
