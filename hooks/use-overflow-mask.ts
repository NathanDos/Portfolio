import { useState, useEffect } from 'react';
import { handleScrollToBottom } from './handle-scroll-to-bottom';
import { UseResizeObserver } from './use-resize-observer';

/* Determine if a div is overflowing and if the user is at the bottom of the div
/* Return a ref to be attached to the div, a scroll handler to update the state, and whether to show the overflow mask or not
/* The overflow mask is shown when the div is overflowing and the user is not at the bottom of the div
*/
export function useOverflowMask(active: unknown) {
  const { scrollRef, isAtBottom, handleScroll } = handleScrollToBottom(active);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { elementRef: resizeRef } = UseResizeObserver<HTMLDivElement>(
    (entry) => {
      const element = entry.target as HTMLDivElement;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    },
  );
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
