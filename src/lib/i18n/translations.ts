export type Locale = "fr" | "en";

const translations = {
  // Landing
  "hero.badge": { fr: "Revenus 2025", en: "Income 2025" },
  "hero.title": { fr: "Decouvrez ou vont\nvos impots", en: "Discover where\nyour taxes go" },
  "hero.subtitle": { fr: "Entrez votre revenu, on calcule et on vous montre tout.", en: "Enter your income, we calculate and show you everything." },
  "hero.cta": { fr: "Commencer", en: "Get started" },
  "privacy": { fr: "100% prive — rien ne quitte votre appareil", en: "100% private — nothing leaves your device" },
  "form.title": { fr: "Vos informations", en: "Your information" },
  "form.subtitle": { fr: "Tout reste sur votre appareil.", en: "Everything stays on your device." },
  "form.income.label": { fr: "Revenu net imposable", en: "Net taxable income" },
  "form.income.hint": { fr: "Case 1AJ de votre declaration", en: "Box 1AJ of your tax return" },
  "form.situation": { fr: "Situation", en: "Status" },
  "form.single": { fr: "Celibataire", en: "Single" },
  "form.couple": { fr: "Couple", en: "Couple" },
  "form.children": { fr: "Enfants a charge", en: "Dependents" },
  "form.parts": { fr: "parts", en: "shares" },
  "form.part": { fr: "part", en: "share" },
  "form.submit": { fr: "Voir mon", en: "See my" },
  "footer": { fr: "Site non officiel · Calculs indicatifs · Bareme 2025", en: "Unofficial site · Indicative calculations · 2025 rates" },

  // Intro slide
  "intro.your": { fr: "Votre", en: "Your" },

  // Tax total slide
  "tax.in2025": { fr: "En 2025, vous avez paye", en: "In 2025, you paid" },
  "tax.incomeTax": { fr: "d'impot sur le revenu", en: "in income tax" },
  "tax.effectiveRate": { fr: "taux effectif", en: "effective rate" },

  // Percentile slide
  "percentile.among": { fr: "Parmi les contribuables francais", en: "Among French taxpayers" },
  "percentile.youEarnMore": { fr: "Vous gagnez plus que", en: "You earn more than" },
  "percentile.ofHouseholds": { fr: "des foyers fiscaux", en: "of tax households" },
  "percentile.you": { fr: "Vous", en: "You" },

  // Daily cost slide
  "daily.everyDay": { fr: "Chaque jour, vous contribuez", en: "Every day, you contribute" },
  "daily.toCountry": { fr: "au fonctionnement du pays", en: "to running the country" },
  "daily.perMonth": { fr: "par mois", en: "per month" },
  "daily.thatsAlso": { fr: "Soit", en: "That's" },

  // Breakdown slide
  "breakdown.whereGo": { fr: "Ou vont vos", en: "Where do your" },
  "breakdown.questionMark": { fr: "?", en: "go?" },

  // Category slide
  "category.investment": { fr: "Investissement", en: "Investment" },
  "category.expense": { fr: "Depense", en: "Expense" },
  "category.ofYourTaxes": { fr: "de vos impots", en: "of your taxes" },
  "category.thatsAlso": { fr: "Soit", en: "That's" },

  // Dette interest slide
  "dette.youContributed": { fr: "Vous avez contribue", en: "You contributed" },
  "dette.toInterest": { fr: "aux interets de la dette.", en: "to debt interest payments." },
  "dette.noRoads": { fr: "Ni routes.", en: "No roads." },
  "dette.noSchools": { fr: "Ni ecoles.", en: "No schools." },
  "dette.noDefense": { fr: "Ni defense.", en: "No defense." },
  "dette.justInterest": { fr: "Juste des interets.", en: "Just interest." },
  "dette.explanation": {
    fr: "Les interets ne financent rien. C'est le prix de l'argent emprunte par l'Etat.",
    en: "Interest payments fund nothing. It's the price of money borrowed by the state.",
  },

  // Deficit slide
  "deficit.title": { fr: "L'Etat a depense plus\nqu'il n'a gagne.", en: "The state spent more\nthan it earned." },
  "deficit.subtitle": { fr: "Beaucoup plus.", en: "Much more." },
  "deficit.spending": { fr: "depenses", en: "spending" },
  "deficit.revenue": { fr: "recettes", en: "revenue" },
  "deficit.deficit": { fr: "deficit", en: "deficit" },

  // Debt slide
  "debt.thisDeficit": { fr: "Ce deficit ?", en: "This deficit?" },
  "debt.itAddsUp": {
    fr: "Il s'ajoute a la dette nationale, qui s'accumule depuis",
    en: "It adds to the national debt, which has been accumulating since",
  },
  "debt.nationalDebt": { fr: "La dette publique", en: "National debt" },
  "debt.perCapita": { fr: "par habitant", en: "per capita" },
  "debt.ofGDP": { fr: "du PIB", en: "of GDP" },

  // Comparison slide
  "comparison.title": { fr: "Vos impots, c'est aussi...", en: "Your taxes are also..." },

  // Finale slide
  "finale.recap": { fr: "Recap 2025", en: "Recap 2025" },
  "finale.effectiveRate": { fr: "Taux effectif :", en: "Effective rate:" },
  "finale.share": { fr: "Partager", en: "Share" },
  "finale.redo": { fr: "Refaire", en: "Redo" },

  // Non-imposable slides
  "nonTax.goodNews": { fr: "Bonne nouvelle !", en: "Good news!" },
  "nonTax.notTaxable": {
    fr: "Vous n'etes pas imposable sur le revenu en 2025.",
    en: "You don't owe any income tax in 2025.",
  },
  "nonTax.butYouContribute": {
    fr: "Mais vous contribuez quand meme",
    en: "But you still contribute",
  },
  "nonTax.vatDesc": { fr: "20% sur chaque achat", en: "20% on every purchase" },
  "nonTax.csgDesc": { fr: "9,7% sur vos revenus", en: "9.7% on your income" },
  "nonTax.localDesc": { fr: "Taxe fonciere, etc.", en: "Property tax, etc." },
  "nonTax.badge": { fr: "Non imposable", en: "Non-taxable" },
  "nonTax.title": { fr: "Non imposable 2025", en: "Non-taxable 2025" },
  "nonTax.redoOther": {
    fr: "Refaire avec un autre revenu",
    en: "Try with a different income",
  },

  // Share
  "share.title": { fr: "Mon Impots Wrapped 2025", en: "My Impots Wrapped 2025" },
  "share.text": { fr: "Decouvrez ou vont mes impots ! Taux effectif :", en: "Discover where my taxes go! Effective rate:" },

  // Categories
  "cat.retraites.label": { fr: "Retraites", en: "Pensions" },
  "cat.retraites.desc": { fr: "Pensions de retraite et minimum vieillesse", en: "Retirement pensions and elderly benefits" },
  "cat.retraites.reason": { fr: "Transfert social, ne genere pas de richesse future", en: "Social transfer, does not generate future wealth" },
  "cat.sante.label": { fr: "Sante", en: "Healthcare" },
  "cat.sante.desc": { fr: "Assurance maladie, hopitaux, medicaments", en: "Health insurance, hospitals, medication" },
  "cat.sante.reason": { fr: "Investir dans la sante, c'est investir dans la productivite", en: "Investing in health is investing in productivity" },
  "cat.education.label": { fr: "Education", en: "Education" },
  "cat.education.desc": { fr: "Ecoles, universites, bourses", en: "Schools, universities, scholarships" },
  "cat.education.reason": { fr: "Capital humain : chaque euro forme les talents de demain", en: "Human capital: every euro trains tomorrow's talent" },
  "cat.administration.label": { fr: "Administration", en: "Public admin" },
  "cat.administration.desc": { fr: "Fonctionnement de l'Etat et des collectivites", en: "State and local government operations" },
  "cat.administration.reason": { fr: "Cout de fonctionnement, pas de retour productif direct", en: "Operating cost, no direct productive return" },
  "cat.defense.label": { fr: "Defense", en: "Defense" },
  "cat.defense.desc": { fr: "Armee, equipements militaires, operations", en: "Military, equipment, operations" },
  "cat.defense.reason": { fr: "Protege la souverainete et soutient l'industrie nationale", en: "Protects sovereignty and supports domestic industry" },
  "cat.dette.label": { fr: "Interets de la dette", en: "Debt interest" },
  "cat.dette.desc": { fr: "Charge des interets de la dette publique", en: "Public debt interest payments" },
  "cat.dette.reason": { fr: "Cout pur : ne finance rien, ne construit rien", en: "Pure cost: funds nothing, builds nothing" },
  "cat.autres-investissement.label": { fr: "Autres (investissement)", en: "Other (investment)" },
  "cat.autres-investissement.desc": { fr: "Transports, recherche, environnement, infrastructures, culture", en: "Transport, research, environment, infrastructure, culture" },
  "cat.autres-investissement.reason": { fr: "Investissements dans les infrastructures, la recherche et la transition ecologique", en: "Investments in infrastructure, research and ecological transition" },
  "cat.autres-depense.label": { fr: "Autres (depense)", en: "Other (expense)" },
  "cat.autres-depense.desc": { fr: "Securite, justice, transferts divers, outre-mer", en: "Security, justice, various transfers, overseas territories" },
  "cat.autres-depense.reason": { fr: "Depenses de fonctionnement et transferts courants", en: "Operating expenses and current transfers" },

  // Non-imposable tax names
  "nonTax.vat": { fr: "TVA", en: "VAT" },
  "nonTax.csg": { fr: "CSG / CRDS", en: "CSG / CRDS" },
  "nonTax.localTaxes": { fr: "Taxes locales", en: "Local taxes" },

  // Comparisons
  "comp.retraites": { fr: "croissants au beurre", en: "butter croissants" },
  "comp.sante": { fr: "boites de doliprane", en: "boxes of paracetamol" },
  "comp.education": { fr: "manuels scolaires", en: "textbooks" },
  "comp.administration": { fr: "timbres postaux", en: "postage stamps" },
  "comp.defense": { fr: "baguettes tradition", en: "baguettes" },
  "comp.dette": { fr: "cafes en terrasse", en: "cafe coffees" },
  "comp.autres-investissement": { fr: "tickets de metro", en: "metro tickets" },
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(key: TranslationKey, locale: Locale): string {
  return translations[key][locale];
}

export function getCatTranslation(
  id: string,
  field: "label" | "desc" | "reason",
  locale: Locale
): string {
  const key = `cat.${id}.${field}` as TranslationKey;
  const entry = translations[key];
  return entry ? entry[locale] : "";
}

export function getCompTranslation(id: string, locale: Locale): string {
  const key = `comp.${id}` as TranslationKey;
  const entry = translations[key];
  return entry ? entry[locale] : "";
}
