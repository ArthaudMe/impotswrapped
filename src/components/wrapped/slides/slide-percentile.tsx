"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { getIncomePercentile } from "@/lib/tax/percentiles";
import { formatNumber } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";

interface Props {
  revenuNetImposable: number;
}

export function SlidePercentile({ revenuNetImposable }: Props) {
  const { t } = useT();
  const rawPercentile = getIncomePercentile(revenuNetImposable);
  const rawTop = Math.max(0.1, 100 - rawPercentile);
  // Round topPercent first, then derive earnMoreThan so the two numbers are consistent
  const topPercent = rawTop >= 1 ? Math.round(rawTop) : parseFloat(rawTop.toFixed(1));
  const earnMoreThan = 100 - topPercent;
  const label = `top ${topPercent < 1 ? topPercent.toFixed(1) : topPercent}%`;

  // Generate bar segments (20 bars representing the population)
  const totalBars = 20;
  const highlightedBar = Math.min(
    totalBars - 1,
    Math.floor((earnMoreThan / 100) * totalBars)
  );

  return (
    <SlideLayout gradient={SLIDE_THEMES["tax-reveal"].background}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[12.5px] text-text-muted"
      >
        {t("percentile.among")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="my-5"
      >
        <span className="mono-number text-[48px] font-bold tracking-[-2px] text-text-primary">
          {label}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-[12.5px] text-text-secondary"
      >
        {t("percentile.youEarnMore")}{" "}
        <span className="mono-number font-bold text-text-primary">
          {formatNumber(earnMoreThan)}%
        </span>{" "}
        {t("percentile.ofHouseholds")}
      </motion.p>

      {/* Population bar visualization */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 flex w-full max-w-[260px] items-end justify-center gap-[3px]"
      >
        {Array.from({ length: totalBars }).map((_, i) => {
          const barHeight = 12 + (i / totalBars) * 40;
          const isHighlighted = i === highlightedBar;
          const isPast = i < highlightedBar;

          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.4 + i * 0.03 }}
              className="origin-bottom rounded-[2px]"
              style={{
                height: `${barHeight}px`,
                width: `${Math.floor(260 / totalBars) - 3}px`,
                backgroundColor: isHighlighted
                  ? "#0a84ff"
                  : isPast
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.04)",
              }}
            />
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="mt-2 flex w-full max-w-[260px] items-center justify-between"
      >
        <span className="text-[9px] text-text-muted">0%</span>
        <span className="text-[9px] text-text-muted">
          {t("percentile.you")} ({label})
        </span>
        <span className="text-[9px] text-text-muted">100%</span>
      </motion.div>
    </SlideLayout>
  );
}
