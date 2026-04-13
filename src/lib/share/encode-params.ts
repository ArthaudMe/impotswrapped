import type { TaxInput } from "../tax/calculator";

export function encodeParams(input: TaxInput): string {
  const data = `${input.revenuNetImposable}|${input.situation}|${input.enfants}`;
  return btoa(data);
}

export function decodeParams(encoded: string): TaxInput | null {
  try {
    const data = atob(encoded);
    const [revenuStr, situation, enfantsStr] = data.split("|");
    const revenu = Number(revenuStr);
    const enfants = Number(enfantsStr);
    if (
      isNaN(revenu) ||
      isNaN(enfants) ||
      (situation !== "celibataire" && situation !== "couple")
    ) {
      return null;
    }
    return {
      revenuNetImposable: revenu,
      situation,
      enfants,
    };
  } catch {
    return null;
  }
}
