"use client";

import { useT } from "@/lib/i18n/context";

type InteractionMode = "classic" | "preference";

interface InteractionModeSelectorProps {
  mode: InteractionMode;
  onChange: (mode: InteractionMode) => void;
}

export function InteractionModeSelector({ mode, onChange }: InteractionModeSelectorProps) {
  const { t } = useT();

  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {t("mode.select.label")}
      </label>
      <div className="inline-flex rounded-[20px] border border-border-subtle p-0.5">
        {(["classic", "preference"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            className={`rounded-[16px] px-5 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all ${
              mode === m
                ? "bg-[rgba(255,255,255,0.08)] text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {t(`mode.${m}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
