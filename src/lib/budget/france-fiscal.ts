/**
 * French fiscal macro-data for 2025.
 * Sources: PLF 2025, INSEE, Banque de France
 */

/** Central government budget (budget de l'Etat) in billions of euros */
export const BUDGET_2025 = {
  depenses: 492, // Md€ - depenses du budget general
  recettes: 360, // Md€ - recettes nettes
  deficit: 132, // Md€ - deficit budgetaire
} as const;

/** National debt */
export const DETTE_PUBLIQUE = {
  total: 3_300_000_000_000, // 3 300 Md€ fin 2025 (estimation)
  population: 68_400_000, // population metropolitaine + DOM
  perPersonne: 48_246, // dette par habitant (arrondi)
  enPctPIB: 112, // % du PIB
  depuisAnnee: 1975, // France n'a pas eu de budget a l'equilibre depuis 1975
  /** 132 Md€ deficit / 31 557 600 seconds in a year ≈ 4 183 €/s */
  deficitPerSecond: Math.round(132_000_000_000 / 31_557_600),
} as const;

/** Sub-breakdown of Protection sociale (per 1000€ allocated to it) */
export interface SousCategorie {
  label: string;
  per1000: number;
  color: string;
}

export const PROTECTION_SOCIALE_DETAIL: SousCategorie[] = [
  { label: "Retraites et pensions", per1000: 440, color: "#E63946" },
  { label: "Assurance maladie", per1000: 310, color: "#F4845F" },
  { label: "Famille et enfance", per1000: 90, color: "#F4A261" },
  { label: "Chomage", per1000: 80, color: "#E76F51" },
  { label: "Logement et pauvrete", per1000: 50, color: "#BC4749" },
  { label: "Autres prestations", per1000: 30, color: "#A4243B" },
];

/**
 * Compute sub-category amounts from the total protection sociale amount
 */
export function computeProtectionSocialeDetail(
  totalProtectionSociale: number
): { label: string; amount: number; color: string; per1000: number }[] {
  return PROTECTION_SOCIALE_DETAIL.map((sub) => ({
    ...sub,
    amount: Math.round((totalProtectionSociale * sub.per1000) / 1000),
  }));
}
