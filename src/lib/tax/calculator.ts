import {
  TAX_BRACKETS_2025,
  PLAFONNEMENT_PER_HALF_PART,
  DECOTE,
} from "./brackets";
import {
  computePartsFiscales,
  type SituationFamiliale,
} from "./quotient-familial";
import { computeCotisations } from "./cotisations";

export interface TaxInput {
  salaireBrut: number;
  situation: SituationFamiliale;
  enfants: number;
}

export interface TaxResult {
  // Cotisations
  salaireBrut: number;
  cotisationsSalariales: number;
  csg: number;
  crds: number;
  revenuNetImposable: number;
  salaireNet: number;

  // IR
  impotBrut: number;
  impotNet: number;
  decoteApplied: number;
  plafonnementApplied: boolean;

  // Totals
  totalPrelevements: number;
  tauxEffectif: number;
  partsFiscales: number;
  isNonImposable: boolean;
  coutJournalier: number;
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
  const { salaireBrut, situation, enfants } = input;
  const parts = computePartsFiscales(situation, enfants);

  if (salaireBrut <= 0) {
    return {
      salaireBrut: 0,
      cotisationsSalariales: 0,
      csg: 0,
      crds: 0,
      revenuNetImposable: 0,
      salaireNet: 0,
      impotBrut: 0,
      impotNet: 0,
      decoteApplied: 0,
      plafonnementApplied: false,
      totalPrelevements: 0,
      tauxEffectif: 0,
      partsFiscales: parts,
      isNonImposable: true,
      coutJournalier: 0,
    };
  }

  // Step 1: Compute cotisations, CSG, CRDS, derive revenu net imposable
  const cotis = computeCotisations(salaireBrut);

  // Step 2: Compute IR on revenu net imposable
  const { revenuNetImposable } = cotis;
  const baseParts = situation === "couple" ? 2 : 1;
  const additionalHalfParts = (parts - baseParts) * 2;

  const quotient = revenuNetImposable / parts;
  const taxWithParts = computeTaxPerPart(quotient) * parts;

  const baseQuotient = revenuNetImposable / baseParts;
  const taxWithBaseParts = computeTaxPerPart(baseQuotient) * baseParts;

  const maxBenefit = additionalHalfParts * PLAFONNEMENT_PER_HALF_PART;
  const actualBenefit = taxWithBaseParts - taxWithParts;
  const plafonnementApplied = actualBenefit > maxBenefit;
  let impotBrut = plafonnementApplied
    ? taxWithBaseParts - maxBenefit
    : taxWithParts;

  impotBrut = Math.max(0, impotBrut);

  const decoteConfig =
    situation === "couple" ? DECOTE.couple : DECOTE.single;
  let decoteApplied = 0;
  if (impotBrut > 0 && impotBrut < decoteConfig.threshold) {
    decoteApplied = decoteConfig.coefficient - impotBrut * 0.4525;
    decoteApplied = Math.max(0, Math.min(decoteApplied, impotBrut));
  }

  const impotNet = Math.max(0, Math.round(impotBrut - decoteApplied));

  // Step 3: Total prelevements = cotisations + CSG + CRDS + IR
  const totalPrelevements =
    cotis.cotisationsSalariales + cotis.csg + cotis.crds + impotNet;

  const tauxEffectif =
    salaireBrut > 0 ? totalPrelevements / salaireBrut : 0;
  const isNonImposable = salaireBrut <= 0;
  const coutJournalier = totalPrelevements / 365;

  return {
    salaireBrut,
    cotisationsSalariales: cotis.cotisationsSalariales,
    csg: cotis.csg,
    crds: cotis.crds,
    revenuNetImposable: cotis.revenuNetImposable,
    salaireNet: cotis.salaireNet,
    impotBrut: Math.round(impotBrut),
    impotNet,
    decoteApplied: Math.round(decoteApplied),
    plafonnementApplied,
    totalPrelevements,
    tauxEffectif,
    partsFiscales: parts,
    isNonImposable,
    coutJournalier,
  };
}
