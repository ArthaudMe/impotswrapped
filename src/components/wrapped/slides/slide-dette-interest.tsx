"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";
import { useT } from "@/lib/i18n/context";

interface Props {
  breakdown: CategoryBreakdown[];
  detteAmount: number;
}

export function SlideDetteInterest({ detteAmount }: Props) {
  const { t } = useT();
  const strikeWords = [t("dette.noRoads"), t("dette.noSchools"), t("dette.noDefense")];
  return (
    <SlideLayout gradient={SLIDE_THEMES.dette.background}>
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.1 }}
        className="text-[40px]"
      >
        <motion.span
          className="inline-block"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
        >
          📊
        </motion.span>
      </motion.span>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-[12.5px] text-text-muted"
      >
        {t("dette.youContributed")}
      </motion.p>

      <div className="my-3">
        <AnimatedCounter
          value={detteAmount}
          duration={2}
          format={(n) => formatEuro(n)}
          className="text-[36px] font-bold tracking-[-1px] text-text-primary"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-[14px] font-semibold text-text-primary"
      >
        {t("dette.toInterest")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-8 max-w-[260px] space-y-3"
      >
        <p className="text-[12.5px] text-text-secondary">
          {strikeWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 + i * 0.3 }}
              className="mr-1"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, type: "spring" }}
            className="font-bold text-[#ff453a]"
          >
            {t("dette.justInterest")}
          </motion.span>
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
          className="text-[11px] text-text-muted"
        >
          {t("dette.explanation")}
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
}
