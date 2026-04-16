"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  type Locale,
  type TranslationKey,
  getTranslation,
} from "./translations";

interface I18nContextValue {
  locale: Locale;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  t: (key) => getTranslation(key, "fr"),
});

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "fr";
  const lang = navigator.language || "";
  if (lang.startsWith("fr")) return "fr";
  return "en";
}

const subscribe = () => () => {};
const getSnapshot = () => detectLocale();
const getServerSnapshot = (): Locale => "fr";

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const t = (key: TranslationKey) => getTranslation(key, locale);

  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  return useContext(I18nContext);
}
