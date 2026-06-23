"use client";
//node_modules
import { motion } from "motion/react";
//Custom Hooks
import { handleNavbar } from "../hooks/handle-navbar";
import { UseResizeObserver } from "../hooks/use-resize-observer";

export default function Navbar() {
    // Hooks
    const { elementRef, elementHeight } = UseResizeObserver();
    const { isVisible } = handleNavbar(elementHeight);
    
    // Constants
    const DURATION = 0.3;
    // Render
    return (
        <>
        <motion.nav 
            ref={elementRef}
            layout
            animate={{ y: isVisible ? 0 : -elementHeight }}
            transition={{ duration: DURATION }}
            className={`w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 fixed top-0 left-0 z-50`}
        >
            <div className="text-lg font-bold">Nathan Dos Santos' Portfolio</div>
            <ul className="flex space-x-4">
                <li><a href="https://dossantosfamily.com" className="hover:text-gray-400">Home</a></li>
            </ul>
        </motion.nav>
        <motion.div layout transition={{ duration: DURATION }} animate={{ height: `${isVisible ? elementHeight : 0}px` }}></motion.div>
        </>
    )
}