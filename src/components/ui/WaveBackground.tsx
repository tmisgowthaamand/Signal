import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WaveBackgroundProps {
    className?: string;
    colors?: string[]; // Up to 4 colors for the gradient
    speed?: number;
}

export const WaveBackground = ({
    className,
    colors = ["#e0e7ff", "#fae8ff", "#fef3c7", "#dcfce7"], // Default iridescent
    speed = 0.5,
}: WaveBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.01 }
        );
        observer.observe(canvas);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

        const resize = () => {
            // High Performance Optimization: Use a very low resolution canvas
            // and let CSS upscaling + blur handle the quality.
            // This reduces the number of pixels to draw by 96%.
            canvas.width = 120;
            canvas.height = 120;
        };

        window.addEventListener("resize", resize);
        resize();

        const hexToRgb = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return [r, g, b];
        };
        const rgbColors = colors.map(hexToRgb);

        const draw = () => {
            if (!isVisible) return;

            time += 0.01 * speed;
            const { width, height } = canvas;

            // Fill background instead of clear for performance (no alpha blending)
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);

            const drawBlob = (x: number, y: number, radius: number, color: number[]) => {
                const [r, g, b] = color;
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            };

            // Simplified Math for faster execution
            const sin1 = Math.sin(time * 0.7);
            const cos1 = Math.cos(time * 0.5);
            const cos2 = Math.cos(time * 0.8);
            const sin2 = Math.sin(time * 0.4);

            drawBlob(width * 0.5 + sin1 * width * 0.3, height * 0.5 + cos1 * height * 0.3, width * 0.8, rgbColors[0] || [224, 231, 255]);
            drawBlob(width * 0.3 + cos2 * width * 0.3, height * 0.7 + sin2 * height * 0.3, width * 0.7, rgbColors[1] || [250, 232, 255]);
            drawBlob(width * 0.7 + Math.sin(time * 0.6) * width * 0.4, height * 0.3 + Math.cos(time * 0.7) * height * 0.3, width * 0.9, rgbColors[2] || [254, 243, 199]);

            if (!prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colors, speed, isVisible]);

    return (
        <div className={cn("absolute inset-0 -z-10 bg-background overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-40 mix-blend-multiply transition-opacity duration-1000"
                style={{
                    filter: "blur(80px)",
                    transform: "scale(1.2)", // Cover blur edges
                    imageRendering: "auto",
                    willChange: "transform"
                }}
            />
        </div>
    );
};

