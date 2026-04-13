"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerText } from "@/components/shared/shimmer-text";
import { Hero } from "@/components/landing/hero";
import { IncomeForm } from "@/components/landing/income-form";
import { PrivacyBadge } from "@/components/landing/privacy-badge";
import { WrappedContainer } from "@/components/wrapped/wrapped-container";
import {
  calculateTax,
  type TaxInput,
  type TaxResult,
} from "@/lib/tax/calculator";
import { decodeParams } from "@/lib/share/encode-params";

type AppMode = "landing" | "form" | "wrapped";

const pageVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Home() {
  const [mode, setMode] = useState<AppMode>("landing");
  const [taxInput, setTaxInput] = useState<TaxInput | null>(null);
  const [taxResult, setTaxResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("r");
    if (encoded) {
      const decoded = decodeParams(encoded);
      if (decoded) {
        const result = calculateTax(decoded);
        setTaxInput(decoded);
        setTaxResult(result);
        setMode("wrapped");
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  const handleStart = () => setMode("form");

  const handleSubmit = (input: TaxInput) => {
    const result = calculateTax(input);
    setTaxInput(input);
    setTaxResult(result);
    setMode("wrapped");
  };

  const handleReset = () => {
    setMode("form");
    setTaxResult(null);
  };

  if (mode === "wrapped" && taxResult && taxInput) {
    return (
      <motion.div
        key="wrapped"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WrappedContainer
          result={taxResult}
          input={taxInput}
          onReset={handleReset}
        />
      </motion.div>
    );
  }

  return (
    <div className="mobile-shell flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-2.5 px-5 pt-5 pb-4"
      >
        <div className="flex h-4 w-0.5 gap-px overflow-hidden rounded-full">
          <div className="w-full bg-[#0a84ff]" />
        </div>
        <ShimmerText className="text-[13px] font-semibold tracking-tight">
          Impots Wrapped
        </ShimmerText>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          2025
        </span>
      </motion.header>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        className="mx-5 h-px origin-left bg-border-subtle"
      />

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-10">
        <AnimatePresence mode="wait">
          {mode === "landing" && (
            <motion.div
              key="landing"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <Hero onStart={handleStart} />
              <PrivacyBadge />
            </motion.div>
          )}

          {mode === "form" && (
            <motion.div
              key="form"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full space-y-6"
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold tracking-tight">
                  Vos informations
                </h2>
                <p className="mt-1 text-[11px] text-text-muted">
                  Tout reste sur votre appareil.
                </p>
              </div>
              <IncomeForm
                onSubmit={handleSubmit}
                initialValues={taxInput ?? undefined}
              />
              <div className="flex justify-center">
                <PrivacyBadge />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-5 pb-5 safe-bottom"
      >
        <p className="text-center text-[10px] text-text-muted">
          Site non officiel · Calculs indicatifs · Bareme 2025
        </p>
      </motion.footer>
    </div>
  );
}
