"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShimmerText } from "@/components/shared/shimmer-text";
import {
  computePartsFiscales,
  type SituationFamiliale,
} from "@/lib/tax/quotient-familial";
import type { TaxInput } from "@/lib/tax/calculator";

interface IncomeFormProps {
  onSubmit: (input: TaxInput) => void;
  initialValues?: TaxInput;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function IncomeForm({ onSubmit, initialValues }: IncomeFormProps) {
  const [revenu, setRevenu] = useState(
    initialValues?.revenuNetImposable?.toString() ?? ""
  );
  const [situation, setSituation] = useState<SituationFamiliale>(
    initialValues?.situation ?? "celibataire"
  );
  const [enfants, setEnfants] = useState(initialValues?.enfants ?? 0);

  const parts = computePartsFiscales(situation, enfants);

  const formatRevenuDisplay = (val: string) => {
    const num = val.replace(/\D/g, "");
    if (!num) return "";
    return Number(num).toLocaleString("fr-FR");
  };

  const handleRevenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setRevenu(raw);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const amount = Number(revenu);
      if (isNaN(amount) || amount < 0) return;
      onSubmit({ revenuNetImposable: amount, situation, enfants });
    },
    [revenu, situation, enfants, onSubmit]
  );

  return (
    <motion.form
      variants={stagger}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      className="w-full space-y-5"
    >
      {/* Revenue input - glass card */}
      <motion.div variants={fadeUp} className="glass-card px-5 py-4">
        <label
          htmlFor="revenu"
          className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted"
        >
          Revenu net imposable
        </label>
        <div className="mt-2 flex items-baseline gap-1">
          <input
            id="revenu"
            type="text"
            inputMode="numeric"
            value={formatRevenuDisplay(revenu)}
            onChange={handleRevenuChange}
            placeholder="30 000"
            className="mono-number w-full border-0 bg-transparent text-[28px] font-bold text-text-primary outline-none placeholder:text-text-muted/30"
            required
          />
          <span className="mono-number text-[14px] font-medium text-text-muted">
            &euro;
          </span>
        </div>
        <p className="mt-2 text-[10px] text-text-muted">
          Case 1AJ de votre declaration
        </p>
      </motion.div>

      {/* Situation toggle */}
      <motion.div variants={fadeUp} className="space-y-2">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Situation
        </span>
        <div className="inline-flex rounded-[20px] border border-border-subtle p-0.5">
          {(["celibataire", "couple"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSituation(s)}
              className={`rounded-[16px] px-5 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                situation === s
                  ? "bg-[rgba(255,255,255,0.08)] text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {s === "celibataire" ? "Celibataire" : "Couple"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Children stepper */}
      <motion.div variants={fadeUp} className="space-y-2">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Enfants a charge
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setEnfants(Math.max(0, enfants - 1))}
            disabled={enfants === 0}
            className="flex size-10 items-center justify-center rounded-[10px] border border-border-subtle text-base font-medium text-text-secondary transition-colors hover:border-border-hover disabled:opacity-30"
          >
            &minus;
          </button>
          <motion.span
            key={enfants}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mono-number w-6 text-center text-[24px] font-bold"
          >
            {enfants}
          </motion.span>
          <button
            type="button"
            onClick={() => setEnfants(Math.min(10, enfants + 1))}
            disabled={enfants === 10}
            className="flex size-10 items-center justify-center rounded-[10px] border border-border-subtle text-base font-medium text-text-secondary transition-colors hover:border-border-hover disabled:opacity-30"
          >
            +
          </button>
          <motion.span
            key={`parts-${parts}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-border-subtle px-2.5 py-0.5 text-[10px] font-semibold text-text-muted"
          >
            {parts} {parts > 1 ? "parts" : "part"}
          </motion.span>
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp}>
        <Button
          type="submit"
          className="h-11 w-full rounded-[10px] text-[13px] font-semibold"
        >
          Voir mon <ShimmerText className="from-white via-[#0a84ff] to-white">Impots Wrapped</ShimmerText>
        </Button>
      </motion.div>
    </motion.form>
  );
}
