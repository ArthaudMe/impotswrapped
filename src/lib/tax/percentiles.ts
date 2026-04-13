/**
 * French income tax distribution (revenus 2025, source: DGFiP).
 * Each entry: [revenu net imposable threshold, percentile from bottom].
 * E.g. [15000, 50] means 50% of taxpayers earn <= 15,000€.
 * We store from bottom → top so we can binary-search upward.
 */
const INCOME_DISTRIBUTION: [number, number][] = [
  [0, 0],
  [10000, 40],
  [15000, 50],
  [20000, 58],
  [25000, 65],
  [30000, 72],
  [35000, 78],
  [40000, 82],
  [50000, 88],
  [60000, 92],
  [75000, 95],
  [100000, 97.5],
  [150000, 99],
  [200000, 99.5],
  [300000, 99.8],
  [500000, 99.95],
];

/**
 * Returns the approximate percentile (0-100) for a given revenu net imposable.
 * E.g. 85 means "you earn more than 85% of French taxpayers" (top 15%).
 */
export function getIncomePercentile(revenuNetImposable: number): number {
  if (revenuNetImposable <= 0) return 0;

  for (let i = INCOME_DISTRIBUTION.length - 1; i >= 0; i--) {
    const [threshold, percentile] = INCOME_DISTRIBUTION[i];
    if (revenuNetImposable >= threshold) {
      // Interpolate to next bracket if available
      if (i < INCOME_DISTRIBUTION.length - 1) {
        const [nextThreshold, nextPercentile] = INCOME_DISTRIBUTION[i + 1];
        const ratio =
          (revenuNetImposable - threshold) / (nextThreshold - threshold);
        return Math.min(
          100,
          percentile + ratio * (nextPercentile - percentile)
        );
      }
      return percentile;
    }
  }
  return 0;
}

/**
 * Returns a human-readable ranking string, e.g. "top 12%".
 */
export function getPercentileLabel(percentile: number): string {
  const top = Math.max(0.1, 100 - percentile);
  if (top >= 1) return `top ${Math.round(top)}%`;
  return `top ${top.toFixed(1)}%`;
}
