import { useState } from "react";

/** Simulates Myra "thinking" for ~3s before revealing the scripted response — long enough to actually read
 *  a stage-appropriate label (e.g. "Myra is curating for you...") instead of a generic "typing" indicator. */
export function useThinking() {
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("Myra is typing");

  function runWithThinking(after: () => void, label = "Myra is typing") {
    setThinkingLabel(label);
    setIsThinking(true);
    const delay = 2800 + Math.random() * 400;
    setTimeout(() => {
      setIsThinking(false);
      after();
    }, delay);
  }

  return { isThinking, thinkingLabel, runWithThinking };
}
