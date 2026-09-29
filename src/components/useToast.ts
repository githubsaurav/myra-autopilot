import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  function show(text: string, duration = 2200) {
    setMessage(text);
    setTimeout(() => setMessage(null), duration);
  }

  return { message, show };
}
