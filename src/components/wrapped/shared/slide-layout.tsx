"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideLayoutProps {
  gradient: string;
  children: React.ReactNode;
  className?: string;
}

export function SlideLayout({
  gradient,
  children,
  className,
}: SlideLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br px-5 py-12 text-center sm:px-10 sm:py-16",
        gradient,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
