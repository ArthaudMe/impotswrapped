"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { BarChart } from "../shared/bar-chart";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";
import { useT } from "@/lib/i18n/context";

interface Props {
  breakdown: CategoryBreakdown[];
  totalTax: number;
  adjustedTargets?: Record<string, number>;
}

export function SlideBreakdown({ breakdown, totalTax, adjustedTargets }: Props) {
  const { t } = useT();
  return (
    <SlideLayout gradient={SLIDE_THEMES.breakdown.background}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-5 text-[12.5px] text-text-muted"
      >
        {t("breakdown.whereGo")}{" "}
        <span className="mono-number font-semibold text-text-primary">
          {formatEuro(totalTax)}
        </span>{" "}
        {t("breakdown.questionMark")}
      </motion.p>

      <BarChart data={breakdown} className="w-full max-w-[280px]" adjustedTargets={adjustedTargets} />
    </SlideLayout>
  );
}
