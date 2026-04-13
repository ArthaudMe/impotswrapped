import { BUDGET_CATEGORIES, type BudgetCategory } from "./allocation";

export interface CategoryBreakdown {
  category: BudgetCategory;
  amount: number;
  percentage: number;
}

export function computeBreakdown(totalTax: number): CategoryBreakdown[] {
  return BUDGET_CATEGORIES.map((category) => ({
    category,
    amount: Math.round((totalTax * category.per1000) / 1000),
    percentage: category.per1000 / 10, // per1000 / 10 = percentage
  }));
}
