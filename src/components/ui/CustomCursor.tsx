import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isInput, setIsInput] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const rafId = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        if (!isVisible) setIsVisible(true);
    }, [isVisible]);

    useEffect(() => {
        const updateCursor = () => {
            // Smoothly interpolate the ring position for a premium feel
            // but keep it fast enough to not feel laggy
            const ease = 0.15;
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            rafId.current = requestAnimationFrame(updateCursor);
        };

        rafId.current = requestAnimationFrame(updateCursor);
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable =
            target.tagName.toLowerCase() === 'button' ||
            target.tagName.toLowerCase() === 'a' ||
            target.closest('button') ||
            target.closest('a') ||
            window.getComputedStyle(target).cursor === 'pointer';

        const isInputField =
            target.tagName.toLowerCase() === 'input' ||
            target.tagName.toLowerCase() === 'textarea' ||
            target.isContentEditable;

        setIsHovering(!!isClickable);
        setIsInput(!!isInputField);
    }, []);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("mousedown", handleMouseDown, { passive: true });
        window.addEventListener("mouseup", handleMouseUp, { passive: true });
        document.addEventListener("mouseleave", () => setIsVisible(false));
        document.addEventListener("mouseenter", () => setIsVisible(true));

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp]);

    // Disable custom cursor on touch devices
    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) setIsVisible(false);
    }, []);

    if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            <style>
                {`
          @media (min-width: 768px) {
            * {
              cursor: none !important;
            }
            a, button, [role="button"], input, textarea {
              cursor: none !important;
            }
          }
        `}
            </style>
            <div
                ref={cursorRef}
                className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
            >
                {/* Outer ring */}
                <motion.div
                    ref={ringRef}
                    className={cn(
                        "fixed rounded-full border border-primary/30 flex items-center justify-center transition-colors duration-300 will-change-transform",
                        isHovering || isClicking ? "bg-primary/5 border-primary/50" : "bg-transparent"
                    )}
                    animate={{
                        width: isClicking ? 40 : isHovering ? 80 : isInput ? 4 : 48,
                        height: isClicking ? 40 : isHovering ? 80 : isInput ? 32 : 48,
                        borderRadius: isInput ? "2px" : "100%",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                        top: 0,
                        left: 0,
                    }}
                >
                    <AnimatePresence>
                        {isHovering && !isClicking && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="body-small text-[10px] tracking-[0.2em] font-bold"
                            >
                                VIEW
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Inner dot */}
                <div
                    ref={dotRef}
                    className={cn(
                        "fixed w-1.5 h-1.5 bg-primary rounded-full transition-opacity duration-200 will-change-transform",
                        isInput && "opacity-0"
                    )}
                    style={{
                        top: 0,
                        left: 0,
                        opacity: isVisible && !isInput ? 1 : 0,
                        transform: `scale(${isClicking ? 0.8 : 1})`,
                    }}
                />
            </div>
        </>
    );
};

