export type SpendingNature = "investissement" | "depense";

export interface BudgetCategory {
  id: string;
  label: string;
  per1000: number;
  emoji: string;
  color: string;
  description: string;
  nature?: SpendingNature;
  natureReason?: string;
}

/**
 * 6 focus categories + "Autres" bucket.
 * Per 1000€ of taxes (source: economie.gouv.fr)
 */
export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: "retraites",
    label: "Retraites",
    per1000: 268,
    emoji: "👴",
    color: "#E63946",
    description: "Pensions de retraite et minimum vieillesse",
    nature: "depense",
    natureReason: "Transfert social, ne genere pas de richesse future",
  },
  {
    id: "sante",
    label: "Sante",
    per1000: 196,
    emoji: "🏥",
    color: "#F4845F",
    description: "Assurance maladie, hopitaux, medicaments",
    nature: "investissement",
    natureReason: "Investir dans la sante, c'est investir dans la productivite",
  },
  {
    id: "education",
    label: "Education",
    per1000: 88,
    emoji: "📚",
    color: "#457B9D",
    description: "Ecoles, universites, bourses",
    nature: "investissement",
    natureReason: "Capital humain : chaque euro forme les talents de demain",
  },
  {
    id: "administration",
    label: "Administration",
    per1000: 66,
    emoji: "🏛️",
    color: "#2A9D8F",
    description: "Fonctionnement de l'Etat et des collectivites",
    nature: "depense",
    natureReason: "Cout de fonctionnement, pas de retour productif direct",
  },
  {
    id: "defense",
    label: "Defense",
    per1000: 51,
    emoji: "🛡️",
    color: "#6C757D",
    description: "Armee, equipements militaires, operations",
    nature: "investissement",
    natureReason: "Protege la souverainete et soutient l'industrie nationale",
  },
  {
    id: "dette",
    label: "Interets de la dette",
    per1000: 51,
    emoji: "📊",
    color: "#264653",
    description: "Charge des interets de la dette publique",
    nature: "depense",
    natureReason: "Cout pur : ne finance rien, ne construit rien",
  },
  {
    id: "autres-investissement",
    label: "Autres (investissement)",
    per1000: 134,
    emoji: "🌱",
    color: "#6EE7B7",
    description: "Transports, recherche, environnement, infrastructures, culture",
    nature: "investissement",
    natureReason: "Investissements dans les infrastructures, la recherche et la transition ecologique",
  },
  {
    id: "autres-depense",
    label: "Autres (depense)",
    per1000: 146,
    emoji: "📦",
    color: "#9CA3AF",
    description: "Securite, justice, transferts divers, outre-mer",
    nature: "depense",
    natureReason: "Depenses de fonctionnement et transferts courants",
  },
];
