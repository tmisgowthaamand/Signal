import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RunningTextProps {
  className?: string;
  text: string;
  speedSeconds?: number;
  repeat?: number;
}

export function RunningText({
  className,
  text,
  speedSeconds = 18,
  repeat = 10,
}: RunningTextProps) {
  const reduceMotion = useReducedMotion();

  const content = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="px-6">{text}</span>
      <span className="px-6 opacity-30">/</span>
    </span>
  ));

  if (reduceMotion) {
    return (
      <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
        <div className="whitespace-nowrap">
          <div className="inline-flex items-center uppercase tracking-[0.35em] font-black text-sm text-foreground/20">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className="flex w-max will-change-transform"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: speedSeconds, ease: "linear", repeat: Infinity }}
      >
        <div className="inline-flex items-center uppercase tracking-[0.35em] font-black text-sm text-foreground/20">
          {content}
        </div>
        <div className="inline-flex items-center uppercase tracking-[0.35em] font-black text-sm text-foreground/20">
          {content}
        </div>
      </motion.div>
    </div>
  );
}
