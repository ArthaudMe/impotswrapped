"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerText } from "@/components/shared/shimmer-text";
import { Hero } from "@/components/landing/hero";
import { IncomeForm } from "@/components/landing/income-form";
import { PreferenceForm } from "@/components/landing/preference-form";
import { PrivacyBadge } from "@/components/landing/privacy-badge";
import { InteractionModeSelector } from "@/components/landing/interaction-mode-selector";
import { WrappedContainer } from "@/components/wrapped/wrapped-container";
import {
  calculateTax,
  type TaxInput,
  type TaxResult,
} from "@/lib/tax/calculator";
import {
  decodePayload,
  decodeLegacyParams,
  type SharePayload,
  type PreferenceValues,
} from "@/lib/share/encode-params";
import { useT } from "@/lib/i18n/context";

type AppMode = "landing" | "form" | "wrapped";

const pageVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function getInitialSharePayload(): SharePayload | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("r");
  if (encoded) {
    const decoded = decodePayload(encoded);
    if (decoded) {
      window.history.replaceState({}, "", window.location.pathname);
      return decoded;
    }
    const legacy = decodeLegacyParams(encoded);
    if (legacy) {
      window.history.replaceState({}, "", window.location.pathname);
      return { version: "v2", mode: "classic", tax: legacy };
    }
  }
  return null;
}

const subscribe = () => () => {};
const emptySnapshot = () => null as SharePayload | null;

export default function Home() {
  const { t } = useT();
  const sharePayload = useSyncExternalStore(subscribe, getInitialSharePayload, emptySnapshot);
  
  const [mode, setMode] = useState<AppMode>(() => sharePayload ? "wrapped" : "landing");
  
  const [interactionMode, setInteractionMode] = useState<"classic" | "preference">(() =>
    sharePayload?.mode ?? "preference"
  );
  
  const [taxInput, setTaxInput] = useState<TaxInput | null>(() =>
    sharePayload?.tax ?? null
  );
  
  const [taxResult, setTaxResult] = useState<TaxResult | null>(() =>
    sharePayload ? calculateTax(sharePayload.tax) : null
  );
  
  const [preferences, setPreferences] = useState<PreferenceValues | null>(() =>
    sharePayload?.mode === "preference" && sharePayload.preferences 
      ? sharePayload.preferences 
      : null
  );

  const handleStart = () => setMode("form");

  const handleClassicSubmit = (input: TaxInput) => {
    const result = calculateTax(input);
    setTaxInput(input);
    setTaxResult(result);
    setPreferences(null);
    setMode("wrapped");
  };

  const handlePreferenceSubmit = (
    input: TaxInput,
    prefs: PreferenceValues
  ) => {
    const result = calculateTax(input);
    setTaxInput(input);
    setTaxResult(result);
    setPreferences(prefs);
    setMode("wrapped");
  };

  const handleReset = () => {
    setMode("form");
    setTaxResult(null);
    setPreferences(null);
    // Keep interactionMode as-is to preserve current context
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
          preferences={preferences}
          interactionMode={interactionMode}
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
                  {t("form.title")}
                </h2>
                <p className="mt-1 text-[11px] text-text-muted">
                  {t("form.subtitle")}
                </p>
              </div>
              <InteractionModeSelector
                mode={interactionMode}
                onChange={setInteractionMode}
              />
              <AnimatePresence mode="wait">
                {interactionMode === "classic" && (
                  <motion.div
                    key="classic-form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IncomeForm
                      onSubmit={handleClassicSubmit}
                      initialValues={taxInput ?? undefined}
                    />
                  </motion.div>
                )}
                {interactionMode === "preference" && (
                  <motion.div
                    key="preference-form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PreferenceForm
                      onSubmit={handlePreferenceSubmit}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
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
          {t("footer")}
        </p>
      </motion.footer>
    </div>
  );
}
