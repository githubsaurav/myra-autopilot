import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";

export function ConversationThread({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const followLatest = useRef(true);
  const [showLatest, setShowLatest] = useState(false);

  useEffect(() => {
    const scroller = scrollRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;
    const observer = new ResizeObserver(() => {
      if (followLatest.current) scroller.scrollTop = scroller.scrollHeight;
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    followLatest.current = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShowLatest(!followLatest.current);
  }

  return (
    <div className="conversation-region">
      <div ref={scrollRef} onScroll={onScroll} className="conversation-thread app-scroll" role="region" tabIndex={0} aria-label="Conversation with Myra">
        <div ref={contentRef} className="conversation-content">
          <div className="conversation-start"><span />YOUR NEXT CHAPTER STARTS HERE<span /></div>
          {children}
        </div>
      </div>
      {showLatest && <button className="latest-message" onClick={() => {
        followLatest.current = true;
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }}><ArrowDown size={13} /> Latest messages</button>}
    </div>
  );
}
