"use client";
//node_modules
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
//Custom Hooks
import { handleNavbar } from "../hooks/handle-navbar";
import { UseResizeObserver } from "../hooks/use-resize-observer";


interface NavbarProps {
  onHeightChange: (height: number) => void;
}

export default function Navbar({ onHeightChange }: NavbarProps) {
    const { elementRef, elementHeight } = UseResizeObserver();
    const { isVisible } = handleNavbar(elementHeight);
    
    useEffect(() => {
        onHeightChange(elementHeight);
    }, [elementHeight, onHeightChange]);

    return (
        <motion.nav 
            ref={elementRef}
            layout
            animate={{ y: isVisible ? 0 : -elementHeight }}
            transition={{ duration: 0.3 }}
            className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 fixed top-0 left-0 z-50">
            <div className="text-lg font-bold">Nathan Dos Santos' Portfolio</div>
            <ul className="flex space-x-4">
                <li><a href="https://dossantosfamily.com" className="hover:text-gray-400">Home</a></li>
            </ul>
        </motion.nav>
    )
}