import { useRef, useState, useEffect } from "react";

// Handle scroll to bottom of a div and return whether the user is at the bottom or not
export function handleScrollToBottom(dep: unknown) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  //Reset the isAtBottom state when the dependency changes (e.g. new content is loaded)
  useEffect(() => {
    setIsAtBottom(false);
  }, [dep]);

  // Check if the user is at the bottom of the div on scroll
  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    setIsAtBottom(element.scrollHeight - element.scrollTop <= element.clientHeight + 1);
  };

  return { scrollRef, isAtBottom, handleScroll };
}
