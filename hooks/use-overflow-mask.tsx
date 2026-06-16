import { useRef, useState, useEffect } from "react";
import { handleScrollToBottom } from "./handle-scroll-to-bottom";

// Determine if a div is overflowing and if the user is at the bottom of the div
export function useOverflowMask(active: unknown) {
  const { scrollRef, isAtBottom, handleScroll } = handleScrollToBottom(active);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [active]);

  return {
    scrollRef,
    handleScroll,
    showMask: isOverflowing && !isAtBottom,
  };
}