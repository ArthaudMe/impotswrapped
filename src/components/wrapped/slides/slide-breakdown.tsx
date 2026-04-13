"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { BarChart } from "../shared/bar-chart";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";

interface Props {
  breakdown: CategoryBreakdown[];
  totalTax: number;
}

export function SlideBreakdown({ breakdown, totalTax }: Props) {
  return (
    <SlideLayout gradient={SLIDE_THEMES.breakdown.background}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-5 text-[12.5px] text-text-muted"
      >
        Ou vont vos{" "}
        <span className="mono-number font-semibold text-text-primary">
          {formatEuro(totalTax)}
        </span>{" "}
        ?
      </motion.p>

      <BarChart data={breakdown} className="w-full max-w-[280px]" />
    </SlideLayout>
  );
}
