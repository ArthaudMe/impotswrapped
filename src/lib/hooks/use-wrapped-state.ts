"use client";

import { useState, useCallback } from "react";

export function useWrappedState(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  const reset = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  return {
    currentSlide,
    next,
    prev,
    goTo,
    reset,
    isFirst: currentSlide === 0,
    isLast: currentSlide === totalSlides - 1,
    progress: totalSlides > 1 ? currentSlide / (totalSlides - 1) : 0,
  };
}
