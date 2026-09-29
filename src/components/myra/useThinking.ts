import { useState } from "react";

/** Simulates Myra "thinking" for 400–700ms before revealing the scripted response. */
export function useThinking() {
  const [isThinking, setIsThinking] = useState(false);

  function runWithThinking(after: () => void) {
    setIsThinking(true);
    const delay = 400 + Math.random() * 300;
    setTimeout(() => {
      setIsThinking(false);
      after();
    }, delay);
  }

  return { isThinking, runWithThinking };
}
