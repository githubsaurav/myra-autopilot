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
        {typeof children === "string" ? <TypingWords text={children} /> : children}
      </div>
    </div>
  );
}
