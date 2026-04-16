"use client";

import { motion } from "framer-motion";
import type { CategoryBreakdown } from "@/lib/budget/compute-breakdown";

interface DonutChartProps {
  data: CategoryBreakdown[];
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabels?: boolean;
}

export function DonutChart({
  data,
  size = 200,
  strokeWidth = 28,
  className,
  showLabels = true,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const segments = data.reduce<{ item: CategoryBreakdown; cumulativePercent: number }[]>(
    (acc, item) => {
      const prev = acc.length > 0 ? acc[acc.length - 1].cumulativePercent + acc[acc.length - 1].item.percentage / 100 : 0;
      acc.push({ item, cumulativePercent: prev });
      return acc;
    },
    []
  );

  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto"
      >
        {segments.map(({ item, cumulativePercent }, index) => {
          const percent = item.percentage / 100;
          const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
          const rotation = cumulativePercent * 360 - 90;

          return (
            <motion.circle
              key={item.category.id}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.category.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${center} ${center})`}
              initial={{
                opacity: 0,
                strokeDashoffset: circumference * percent,
              }}
              animate={{ opacity: 1, strokeDashoffset: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          );
        })}
      </svg>
      {showLabels && (
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 px-1">
          {data.slice(0, 6).map((item) => (
            <div key={item.category.id} className="flex items-center gap-1.5">
              <span
                className="inline-block size-2 rounded-sm shrink-0"
                style={{ backgroundColor: item.category.color }}
              />
              <span className="truncate text-[10px] text-text-muted">
                {item.category.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
