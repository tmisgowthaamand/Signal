import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DynamicWaveProps {
    className?: string;
    color1?: string;
    color2?: string;
    color3?: string;
    waveCount?: number;
    complexity?: number;
    speed?: number;
    opacity?: number;
}

export const DynamicWave = ({
    className,
    color1 = "#6366f1",
    color2 = "#a855f7",
    color3 = "#ec4899",
    waveCount = 3,
    complexity = 4,
    speed = 1,
    opacity = 0.5,
}: DynamicWaveProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            // Optimization: Use lower resolution for blurred background to improve performance
            const dpr = (window.devicePixelRatio || 1) * 0.5; // Reduce resolution by half
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            time += 0.005 * speed;
            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            // We draw vertical waves inspired by the user's silk/ribbon image
            const drawWave = (offset: number, color: string, waveSpeed: number, waveHeight: number) => {
                ctx.beginPath();
                ctx.moveTo(offset, 0);

                for (let y = 0; y <= height; y += 10) {
                    const x =
                        offset +
                        Math.sin(y * 0.002 * complexity + time * waveSpeed) * waveHeight +
                        Math.cos(y * 0.001 * complexity + time * 1.5 * waveSpeed) * (waveHeight * 0.5);

                    ctx.lineTo(x, y);
                }

                ctx.lineTo(offset - 200, height);
                ctx.lineTo(offset - 200, 0);
                ctx.closePath();

                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.globalAlpha = opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            };

            // Draw multiple layers for depth
            const colors = [color1, color2, color3];
            for (let i = 0; i < waveCount; i++) {
                const baseOffset = (i * width) / waveCount;
                drawWave(
                    baseOffset + Math.sin(time) * 50,
                    colors[i % colors.length],
                    0.5 + i * 0.2,
                    80 + i * 20
                );
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color1, color2, color3, waveCount, complexity, speed, opacity]);

    return (
        <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ filter: "blur(60px) saturate(1.5)" }}
            />
            {/* Texture overlay for "Spline/Noise" feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
};
