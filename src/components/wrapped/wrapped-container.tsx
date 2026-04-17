"use client";

import { useCallback, useMemo } from "react";
import { useWrappedState } from "@/lib/hooks/use-wrapped-state";
import { useSwipe } from "@/lib/hooks/use-swipe";
import { useKeyboardNav } from "@/lib/hooks/use-keyboard-nav";
import { computeBreakdown } from "@/lib/budget/compute-breakdown";
import {
  computeOtherShare,
  adjustPreferencesForOther,
  computeDeviations,
} from "@/lib/budget/preferences";
import { encodePayload, makeClassicPayload, makePreferencePayload, type PreferenceValues } from "@/lib/share/encode-params";
import { useT } from "@/lib/i18n/context";
import { ProgressBar } from "./progress-bar";
import { SlideRenderer } from "./slide-renderer";
import { SlideIntro } from "./slides/slide-intro";
import { SlideTaxTotal } from "./slides/slide-tax-total";
import { SlideDailyCost } from "./slides/slide-daily-cost";
import { SlideBreakdown } from "./slides/slide-breakdown";
import { SlideCategory } from "./slides/slide-category";
import { SlideDetteInterest } from "./slides/slide-dette-interest";
import { SlideDeficit } from "./slides/slide-deficit";
import { SlideDebt } from "./slides/slide-debt";
import { SlideComparison } from "./slides/slide-comparison";
import { SlideFinale } from "./slides/slide-finale";
import { SlideNonImposable } from "./slides/slide-non-imposable";
import { SlidePercentile } from "./slides/slide-percentile";
import type { TaxResult, TaxInput } from "@/lib/tax/calculator";

type InteractionMode = "classic" | "preference";

interface WrappedContainerProps {
  result: TaxResult;
  input: TaxInput;
  preferences: PreferenceValues | null;
  interactionMode: InteractionMode;
  onReset: () => void;
}

export function WrappedContainer({
  result,
  input,
  preferences,
  interactionMode,
  onReset,
}: WrappedContainerProps) {
  const { t } = useT();
  const breakdown = useMemo(
    () => computeBreakdown(result.totalPrelevements),
    [result.totalPrelevements]
  );

  const isNonImposable = result.isNonImposable;

  // 6 focused categories (skip "autres-*" buckets)
  const focusCategories = useMemo(
    () => breakdown.filter((b) => !b.category.id.startsWith("autres")),
    [breakdown]
  );

  // Prepare preference-aware comparison model for preference mode
  const preferenceData = useMemo(() => {
    // Classic mode or no preferences → no comparison data
    if (interactionMode !== "preference" || !preferences) {
      return null;
    }

    // Step 1: Compute Other share from actual breakdown
    const otherShare = computeOtherShare(breakdown);

    // Step 2: Build explicit plain object for 6 focus categories (type-safe)
    const rawPreferenceMap: Record<string, number> = {
      retraites: preferences.retraites,
      sante: preferences.sante,
      education: preferences.education,
      administration: preferences.administration,
      defense: preferences.defense,
      dette: preferences.dette,
    };

    // Step 3: Adjust preferences to exclude Other share
    const adjustedPreferences = adjustPreferencesForOther(
      rawPreferenceMap,
      otherShare
    );

    // Step 4: Build actual % map from focus categories
    const actualPercentages: Record<string, number> = {};
    for (const item of breakdown) {
      if (!item.category.id.startsWith("autres")) {
        actualPercentages[item.category.id] = item.percentage;
      }
    }

    // Step 5: Compute deviations (the comparison model)
    const comparisonModel = computeDeviations(actualPercentages, adjustedPreferences);

    // Compute total delta magnitude for summary
    const totalDeltaMagnitude = comparisonModel.reduce(
      (sum, item) => sum + Math.abs(item.delta),
      0
    );

    return {
      otherShare,
      adjustedPreferences,
      actualPercentages,
      comparisonModel,
      totalDeltaMagnitude,
    };
  }, [breakdown, interactionMode, preferences]);

  const detteItem = breakdown.find((b) => b.category.id === "dette");

  // Slide order:
  // 0: Intro
  // 1: Tax total
  // 2: Percentile
  // 3: Daily cost
  // 4: Bar overview
  // 5..5+5: 6 category slides (retraites, sante, education, admin, defense, dette-interest)
  // 11: Deficit
  // 12: National debt
  // 13: Comparisons
  // 14: Finale
  const totalSlides = isNonImposable
    ? 3
    : 5 + focusCategories.length + 4;

  const { currentSlide, next, prev } = useWrappedState(totalSlides);
  const swipeHandlers = useSwipe(next, prev);
  useKeyboardNav(next, prev);

  const handleShare = useCallback(async () => {
    let encoded: string;
    
    if (interactionMode === "preference" && preferences) {
      const payload = makePreferencePayload(input, preferences);
      encoded = encodePayload(payload);
    } else {
      const payload = makeClassicPayload(input);
      encoded = encodePayload(payload);
    }
    
    const url = `${window.location.origin}?r=${encoded}`;
    const shareData = {
      title: t("share.title"),
      text: `${t("share.text")} ${(result.tauxEffectif * 100).toFixed(1)}%`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }, [input, result.tauxEffectif, interactionMode, preferences, t]);

  const handleTapNav = useCallback(
    (e: React.MouseEvent) => {
      // Don't navigate if tapping a button
      if ((e.target as HTMLElement).closest("button")) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 3) prev();
      else next();
    },
    [next, prev]
  );

  function renderSlide() {
    if (isNonImposable) {
      return (
        <SlideNonImposable
          slideIndex={currentSlide as 0 | 1 | 2}
          onReset={onReset}
        />
      );
    }

    let idx = 0;

    if (currentSlide === idx++) return <SlideIntro />;
    if (currentSlide === idx++) return <SlideTaxTotal result={result} />;
    if (currentSlide === idx++)
      return <SlidePercentile revenuNetImposable={result.revenuNetImposable} />;
    if (currentSlide === idx++) return <SlideDailyCost result={result} />;
    if (currentSlide === idx++) {
      const adjustedTargets = preferenceData?.comparisonModel.reduce(
        (acc, item) => {
          acc[item.category] = item.adjustedPercent;
          return acc;
        },
        {} as Record<string, number>
      );
      return <SlideBreakdown breakdown={breakdown} totalTax={result.totalPrelevements} adjustedTargets={adjustedTargets} />;
    }

    // Guard for preference mode: show loading/empty state if comparison data not ready
    if (interactionMode === "preference" && !preferenceData) {
      return <div className="flex h-full items-center justify-center text-text-secondary">Loading...</div>;
    }

    // 6 category slides — use special debt interest slide for "dette"
    const catStart = idx;
    if (currentSlide < catStart + focusCategories.length) {
      const catItem = focusCategories[currentSlide - catStart];
      if (catItem.category.id === "dette") {
        return (
          <SlideDetteInterest
            breakdown={breakdown}
            detteAmount={detteItem?.amount ?? 0}
          />
        );
      }
      // Find comparison data for this category in preference mode
      const catComparison = preferenceData?.comparisonModel.find(
        (c) => c.category === catItem.category.id
      );
      return <SlideCategory item={catItem} preferenceComparison={catComparison} />;
    }
    idx = catStart + focusCategories.length;

    if (currentSlide === idx++) return <SlideDeficit />;
    if (currentSlide === idx++) return <SlideDebt />;
    if (currentSlide === idx++)
      return <SlideComparison breakdown={breakdown} />;

    return (
      <SlideFinale
        result={result}
        breakdown={breakdown}
        onShare={handleShare}
        onReset={onReset}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      {...swipeHandlers}
      onClick={handleTapNav}
    >
      <div className="safe-top z-10 px-3 pt-3 pb-2">
        <ProgressBar total={totalSlides} current={currentSlide} />
      </div>

      <div className="relative flex-1 overflow-hidden">
        <SlideRenderer slideKey={`slide-${currentSlide}`}>
          {renderSlide()}
        </SlideRenderer>
      </div>

      {/* Bottom safe area */}
      <div className="safe-bottom" />
    </div>
  );
}
