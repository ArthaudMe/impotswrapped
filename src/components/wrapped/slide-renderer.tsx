"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SlideRendererProps {
  slideKey: string;
  children: React.ReactNode;
}

export function SlideRenderer({ slideKey, children }: SlideRendererProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
