
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailerRef = useRef<HTMLDivElement>(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for position tracking - much faster than DOM dataset
    const pos = useRef({ x: 0, y: 0 });
    const trailerPos = useRef({ x: 0, y: 0 });

    const location = useLocation();

    useEffect(() => {
        // Only run on devices with fine pointers (mouse) to avoid touch issues
        const mediaQuery = window.matchMedia("(pointer: fine)");

        const handleVisibility = () => {
            if (mediaQuery.matches) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Check initially
        handleVisibility();

        // Listen for changes
        mediaQuery.addEventListener('change', handleVisibility);

        if (!mediaQuery.matches) return;

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Update ref for the main dot (instant)
            pos.current = { x: clientX, y: clientY };

            // Direct transform for main dot (zero lag)
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
        };

        const onMouseDown = () => setIsPressed(true);
        const onMouseUp = () => setIsPressed(false);

        const onMouseEnterLink = () => setIsPointer(true);
        const onMouseLeaveLink = () => setIsPointer(false);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        // Update interactive elements
        const updateInteractiveListeners = () => {
            // Added more selectors to ensure we catch everything clickable
            const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .pointer-element, [onclick], label');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
                el.addEventListener('mouseenter', onMouseEnterLink);
                el.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        updateInteractiveListeners();

        // Mutation observer to handle dynamic content
        const observer = new MutationObserver(updateInteractiveListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        // Animation Loop
        let animationFrameId: number;

        const animateTrailer = () => {
            // Speed factor: Increased from 0.2 to 0.6 for ultra-snappy response (almost instant)
            const ease = 0.6;

            // Lerp logic
            trailerPos.current.x += (pos.current.x - trailerPos.current.x) * ease;
            trailerPos.current.y += (pos.current.y - trailerPos.current.y) * ease;

            if (trailerRef.current) {
                const x = trailerPos.current.x;
                const y = trailerPos.current.y;
                trailerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isPressed ? 0.9 : 1})`;
            }

            animationFrameId = requestAnimationFrame(animateTrailer);
        };

        animateTrailer();

        return () => {
            mediaQuery.removeEventListener('change', handleVisibility);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);

            const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .pointer-element, [onclick], label');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, [location.pathname]); // Re-initialize on route changes for fresh listeners

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
            {/* Main Dot - The precise cursor */}
            {/* VITAL: Removed 'transform' from transition-property. It must update instantly. */}
            <div
                ref={cursorRef}
                className={cn(
                    "fixed top-0 left-0 w-2 h-2 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform",
                    "transition-opacity duration-150",
                    isPointer ? "opacity-0" : "opacity-100"
                )}
                style={{ left: 0, top: 0 }}
            />

            {/* Floating Ring - The smooth follower */}
            {/* Reduced transition duration from 300ms to 100ms for snappy hover feedback */}
            <div
                ref={trailerRef}
                className={cn(
                    "fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform",
                    "border-[1.5px] border-black dark:border-white transition-all duration-100 ease-out",
                    isPointer
                        ? "w-14 h-14 bg-black/5 dark:bg-white/10 backdrop-blur-[1px] border-transparent" // Expand on hover
                        : "w-8 h-8" // Default size
                )}
                style={{ left: 0, top: 0 }}
            />
        </div>
    );
}
