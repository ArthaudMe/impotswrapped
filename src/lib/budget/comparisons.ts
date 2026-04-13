export interface FunComparison {
  categoryId: string;
  item: string;
  unitPrice: number;
}

export const FUN_COMPARISONS: FunComparison[] = [
  { categoryId: "retraites", item: "croissants au beurre", unitPrice: 1.2 },
  { categoryId: "sante", item: "boites de doliprane", unitPrice: 2.18 },
  { categoryId: "education", item: "manuels scolaires", unitPrice: 15 },
  { categoryId: "administration", item: "timbres postaux", unitPrice: 1.56 },
  { categoryId: "defense", item: "baguettes tradition", unitPrice: 1.5 },
  { categoryId: "dette", item: "cafes en terrasse", unitPrice: 2.5 },
  { categoryId: "autres-investissement", item: "tickets de metro", unitPrice: 2.15 },
];

export function getComparisonForCategory(categoryId: string) {
  return FUN_COMPARISONS.find((c) => c.categoryId === categoryId);
}

export function computeComparison(amount: number, unitPrice: number): number {
  return Math.floor(amount / unitPrice);
}
