import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SilkWaveProps {
    className?: string;
    color?: string; // Base color for the silk
    opacity?: number;
}

export const SilkWave = ({
    className,
    color = "#c2410c", // Default golden/bronze
    opacity = 0.5,
}: SilkWaveProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            // Optimization: Use lower resolution for blurred background
            const dpr = (window.devicePixelRatio || 1) * 0.5;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        window.addEventListener("resize", resize);
        resize();

        // Helper to convert hex to rgb
        const hexToRgb = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return [r, g, b];
        };

        const rgb = hexToRgb(color);

        const draw = () => {
            time += 0.003;
            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            // Draw 6 overlapping ribbons for more depth
            for (let i = 0; i < 6; i++) {
                const offset = i * 15;
                const shiftX = time * (1 + i * 0.1);
                const shiftY = time * 0.5;

                ctx.beginPath();
                ctx.moveTo(0, height * 0.8);

                for (let x = 0; x <= width; x += 3) {
                    const y =
                        height * 0.72 +
                        Math.sin(x * 0.0015 + shiftX) * 50 +
                        Math.cos(x * 0.0008 - shiftX * 0.4) * 30 +
                        Math.sin(shiftY + i) * 10 +
                        offset;

                    ctx.lineTo(x, y);
                }

                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();

                const alpha = (0.25 - i * 0.035) * opacity;
                const gradient = ctx.createLinearGradient(0, height * 0.6, width, height * 0.9);
                gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
                gradient.addColorStop(0.3, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`);
                gradient.addColorStop(0.7, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha * 1.5})`);
                gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);

                ctx.fillStyle = gradient;
                // Removed expensive shadowBlur as it's already blurred by CSS filter
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, opacity]);

    return (
        <div className={cn("absolute inset-0 -z-10 overflow-hidden bg-[#0a0a0a]", className)}>
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ filter: "blur(20px)" }}
            />
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
    );
};
