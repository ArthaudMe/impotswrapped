"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatEuro } from "@/lib/utils";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";
import { useT } from "@/lib/i18n/context";
import { getCatTranslation } from "@/lib/i18n/translations";

interface BarChartProps {
  data: CategoryBreakdown[];
  className?: string;
  compact?: boolean;
  showAmounts?: boolean;
  adjustedTargets?: Record<string, number>;
}

export function BarChart({
  data,
  className,
  compact = false,
  showAmounts = false,
  adjustedTargets,
}: BarChartProps) {
  const { t, locale } = useT();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Use percentages as the comparison basis (both actual and targets are %)
  const maxActual = Math.max(...data.map((d) => d.percentage));
  const maxTarget = adjustedTargets
    ? Math.max(...Object.values(adjustedTargets))
    : 0;

  // Expand scale if adjusted targets exceed max actual
  const maxScale = Math.max(maxActual, maxTarget);

  return (
    <div className={className}>
      <div className="w-full space-y-2">
        {data.map((item, i) => {
          const actualWidthPercent = (item.percentage / maxScale) * 100;
          const targetWidthPercent =
            adjustedTargets && adjustedTargets[item.category.id] !== undefined
              ? (adjustedTargets[item.category.id] / maxScale) * 100
              : 0;
          const isActive = activeIndex === i;
          const nature = item.category.nature;

          return (
            <motion.div
              key={item.category.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="group cursor-pointer"
              onPointerEnter={() => setActiveIndex(i)}
              onPointerLeave={() => setActiveIndex(null)}
              onTouchStart={() =>
                setActiveIndex((prev) => (prev === i ? null : i))
              }
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {!compact && (
                    <span className="text-[12px]">{item.category.emoji}</span>
                  )}
                  <span className="text-[11px] text-text-secondary">
                    {getCatTranslation(item.category.id, "label", locale) || item.category.label}
                  </span>
                  {nature && !compact && (
                    <span
                      className={`inline-block size-1 rounded-full ${
                        nature === "investissement"
                          ? "bg-[#30d158]"
                          : "bg-[#ff453a]"
                      }`}
                      title={
                        nature === "investissement"
                          ? t("category.investment")
                          : t("category.expense")
                      }
                    />
                  )}
                </div>
                {showAmounts ? (
                  <span className="mono-number text-[10px] font-semibold text-text-muted">
                    {formatEuro(item.amount)}
                  </span>
                ) : (
                  <motion.span
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 8 }}
                    transition={{ duration: 0.15 }}
                    className="mono-number text-[11px] font-semibold text-text-primary"
                  >
                    {formatEuro(item.amount)}
                  </motion.span>
                )}
              </div>

               <div className="relative h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.04)]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: item.category.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${actualWidthPercent}%` }}
                  transition={{
                    delay: 0.25 + i * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/10"
                    initial={{ width: 0 }}
                    animate={{ width: `${actualWidthPercent}%` }}
                    transition={{ duration: 0.15 }}
                  />
                )}
                {targetWidthPercent > 0 && (
                  <div
                    className="absolute inset-y-0 rounded-full border-2 border-white/40"
                    style={{ width: `${targetWidthPercent}%` }}
                  />
                )}
              </div>

              {!compact && (
                <motion.p
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden text-[10px] text-text-muted"
                >
                  <span className="mt-0.5 block">
                    {item.percentage.toFixed(1)}% — {getCatTranslation(item.category.id, "desc", locale) || item.category.description}
                  </span>
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-1">
            <span className="inline-block size-1.5 rounded-full bg-[#30d158]" />
            <span className="text-[9px] text-text-muted">{t("category.investment")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block size-1.5 rounded-full bg-[#ff453a]" />
            <span className="text-[9px] text-text-muted">{t("category.expense")}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
