"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro } from "@/lib/utils";
import type { TaxResult } from "@/lib/tax/calculator";
import { useT } from "@/lib/i18n/context";

interface Props {
  result: TaxResult;
}

export function SlideDailyCost({ result }: Props) {
  const { t } = useT();
  const daily = result.coutJournalier;
  const monthly = result.totalPrelevements / 12;

  return (
    <SlideLayout gradient={SLIDE_THEMES["daily-cost"].background}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[12.5px] text-text-muted"
      >
        {t("daily.everyDay")}
      </motion.p>

      <div className="my-3">
        <AnimatedCounter
          value={daily}
          duration={2}
          format={(n) => formatEuro(n, 2)}
          className="text-[36px] font-bold tracking-[-1px] text-text-primary"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-[12.5px] font-medium text-text-secondary"
      >
        {t("daily.toCountry")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="glass-card mt-8 px-5 py-3"
      >
        <p className="text-[12.5px] text-text-secondary">
          {t("daily.thatsAlso")}{" "}
          <span className="mono-number font-bold text-text-primary">
            {formatEuro(monthly, 0)}
          </span>{" "}
          {t("daily.perMonth")}
        </p>
      </motion.div>
    </SlideLayout>
  );
}
