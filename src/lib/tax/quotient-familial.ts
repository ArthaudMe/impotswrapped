export type SituationFamiliale = "celibataire" | "couple";

/**
 * Compute the number of parts fiscales.
 * - Celibataire: 1 part
 * - Couple: 2 parts
 * - First two children: +0.5 part each
 * - Third child onward: +1 part each
 * - Special: single parent with at least one child gets +0.5 bonus
 */
export function computePartsFiscales(
  situation: SituationFamiliale,
  enfants: number
): number {
  let parts = situation === "couple" ? 2 : 1;

  if (enfants >= 1) parts += 0.5;
  if (enfants >= 2) parts += 0.5;
  if (enfants >= 3) parts += enfants - 2; // +1 per child from 3rd onward

  // Single parent bonus
  if (situation === "celibataire" && enfants >= 1) {
    parts += 0.5;
  }

  return parts;
}
