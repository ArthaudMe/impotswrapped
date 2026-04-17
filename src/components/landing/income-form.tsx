"use client";

import { TaxInputFields } from "./tax-input-fields";
import type { TaxInput } from "@/lib/tax/calculator";

interface IncomeFormProps {
  onSubmit: (input: TaxInput) => void;
  initialValues?: TaxInput;
}

export function IncomeForm({ onSubmit, initialValues }: IncomeFormProps) {
  return <TaxInputFields onSubmit={onSubmit} initialValues={initialValues} />;
}