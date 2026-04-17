"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ShimmerText } from "@/components/shared/shimmer-text";
import { useT } from "@/lib/i18n/context";
import { Slider } from "@/components/ui/slider";
import { TaxInputPrimitives } from "./tax-input-fields";
import {
  getFocusCategories,
  sumPreferencePercentages,
  isValidTotal,
  type FocusCategoryId,
} from "@/lib/budget/preferences";
import type { TaxInput } from "@/lib/tax/calculator";
import { computePartsFiscales, type SituationFamiliale } from "@/lib/tax/quotient-familial";

interface PreferenceFormProps {
  onSubmit: (taxInput: TaxInput, preferences: Record<FocusCategoryId, number>) => void;
}

const categories: FocusCategoryId[] = getFocusCategories();

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function PreferenceForm({ onSubmit }: PreferenceFormProps) {
  const { t } = useT();
  const [revenu, setRevenu] = useState("");
  const [situation, setSituation] = useState<SituationFamiliale>("celibataire");
  const [enfants, setEnfants] = useState(0);
  const [preferences, setPreferences] = useState<Record<FocusCategoryId, number>>(
    () =>
      categories.reduce((acc, id) => {
        acc[id] = 0;
        return acc;
      }, {} as Record<FocusCategoryId, number>)
  );

  const parts = computePartsFiscales(situation, enfants);

  const total = sumPreferencePercentages(categories.map((id) => preferences[id]));
  const isValid = isValidTotal(total);

  const handleSliderChange = (category: FocusCategoryId, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const amount = Number(revenu);
    if (isNaN(amount) || amount < 0) return;
    onSubmit({ salaireBrut: amount, situation, enfants }, preferences);
  };

  return (
    <motion.form
      variants={stagger}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      className="w-full space-y-5"
    >
      <motion.div variants={fadeUp}>
        <TaxInputPrimitives
          revenu={revenu}
          setRevenu={setRevenu}
          situation={situation}
          setSituation={setSituation}
          enfants={enfants}
          setEnfants={setEnfants}
          parts={parts}
        />
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-1">
        <h2 className="text-[16px] font-semibold text-text-primary">
          {t("pref.heading")}
        </h2>
        <p className="text-[11px] text-text-muted">{t("pref.helper")}</p>
      </motion.div>

      {categories.map((category, index) => (
        <motion.div
          key={category}
          variants={fadeUp}
          className="glass-card px-4 py-3"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-text-primary">
              {t(`cat.${category}.label`)}
            </span>
            <span className="mono-number text-[12px] font-semibold text-text-primary">
              {preferences[category]}%
            </span>
          </div>

          <div className="relative h-10 flex items-center">
            <Slider
              value={[preferences[category]]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) =>
                handleSliderChange(category, Array.isArray(values) ? values[0] : values)
              }
              className="w-full"
            />
          </div>

          <div className="flex justify-between">
            <span className="mono-number text-[10px] text-text-muted">0%</span>
            <span className="mono-number text-[10px] text-text-muted">100%</span>
          </div>
        </motion.div>
      ))}

      <motion.div variants={fadeUp} className="glass-card px-4 py-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-text-muted">
            {t("pref.totalLabel")}
          </span>
          <span
            className={`mono-number text-[24px] font-bold ${
              isValid ? "text-text-primary" : "text-error"
            }`}
          >
            {total.toFixed(1)}%
          </span>
        </div>

        {!isValid && (
          <p className="text-[10px] text-error">{t("pref.totalError")}</p>
        )}
      </motion.div>

      <motion.div variants={fadeUp}>
        <Button
          type="submit"
          disabled={!isValid}
          className="h-11 w-full rounded-[10px] text-[13px] font-semibold"
        >
          {t("form.submit")}{" "}
          <ShimmerText className="from-white via-[#0a84ff] to-white">
            Impots Wrapped
          </ShimmerText>
        </Button>
      </motion.div>
    </motion.form>
  );
}
