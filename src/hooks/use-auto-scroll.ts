import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoScroll(deps: unknown[]) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const stickRef = useRef(true);
  const [isStuck, setIsStuck] = useState(true);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    const stuck = distance < 80;
    stickRef.current = stuck;
    setIsStuck(stuck);
  }, []);

  useEffect(() => {
    if (!stickRef.current) return;
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, deps);

  const scrollToBottom = useCallback(() => {
    stickRef.current = true;
    setIsStuck(true);
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, []);

  return { containerRef, bottomRef, onScroll, isStuck, scrollToBottom };
}
