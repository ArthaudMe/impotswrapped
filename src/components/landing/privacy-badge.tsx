"use client";

import { motion } from "framer-motion";

export function PrivacyBadge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1"
    >
      <svg
        className="size-3 text-green"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
      <span className="text-[10px] font-medium text-text-muted">
        100% prive — rien ne quitte votre appareil
      </span>
    </motion.div>
  );
}
