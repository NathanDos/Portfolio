'use client';
//node_modules
import { useState, useEffect, useRef } from 'react';

// Custom hook to observe the size of an element and trigger a callback on resize
export function UseResizeObserver<T extends HTMLElement>(
  onResize?: (entry: ResizeObserverEntry) => void, // Optional callback function to be called on resize
) {
  const elementRef = useRef<T | null>(null);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setElementHeight(entry.contentRect.height);
        // Run custom logic
        onResize?.(entry);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { elementRef, elementHeight };
}
