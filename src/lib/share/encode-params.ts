import type { TaxInput } from "../tax/calculator";

export function encodeParams(input: TaxInput): string {
  const data = `${input.salaireBrut}|${input.situation}|${input.enfants}`;
  return btoa(data);
}

export function decodeParams(encoded: string): TaxInput | null {
  try {
    const data = atob(encoded);
    const [brutStr, situation, enfantsStr] = data.split("|");
    const brut = Number(brutStr);
    const enfants = Number(enfantsStr);
    if (
      isNaN(brut) ||
      isNaN(enfants) ||
      (situation !== "celibataire" && situation !== "couple")
    ) {
      return null;
    }
    return {
      salaireBrut: brut,
      situation,
      enfants,
    };
  } catch {
    return null;
  }
}
