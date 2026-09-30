import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";

export function ConversationThread({ children, questions, questionCount = 0 }: { children: ReactNode; questions?: ReactNode; questionCount?: number }) {
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const previousCount = useRef(questionCount);
  const questionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (questionCount > previousCount.current) setQuestionsOpen(true);
    previousCount.current = questionCount;
  }, [questionCount]);
  useEffect(() => {
    if (questionsOpen && questionRef.current) questionRef.current.scrollTop = questionRef.current.scrollHeight;
  }, [questionsOpen, questionCount]);
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
      {questionCount > 0 && !questionsOpen && <button className="question-history" onClick={() => setQuestionsOpen(true)}>Your questions ({questionCount})</button>}
      {questionsOpen && <section className="question-panel" aria-label="Side questions">
        <div className="question-panel-heading"><div><strong>A quick detour</strong><p>Your trip is paused exactly where you left it.</p></div><button onClick={() => setQuestionsOpen(false)}>Resume trip →</button></div>
        <div className="question-panel-messages app-scroll" ref={questionRef}>{questions}</div>
      </section>}
      {showLatest && !questionsOpen && <button className="latest-message" onClick={() => {
        followLatest.current = true;
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }}><ArrowDown size={13} /> Latest messages</button>}
    </div>
  );
}
