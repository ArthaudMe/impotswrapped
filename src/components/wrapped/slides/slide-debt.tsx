"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedCounter } from "../shared/animated-counter";
import { formatNumber } from "@/lib/utils";
import { DETTE_PUBLIQUE } from "@/lib/budget/france-fiscal";

function LiveDebtCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [debt, setDebt] = useState<number>(DETTE_PUBLIQUE.total);
  const startRef = useRef<number | null>(null);
  const countUpDone = useRef(false);
  const [countUpValue, setCountUpValue] = useState(0);

  // Phase 1: count-up animation from 0 to total (3 seconds)
  useEffect(() => {
    if (!isInView) return;

    const duration = 3; // seconds
    const startTime = performance.now();
    startRef.current = startTime;

    function animate(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountUpValue(DETTE_PUBLIQUE.total * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        countUpDone.current = true;
        setDebt(DETTE_PUBLIQUE.total);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView]);

  // Phase 2: once count-up finishes, tick up every second
  useEffect(() => {
    if (!isInView) return;

    // Start ticking after the count-up duration
    const tickDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDebt((prev) => prev + DETTE_PUBLIQUE.deficitPerSecond);
      }, 1000);

      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(tickDelay);
  }, [isInView]);

  const displayValue = countUpDone.current ? debt : countUpValue;

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="mono-number text-[16px] font-bold tracking-[-0.5px] text-text-primary"
      >
        {formatNumber(Math.round(displayValue), 0)} €
      </motion.span>
    </div>
  );
}

export function SlideDebt() {
  return (
    <SlideLayout gradient="from-[#0c0c0f] via-[#111115] to-[#0c0c0f]">
      <motion.h2
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[20px] font-bold tracking-tight text-text-primary"
      >
        Ce deficit ?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-1 max-w-[240px] text-[11px] text-text-muted"
      >
        Il s&apos;ajoute a la dette nationale, qui s&apos;accumule depuis{" "}
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
          La dette publique{" "}
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
        <p className="mt-1 text-[10px] text-text-muted">par habitant</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-4 text-[10px] text-text-muted"
      >
        {DETTE_PUBLIQUE.enPctPIB}% du PIB
      </motion.p>
    </SlideLayout>
  );
}
