//node_modules
import { useEffect, useRef, useState } from 'react';

// Handle the navbar visibility based on scroll and mouse position
export function handleNavbar(navSize: number = 50) {
    const [isVisible, setIsVisible] : [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(true);
    const isAtTopRef : React.RefObject<boolean> = useRef(true);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // If the mouse is near the top of the screen, show the navbar
            if(event.clientY < navSize) {
                setIsVisible(true);
            } else if(isAtTopRef.current) {
                setIsVisible(true);
            }
            else {
                setIsVisible(false);
            }
        };

        // Handle scroll event to hide/show navbar based on scroll position
        const handleScrollEvent = () => {
            let atTop : boolean = window.scrollY === 0;
            isAtTopRef.current = atTop;
            if(atTop){
                setIsVisible(true);
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, [navSize]);
        useEffect(() => {
        console.log("isVisible:", isVisible);
    }, [isVisible]);
    return { isVisible };
}