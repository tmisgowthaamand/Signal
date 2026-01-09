import React, { useEffect, useRef } from "react";
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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            time += 0.01 * speed;
            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            // Create a mesh-like flowing gradient using overlapping circles with blur
            // In a real production app, a shader is better, but this is highly performant
            // and easy to customize without external assets.

            const drawBlob = (x: number, y: number, radius: number, color: number[]) => {
                const [r, g, b] = color;
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.2)`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            };

            // Helper to convert hex to rgb
            const hexToRgb = (hex: string) => {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return [r, g, b];
            };

            const rgbColors = colors.map(hexToRgb);

            // Blob 1
            drawBlob(
                width * 0.5 + Math.sin(time * 0.7) * width * 0.2,
                height * 0.5 + Math.cos(time * 0.5) * height * 0.2,
                width * 0.8,
                rgbColors[0] || [224, 231, 255]
            );

            // Blob 2
            drawBlob(
                width * 0.3 + Math.cos(time * 0.8) * width * 0.2,
                height * 0.7 + Math.sin(time * 0.4) * height * 0.2,
                width * 0.7,
                rgbColors[1] || [250, 232, 255]
            );

            // Blob 3
            drawBlob(
                width * 0.7 + Math.sin(time * 0.6) * width * 0.3,
                height * 0.3 + Math.cos(time * 0.7) * height * 0.2,
                width * 0.9,
                rgbColors[2] || [254, 243, 199]
            );

            // Blob 4
            drawBlob(
                width * 0.2 + Math.cos(time * 0.5) * width * 0.1,
                height * 0.2 + Math.sin(time * 0.9) * height * 0.1,
                width * 0.6,
                rgbColors[3] || [220, 252, 231]
            );

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colors, speed]);

    return (
        <div className={cn("absolute inset-0 -z-10", className)}>
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-60"
                style={{ filter: "blur(60px)" }}
            />
            <div className="absolute inset-0 bg-background/20" />
        </div>
    );
};
