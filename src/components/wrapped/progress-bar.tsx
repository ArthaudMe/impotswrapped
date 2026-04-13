"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <div className="flex gap-0.5 px-3 sm:gap-1 sm:px-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-0.5 flex-1 overflow-hidden bg-white/20 sm:h-1"
        >
          {i <= current && (
            <motion.div
              className="h-full bg-white"
              initial={i === current ? { width: "0%" } : false}
              animate={{ width: "100%" }}
              transition={
                i === current
                  ? { duration: 0.3, ease: "easeOut" }
                  : { duration: 0 }
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
