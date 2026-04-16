"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { formatEuro, formatPercent } from "@/lib/utils";
import type { TaxResult } from "@/lib/tax/calculator";
import { useT } from "@/lib/i18n/context";

interface Props {
  result: TaxResult;
}

export function SlideTaxTotal({ result }: Props) {
  const { t } = useT();
  return (
    <SlideLayout gradient={SLIDE_THEMES["tax-reveal"].background}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[12.5px] text-text-muted"
      >
        {t("tax.in2025")}
      </motion.p>

      <div className="my-3">
        <AnimatedCounter
          value={result.impotNet}
          duration={2.5}
          format={(n) => formatEuro(n)}
          className="text-[36px] font-bold tracking-[-1px] text-text-primary"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-[12.5px] font-medium text-text-secondary"
      >
        {t("tax.incomeTax")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-8 flex items-center gap-6"
      >
        <div className="text-center">
          <p className="mono-number text-[20px] font-bold tracking-[-0.5px] text-text-primary">
            {formatPercent(result.tauxEffectif)}
          </p>
          <p className="text-[10px] font-medium text-text-muted">{t("tax.effectiveRate")}</p>
        </div>
        <div className="h-8 w-px bg-border-subtle" />
        <div className="text-center">
          <p className="mono-number text-[20px] font-bold tracking-[-0.5px] text-text-primary">
            {result.partsFiscales}
          </p>
          <p className="text-[10px] font-medium text-text-muted">
            {result.partsFiscales > 1 ? t("form.parts") : t("form.part")}
          </p>
        </div>
      </motion.div>
    </SlideLayout>
  );
}
