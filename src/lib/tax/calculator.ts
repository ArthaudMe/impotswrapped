import {
  TAX_BRACKETS_2025,
  PLAFONNEMENT_PER_HALF_PART,
  DECOTE,
} from "./brackets";
import {
  computePartsFiscales,
  type SituationFamiliale,
} from "./quotient-familial";

export interface TaxInput {
  revenuNetImposable: number;
  situation: SituationFamiliale;
  enfants: number;
}

export interface TaxResult {
  impotBrut: number;
  impotNet: number;
  tauxEffectif: number;
  partsFiscales: number;
  isNonImposable: boolean;
  coutJournalier: number;
  decoteApplied: number;
  plafonnementApplied: boolean;
}

/** Calculate tax on income per single part (quotient) */
function computeTaxPerPart(quotient: number): number {
  let tax = 0;
  for (const bracket of TAX_BRACKETS_2025) {
    const max = bracket.max ?? Infinity;
    if (quotient <= bracket.min) break;
    const taxable = Math.min(quotient, max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

export function calculateTax(input: TaxInput): TaxResult {
  const { revenuNetImposable, situation, enfants } = input;

  if (revenuNetImposable <= 0) {
    return {
      impotBrut: 0,
      impotNet: 0,
      tauxEffectif: 0,
      partsFiscales: computePartsFiscales(situation, enfants),
      isNonImposable: true,
      coutJournalier: 0,
      decoteApplied: 0,
      plafonnementApplied: false,
    };
  }

  const parts = computePartsFiscales(situation, enfants);
  const baseParts = situation === "couple" ? 2 : 1;
  const additionalHalfParts = (parts - baseParts) * 2; // number of half-parts

  // Tax with all parts (quotient familial)
  const quotient = revenuNetImposable / parts;
  const taxWithParts = computeTaxPerPart(quotient) * parts;

  // Tax with base parts only (for plafonnement)
  const baseQuotient = revenuNetImposable / baseParts;
  const taxWithBaseParts = computeTaxPerPart(baseQuotient) * baseParts;

  // Plafonnement: the benefit of additional half-parts is capped
  const maxBenefit = additionalHalfParts * PLAFONNEMENT_PER_HALF_PART;
  const actualBenefit = taxWithBaseParts - taxWithParts;
  const plafonnementApplied = actualBenefit > maxBenefit;
  let impotBrut = plafonnementApplied
    ? taxWithBaseParts - maxBenefit
    : taxWithParts;

  impotBrut = Math.max(0, impotBrut);

  // Decote
  const decoteConfig =
    situation === "couple" ? DECOTE.couple : DECOTE.single;
  let decoteApplied = 0;
  if (impotBrut > 0 && impotBrut < decoteConfig.threshold) {
    decoteApplied = decoteConfig.coefficient - impotBrut * 0.4525;
    decoteApplied = Math.max(0, Math.min(decoteApplied, impotBrut));
  }

  const impotNet = Math.max(0, Math.round(impotBrut - decoteApplied));
  const tauxEffectif =
    revenuNetImposable > 0 ? impotNet / revenuNetImposable : 0;
  const isNonImposable = impotNet === 0;
  const coutJournalier = impotNet / 365;

  return {
    impotBrut: Math.round(impotBrut),
    impotNet,
    tauxEffectif,
    partsFiscales: parts,
    isNonImposable,
    coutJournalier,
    decoteApplied: Math.round(decoteApplied),
    plafonnementApplied,
  };
}
