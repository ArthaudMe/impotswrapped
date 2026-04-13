"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export function ShimmerText({
  children,
  className,
  animated = true,
}: ShimmerTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r from-text-primary via-[#0a84ff] to-text-primary bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
      animate={
        animated
          ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
          : undefined
      }
      transition={
        animated
          ? { duration: 4, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}
