"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SlideLayout } from "../shared/slide-layout";
import { SLIDE_THEMES } from "@/styles/slide-themes";
import { useT } from "@/lib/i18n/context";

interface Props {
  slideIndex: 0 | 1 | 2;
  onReset: () => void;
}

const confettiPieces = Array.from({ length: 8 }, (_, i) => ({
  angle: (i * 360) / 8,
  delay: i * 0.05,
  color: ["#ff453a", "#0a84ff", "#30d158", "#ffd60a", "#ff9f0a", "#bf5af2", "#64d2ff", "#ff6482"][i],
}));

export function SlideNonImposable({ slideIndex, onReset }: Props) {
  const { t } = useT();

  if (slideIndex === 0) {
    return (
      <SlideLayout gradient={SLIDE_THEMES["non-imposable"].background}>
        {/* Confetti burst */}
        <div className="relative">
          {confettiPieces.map((piece) => {
            const rad = (piece.angle * Math.PI) / 180;
            const x = Math.cos(rad) * 60;
            const y = Math.sin(rad) * 60;
            return (
              <motion.span
                key={piece.angle}
                className="absolute left-1/2 top-1/2 size-1.5 rounded-full"
                style={{ backgroundColor: piece.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x, y, opacity: 0, scale: 1 }}
                transition={{ delay: 0.3 + piece.delay, duration: 0.8, ease: "easeOut" }}
              />
            );
          })}
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 12 }}
            className="relative text-[40px]"
          >
            🎉
          </motion.span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-3 text-[20px] font-bold tracking-tight text-text-primary"
        >
          {t("nonTax.goodNews")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-2 max-w-[220px] text-[12.5px] text-text-secondary"
        >
          {t("nonTax.notTaxable")}
        </motion.p>
      </SlideLayout>
    );
  }

  if (slideIndex === 1) {
    return (
      <SlideLayout gradient={SLIDE_THEMES["non-imposable"].background}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[16px] font-bold tracking-tight text-text-primary"
        >
          {t("nonTax.butYouContribute")}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-5 w-full max-w-[260px] space-y-2"
        >
          {[
            { t: t("nonTax.vat"), d: t("nonTax.vatDesc") },
            { t: "CSG / CRDS", d: t("nonTax.csgDesc") },
            { t: t("nonTax.localTaxes"), d: t("nonTax.localDesc") },
          ].map((item, i) => (
            <motion.div
              key={item.t}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 200 }}
              className="glass-card px-4 py-3"
            >
              <p className="text-[12.5px] font-semibold text-text-primary">
                {item.t}
              </p>
              <p className="text-[11px] text-text-muted">{item.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </SlideLayout>
    );
  }

  return (
    <SlideLayout gradient={SLIDE_THEMES["non-imposable"].background}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1"
      >
        <motion.span
          className="inline-block size-1.5 rounded-full bg-green"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          {t("nonTax.badge")}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-[16px] font-bold text-text-primary"
      >
        {t("nonTax.title")}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 w-full max-w-[240px]"
      >
        <Button
          onClick={onReset}
          className="h-11 w-full rounded-[10px] text-[13px] font-semibold"
        >
          {t("nonTax.redoOther")}
        </Button>
      </motion.div>
    </SlideLayout>
  );
}
