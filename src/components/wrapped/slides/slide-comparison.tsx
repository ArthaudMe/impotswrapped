"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatNumber } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";
import {
  getComparisonForCategory,
  computeComparison,
} from "@/lib/budget/comparisons";
import { useT } from "@/lib/i18n/context";
import { getCompTranslation } from "@/lib/i18n/translations";

interface Props {
  breakdown: CategoryBreakdown[];
}

export function SlideComparison({ breakdown }: Props) {
  const { t, locale } = useT();
  const items = breakdown
    .map((b) => {
      const comp = getComparisonForCategory(b.category.id);
      if (!comp) return null;
      const count = computeComparison(b.amount, comp.unitPrice);
      if (count <= 0) return null;
      return { ...comp, count, emoji: b.category.emoji };
    })
    .filter(Boolean)
    .slice(0, 6);

  return (
    <SlideLayout gradient={SLIDE_THEMES.comparisons.background}>
      <motion.h2
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-5 text-[16px] font-bold tracking-tight text-text-primary"
      >
        {t("comparison.title")}
      </motion.h2>

      <div className="w-full max-w-[260px] space-y-2">
        {items.map(
          (item, i) =>
            item && (
              <motion.div
                key={item.categoryId}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card flex items-center gap-2.5 px-4 py-2.5"
              >
                <span className="text-base">{item.emoji}</span>
                <p className="text-[12.5px] text-text-secondary">
                  <span className="mono-number font-bold text-text-primary">
                    {formatNumber(item.count)}
                  </span>{" "}
                  {getCompTranslation(item.categoryId, locale) || item.item}
                </p>
              </motion.div>
            )
        )}
      </div>
    </SlideLayout>
  );
}
