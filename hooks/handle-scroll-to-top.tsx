//node_modules
import { useRef, useState, useEffect } from "react";

// Handle scroll to top of an element and return whether the user is at the top or not
export function handleScrollToTop(dep: unknown) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  //Reset the isAtTop state when the dependency changes (e.g. new content is loaded)
  useEffect(() => {
    setIsAtTop(false);
  }, [dep]);

  // Check if the user is at the top of an element
  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    setIsAtTop(element.scrollTop === 0);
  };

  return { scrollRef, isAtTop, handleScroll };
}
