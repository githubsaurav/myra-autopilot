import { useEffect, useRef, useState } from "react";

/** A short, cancellable transition; changing journeys cannot complete an old action. */
export function useThinking() {
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("Myra is thinking");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function cancelThinking() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setIsThinking(false);
  }
  function runWithThinking(after: () => void, label = "Myra is thinking") {
    if (timer.current) clearTimeout(timer.current);
    setThinkingLabel(label);
    setIsThinking(true);
    timer.current = setTimeout(() => {
      timer.current = null;
      setIsThinking(false);
      after();
    }, 700);
  }
  return { isThinking, thinkingLabel, runWithThinking, cancelThinking };
}
