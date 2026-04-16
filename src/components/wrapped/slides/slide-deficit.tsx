"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/slide-layout";
import { formatNumber } from "@/lib/utils";
import { BUDGET_2025 } from "@/lib/budget/france-fiscal";
import { useT } from "@/lib/i18n/context";

export function SlideDeficit() {
  const { t } = useT();
  const [titleLine1, titleLine2] = t("deficit.title").split("\n");
  return (
    <SlideLayout gradient="from-[#0c0c0f] via-[#111118] to-[#0c0c0f]">
      <motion.h2
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[20px] font-bold leading-tight tracking-tight text-text-primary"
      >
        {titleLine1}
        <br />
        {titleLine2}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-1 text-[12.5px] italic text-text-muted"
      >
        {t("deficit.subtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 w-full max-w-[260px] space-y-3"
      >
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="flex items-center gap-2.5"
        >
          <span className="mono-number rounded-[5px] bg-[rgba(255,69,58,0.10)] px-2.5 py-1 text-[14px] font-bold text-[#ff453a]">
            {formatNumber(BUDGET_2025.depenses)} Md&euro;
          </span>
          <span className="text-[12.5px] text-text-muted">{t("deficit.spending")}</span>
        </motion.div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="flex items-center gap-2.5"
        >
          <span className="text-[12.5px] text-text-muted">&minus;</span>
          <span className="mono-number rounded-[5px] bg-[rgba(48,209,88,0.10)] px-2.5 py-1 text-[14px] font-bold text-[#30d158]">
            {formatNumber(BUDGET_2025.recettes)} Md&euro;
          </span>
          <span className="text-[12.5px] text-text-muted">{t("deficit.revenue")}</span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
          className="h-px w-full origin-left bg-border-subtle"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 180 }}
          className="relative flex items-center gap-2.5"
        >
          {/* Pulse glow behind deficit */}
          <motion.div
            className="absolute -inset-2 -z-10 rounded-lg bg-[rgba(255,69,58,0.06)]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="mono-number rounded-[5px] bg-[rgba(255,69,58,0.10)] px-2.5 py-1 text-[14px] font-bold text-[#ff453a]">
            {formatNumber(BUDGET_2025.deficit)} Md&euro;
          </span>
          <span className="text-[12.5px] font-semibold text-text-primary">
            {t("deficit.deficit")}
          </span>
        </motion.div>
      </motion.div>
    </SlideLayout>
  );
}
