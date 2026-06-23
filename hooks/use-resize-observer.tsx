"use client";
//node_modules
import { useState, useEffect, useRef } from 'react';

// Custom hook to observe the size of an element and trigger a callback on resize
export function UseResizeObserver() {
    const elementRef = useRef<HTMLElement | null>(null);
    const [elementHeight, setElementHeight] = useState(0);

    useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
        setElementHeight(entry.contentRect.height);
    });

    observer.observe(element);
    return () => observer.disconnect();
    }, []);

    return { elementRef, elementHeight };
}