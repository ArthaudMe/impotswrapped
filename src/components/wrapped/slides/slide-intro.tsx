"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { ShimmerText } from "@/components/shared/shimmer-text";
import { SLIDE_THEMES } from "@/styles/slide-themes";

export function SlideIntro() {
  return (
    <SlideLayout gradient={SLIDE_THEMES.intro.background}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative space-y-3"
      >
        {/* Glow ring behind badge */}
        <motion.div
          className="absolute left-1/2 top-0 -z-10 size-32 -translate-x-1/2 -translate-y-8 rounded-full bg-[rgba(10,132,255,0.08)] blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0.3], scale: [0.5, 1.2, 1] }}
          transition={{ delay: 0.4, duration: 2, ease: "easeOut" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1"
        >
          <motion.span
            className="inline-block size-1.5 rounded-full bg-green"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="text-[28px] font-bold leading-tight tracking-[-0.5px] text-text-primary"
        >
          Votre
          <br />
          <ShimmerText>Impots Wrapped</ShimmerText>
        </motion.h1>
      </motion.div>
    </SlideLayout>
  );
}
