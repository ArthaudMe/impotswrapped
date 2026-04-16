"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { formatNumber } from "@/lib/utils";
import { DETTE_PUBLIQUE } from "@/lib/budget/france-fiscal";
import { useT } from "@/lib/i18n/context";

function LiveDebtCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  // Phase 1: count-up from 0 to total (3s), then Phase 2: tick per second
  useEffect(() => {
    if (!isInView) return;

    const duration = 3;
    const startTime = performance.now();
    let cancelled = false;

    function animate(currentTime: number) {
      if (cancelled) return;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(DETTE_PUBLIQUE.total * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);

    // After count-up finishes, tick every second
    const tickDelay = setTimeout(() => {
      if (cancelled) return;
      let current = DETTE_PUBLIQUE.total;
      const interval = setInterval(() => {
        current += DETTE_PUBLIQUE.deficitPerSecond;
        setDisplayValue(current);
      }, 1000);

      // Store cleanup in the outer scope
      cleanupInterval = () => clearInterval(interval);
    }, duration * 1000);

    let cleanupInterval: (() => void) | undefined;

    return () => {
      cancelled = true;
      clearTimeout(tickDelay);
      cleanupInterval?.();
    };
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="mono-number text-[16px] font-bold tracking-[-0.5px] text-text-primary"
      >
        {formatNumber(Math.round(displayValue), 0)} &euro;
      </motion.span>
    </div>
  );
}

export function SlideDebt() {
  const { t } = useT();
  return (
    <SlideLayout gradient="from-[#0c0c0f] via-[#111115] to-[#0c0c0f]">
      <motion.h2
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[20px] font-bold tracking-tight text-text-primary"
      >
        {t("debt.thisDeficit")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-1 max-w-[240px] text-[11px] text-text-muted"
      >
        {t("debt.itAddsUp")}{" "}
        {DETTE_PUBLIQUE.depuisAnnee}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <div className="glass-card px-4 py-3">
          <LiveDebtCounter />
        </div>
        <p className="mt-1 text-[10px] text-text-muted">
          {t("debt.nationalDebt")}{" "}
          <span className="text-text-muted/60">
            (+{formatNumber(DETTE_PUBLIQUE.deficitPerSecond, 0)} €/s)
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-5"
      >
        <div className="glass-card px-6 py-4">
          <AnimatedCounter
            value={DETTE_PUBLIQUE.perPersonne}
            duration={2.5}
            format={(n) => formatNumber(n, 0) + " €"}
            className="text-[28px] font-bold tracking-[-1px] text-text-primary"
          />
        </div>
        <p className="mt-1 text-[10px] text-text-muted">{t("debt.perCapita")}</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-4 text-[10px] text-text-muted"
      >
        {DETTE_PUBLIQUE.enPctPIB}% {t("debt.ofGDP")}
      </motion.p>
    </SlideLayout>
  );
}
