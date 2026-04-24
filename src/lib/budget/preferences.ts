/**
 * Tolerance threshold for floating-point comparisons
 */
export const TOLERANCE = 0.001;

/**
 * Type alias for focus category IDs (the 6 non-"autres" categories)
 */
export type FocusCategoryId =
  | "retraites"
  | "sante"
  | "education"
  | "administration"
  | "defense"
  | "dette";

/**
 * Returns the 6 focus category IDs (excludes "autres-*" categories)
 */
export function getFocusCategories(): FocusCategoryId[] {
  return ["retraites", "sante", "education", "administration", "defense", "dette"];
}

/**
 * Returns the 2 "autres" category IDs
 */
export function getOtherCategories(): string[] {
  return ["autres-investissement", "autres-depense"];
}

/**
 * Sum all percentage values from a numeric preference array
 * @param preferences - Array of numeric preference percentages
 * @returns Sum of all percentage values
 */
export function sumPreferencePercentages(preferences: number[]): number {
  return preferences.reduce((sum, value) => sum + value, 0);
}

/**
 * Check if a total is valid (within TOLERANCE of 100)
 * @param total - The total percentage to validate
 * @returns true if total is within TOLERANCE of 100
 */
export function isValidTotal(total: number): boolean {
  return Math.abs(total - 100) <= TOLERANCE;
}

/**
 * Compute the Other share from a breakdown by summing "autres-*" categories
 * Returns the share as a decimal fraction (e.g., 0.28 for 28%)
 * @param breakdown - Array of CategoryBreakdown items (category is a BudgetCategory object)
 * @returns The combined percentage of Other categories as a decimal fraction
 */
export function computeOtherShare(breakdown: { category: { id: string }; percentage: number }[]): number {
  const otherIds = getOtherCategories();
  const totalPercentage = breakdown
    .filter(item => otherIds.includes(item.category.id))
    .reduce((sum, item) => sum + item.percentage, 0);
  return totalPercentage / 100;
}

/**
 * Adjust preference percentages by scaling them down to exclude Other share.
 * This creates a comparable basis against actual percentages for focus categories.
 *
 * Math: adjusted = raw * (1 - otherShare)
 * When otherShare = 0.28 (28%), raw preferences sum to 100%, but we scale to 72%
 * so focus category percentages can be compared directly.
 *
 * @param rawPreferences - Original preference percentages (sum to ~100)
 * @param otherShare - The Other category share as decimal (e.g., 0.28 for 28%)
 * @returns Adjusted preference percentages for focus categories only
 */
export function adjustPreferencesForOther(
  rawPreferences: Record<string, number>,
  otherShare: number
): Record<FocusCategoryId, number> {
  const scale = 1 - otherShare;
  const result: Record<FocusCategoryId, number> = {} as Record<FocusCategoryId, number>;
  const focusIds = getFocusCategories();

  for (const id of focusIds) {
    result[id] = (rawPreferences[id] ?? 0) * scale;
  }

  return result;
}

/**
 * Compute deviation between actual percentages and adjusted preference percentages
 * delta = actual - adjustedPreference
 * Positive delta means actual spending is higher than user preference
 * Negative delta means actual spending is lower than user preference
 *
 * @param actualPercentages - Map of category to actual percentage from compute-breakdown
 * @param adjustedPreferences - Adjusted preference percentages (already scaled)
 * @returns Array of ComparisonModel objects with category, actual %, adjusted %, and delta
 */
export function computeDeviations(
  actualPercentages: Record<string, number>,
  adjustedPreferences: Record<FocusCategoryId, number>
): ComparisonModel[] {
  const focusIds = getFocusCategories();
  const results: ComparisonModel[] = [];

  for (const id of focusIds) {
    const actual = actualPercentages[id] ?? 0;
    const adjusted = adjustedPreferences[id] ?? 0;
    const delta = actual - adjusted;

    results.push({
      category: id,
      actualPercent: actual,
      adjustedPercent: adjusted,
      delta: delta,
    });
  }

  return results;
}

/**
 * Model for comparing actual spending against adjusted preferences
 */
export interface ComparisonModel {
  /** Focus category ID */
  category: FocusCategoryId;
  /** Actual percentage from budget breakdown */
  actualPercent: number;
  /** Adjusted preference percentage (scaled to exclude Other) */
  adjustedPercent: number;
  /** Deviation: actual - adjustedPreference */
  delta: number;
}
