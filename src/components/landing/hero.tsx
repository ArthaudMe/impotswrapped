"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* French flag */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-5 flex h-8 w-12 origin-top overflow-hidden rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
      >
        <div className="w-1/3 bg-[#002395]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#ED2939]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1"
      >
        <motion.span
          className="inline-block size-1.5 rounded-full bg-green"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Revenus 2025
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-[28px] font-bold leading-tight tracking-[-0.5px]"
      >
        Decouvrez ou vont
        <br />
        vos impots
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 max-w-[260px] text-[12.5px] leading-relaxed text-text-secondary"
      >
        Entrez votre revenu, on calcule et on vous montre tout.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-7 w-full"
      >
        <Button
          onClick={onStart}
          className="h-11 w-full rounded-[10px] text-[13px] font-semibold"
        >
          Commencer
        </Button>
      </motion.div>
    </div>
  );
}
