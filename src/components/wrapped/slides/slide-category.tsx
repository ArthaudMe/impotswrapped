"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro, formatNumber } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";
import {
  getComparisonForCategory,
  computeComparison,
} from "@/lib/budget/comparisons";

interface Props {
  item: CategoryBreakdown;
}

export function SlideCategory({ item }: Props) {
  const theme = SLIDE_THEMES[item.category.id] || SLIDE_THEMES.breakdown;
  const comparison = getComparisonForCategory(item.category.id);
  const comparisonCount = comparison
    ? computeComparison(item.amount, comparison.unitPrice)
    : 0;

  const isInvestissement = item.category.nature === "investissement";
  const natureLabel = isInvestissement ? "Investissement" : "Depense";
  const natureDotColor = isInvestissement ? "bg-[#30d158]" : "bg-[#ff453a]";

  return (
    <SlideLayout gradient={theme.background}>
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.1 }}
        className="text-[40px]"
      >
        <motion.span
          className="inline-block"
          animate={{ y: [0, -4, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          {item.category.emoji}
        </motion.span>
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-2 text-[20px] font-bold tracking-tight text-text-primary"
      >
        {item.category.label}
      </motion.h2>

      {/* Nature badge */}
      {item.category.nature && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
          className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-2.5 py-0.5"
        >
          <span className={`inline-block size-1.5 rounded-full ${natureDotColor}`} />
          <span className="text-[9px] font-semibold uppercase tracking-wider text-text-muted">
            {natureLabel}
          </span>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-1 text-[11px] text-text-muted"
      >
        {item.category.description}
      </motion.p>

      <div className="my-4">
        <AnimatedCounter
          value={item.amount}
          format={(n) => formatEuro(n)}
          className="text-[28px] font-bold tracking-[-0.5px] text-text-primary"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
        className="flex items-baseline gap-1"
      >
        <span className={`mono-number text-[24px] font-bold ${theme.accent}`}>
          {item.percentage.toFixed(1)}%
        </span>
        <span className="text-[11px] text-text-muted">de vos impots</span>
      </motion.div>

      {/* Nature explanation */}
      {item.category.natureReason && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-3 max-w-[240px] text-[10px] italic text-text-muted"
        >
          {item.category.natureReason}
        </motion.p>
      )}

      {comparison && comparisonCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
          className="glass-card mt-4 px-5 py-3"
        >
          <p className="text-[11px] text-text-secondary">
            Soit{" "}
            <span className="mono-number font-bold text-text-primary">
              {formatNumber(comparisonCount)}
            </span>{" "}
            {comparison.item}
          </p>
        </motion.div>
      )}
    </SlideLayout>
  );
}
