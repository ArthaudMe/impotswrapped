export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export const TAX_BRACKETS_2025: TaxBracket[] = [
  { min: 0, max: 11_294, rate: 0 },
  { min: 11_294, max: 28_797, rate: 0.11 },
  { min: 28_797, max: 82_341, rate: 0.30 },
  { min: 82_341, max: 177_106, rate: 0.41 },
  { min: 177_106, max: null, rate: 0.45 },
];

/** Maximum benefit per additional half-part (plafonnement du quotient familial) */
export const PLAFONNEMENT_PER_HALF_PART = 1_759;

/** Decote thresholds for 2025 */
export const DECOTE = {
  single: { threshold: 1_929, coefficient: 873 },
  couple: { threshold: 3_191, coefficient: 1_444 },
} as const;
