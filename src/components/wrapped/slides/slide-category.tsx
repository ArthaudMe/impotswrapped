"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";

import { useT } from "@/lib/i18n/context";
import { getCatTranslation } from "@/lib/i18n/translations";

interface ComparisonData {
  actualPercent: number;
  adjustedPercent: number;
  delta: number;
}

interface Props {
  item: CategoryBreakdown;
  preferenceComparison?: ComparisonData;
}

export function SlideCategory({ item, preferenceComparison }: Props) {
  const { t, locale } = useT();
  const theme = SLIDE_THEMES[item.category.id] || SLIDE_THEMES.breakdown;
  const categoryComparison = preferenceComparison
    ? {
        actual: preferenceComparison.actualPercent,
        adjusted: preferenceComparison.adjustedPercent,
        delta: preferenceComparison.delta,
      }
    : undefined;

  const isInvestissement = item.category.nature === "investissement";
  const natureLabel = isInvestissement ? t("category.investment") : t("category.expense");
  const natureDotColor = isInvestissement ? "bg-[#30d158]" : "bg-[#ff453a]";
  const catLabel = getCatTranslation(item.category.id, "label", locale) || item.category.label;
  const catDesc = getCatTranslation(item.category.id, "desc", locale) || item.category.description;
  const catReason = getCatTranslation(item.category.id, "reason", locale) || item.category.natureReason;

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
        {catLabel}
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
        {catDesc}
      </motion.p>

      <div className="my-4">
        <AnimatedCounter
          value={item.amount}
          format={(n) => formatEuro(n)}
          className="text-[28px] font-bold tracking-[-0.5px] text-text-primary"
        />
      </div>

      {/* Preference mode: deviation-first display */}
      {categoryComparison ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, type: "spring" }}
          className="space-y-2"
        >
          <div className="flex items-baseline gap-2">
            <span className={`mono-number text-[32px] font-bold ${theme.accent}`}>
              {categoryComparison.delta > 0 ? "+" : ""}
              {categoryComparison.delta.toFixed(1)}%
            </span>
            <span className="text-[11px] font-medium text-text-muted">
              {categoryComparison.delta === 0
                ? t("pref.delta.neutral")
                : categoryComparison.delta > 0
                  ? t("pref.delta.moreThanYouPrefer").replace("{delta}", categoryComparison.delta.toFixed(1))
                  : t("pref.delta.lessThanYouPrefer").replace("{delta}", Math.abs(categoryComparison.delta).toFixed(1))}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: "spring" }}
            className="flex items-center justify-center gap-4 text-[10px]"
          >
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-text-secondary" />
              <span className="text-[9px] text-text-muted">{t("pref.compare.actual")}</span>
              <span className="mono-number text-[11px] font-semibold text-text-primary">
                {categoryComparison.actual.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-text-tertiary" />
              <span className="text-[9px] text-text-muted">{t("pref.compare.adjusted")}</span>
              <span className="mono-number text-[11px] font-semibold text-text-primary">
                {categoryComparison.adjusted.toFixed(1)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
          className="flex items-baseline gap-1"
        >
          <span className={`mono-number text-[24px] font-bold ${theme.accent}`}>
            {item.percentage.toFixed(1)}%
          </span>
          <span className="text-[11px] text-text-muted">{t("category.ofYourTaxes")}</span>
        </motion.div>
      )}

      {/* Nature explanation */}
      {item.category.natureReason && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-3 max-w-[240px] text-[10px] italic text-text-muted"
        >
          {catReason}
        </motion.p>
      )}
    </SlideLayout>
  );
}
