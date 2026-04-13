"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SlideLayout } from "../shared/slide-layout";
import { BarChart } from "../shared/bar-chart";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro, formatPercent } from "@/lib/utils";
import type { TaxResult } from "@/lib/tax/calculator";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";

interface Props {
  result: TaxResult;
  breakdown: CategoryBreakdown[];
  onShare: () => void;
  onReset: () => void;
}

export function SlideFinale({ result, breakdown, onShare, onReset }: Props) {
  const totalInvestissement = breakdown
    .filter((b) => b.category.nature === "investissement")
    .reduce((sum, b) => sum + b.amount, 0);
  const totalDepense = breakdown
    .filter((b) => b.category.nature === "depense")
    .reduce((sum, b) => sum + b.amount, 0);
  const investPct =
    result.impotNet > 0 ? totalInvestissement / result.impotNet : 0;
  const depensePct =
    result.impotNet > 0 ? totalDepense / result.impotNet : 0;

  return (
    <SlideLayout gradient={SLIDE_THEMES.finale.background}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1"
      >
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Recap 2025
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-3"
      >
        <p className="mono-number text-[24px] font-bold tracking-[-0.5px] text-text-primary">
          {formatEuro(result.impotNet)}
        </p>
        <p className="mt-0.5 text-[11px] text-text-muted">
          Taux effectif :{" "}
          <span className="mono-number font-semibold text-text-secondary">
            {formatPercent(result.tauxEffectif)}
          </span>
        </p>
      </motion.div>

      {/* Investissement vs Depense split */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-3 w-full max-w-[260px]"
      >
        <div className="flex items-center gap-2 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="inline-block size-1.5 rounded-full bg-[#30d158]" />
            <span className="text-text-muted">Investissement</span>
          </div>
          <span className="mono-number font-semibold text-[#30d158]">
            {formatPercent(investPct, 0)}
          </span>
          <div className="mx-1 h-3 w-px bg-border-subtle" />
          <div className="flex items-center gap-1">
            <span className="inline-block size-1.5 rounded-full bg-[#ff453a]" />
            <span className="text-text-muted">Depense</span>
          </div>
          <span className="mono-number font-semibold text-[#ff453a]">
            {formatPercent(depensePct, 0)}
          </span>
        </div>
        {/* Split bar */}
        <div className="mt-1.5 flex h-1.5 w-full overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-[#30d158]"
            initial={{ width: 0 }}
            animate={{ width: `${investPct * 100}%` }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="h-full bg-[#ff453a]"
            initial={{ width: 0 }}
            animate={{ width: `${depensePct * 100}%` }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="my-4 w-full max-w-[260px]"
      >
        <BarChart data={breakdown} compact showAmounts />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex w-full max-w-[240px] flex-col gap-2"
      >
        <Button
          onClick={onShare}
          className="h-11 w-full rounded-[10px] text-[13px] font-semibold"
        >
          Partager
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="h-11 w-full rounded-[10px] border-border-subtle text-[13px] font-semibold text-text-secondary hover:bg-surface-raised"
        >
          Refaire
        </Button>
      </motion.div>
    </SlideLayout>
  );
}
