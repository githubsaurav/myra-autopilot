import { Check, Copy, Sparkles } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export function MyraBubble({ children, from = "myra" }: { children: ReactNode; from?: "user" | "myra" }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);
  if (from === "user") {
    return (
      <div className="chat-message chat-message-user">
        <div className="chat-user-bubble">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="chat-message chat-message-myra">
      <span className="chat-avatar">
        <Sparkles size={13} />
      </span>
      <div className="chat-myra-bubble">
        <span className="chat-speaker">Myra <span>YOUR TRAVEL COMPANION</span></span>
        <div className="reply-text">{children}</div>
        {typeof children === "string" && <button className="copy-reply" aria-label={copied ? "Reply copied" : "Copy reply"} onClick={async () => {
          try { await navigator.clipboard.writeText(children); setCopied(true); setCopyError(false); }
          catch { setCopyError(true); }
        }}>{copied ? <Check size={11} /> : <Copy size={11} />}{copied ? "Copied" : "Copy"}</button>}
        {copyError && <span role="status" className="copy-error">Select the reply text to copy it.</span>}
      </div>
    </div>
  );
}
