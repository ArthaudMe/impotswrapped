export interface SlideTheme {
  background: string;
  accent: string;
}

// francetdb-inspired dark slide palettes
export const SLIDE_THEMES: Record<string, SlideTheme> = {
  intro: {
    background: "from-[#0c0c0f] via-[#111118] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  "tax-reveal": {
    background: "from-[#0c0c0f] via-[#0f0f1a] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  "daily-cost": {
    background: "from-[#0c0c0f] via-[#1a0f0f] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  breakdown: {
    background: "from-[#0c0c0f] via-[#111118] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  retraites: {
    background: "from-[#0c0c0f] via-[#1a0e0e] to-[#0c0c0f]",
    accent: "text-[#ff453a]",
  },
  sante: {
    background: "from-[#0c0c0f] via-[#1a1210] to-[#0c0c0f]",
    accent: "text-[#e8924b]",
  },
  education: {
    background: "from-[#0c0c0f] via-[#0e1218] to-[#0c0c0f]",
    accent: "text-[#0a84ff]",
  },
  administration: {
    background: "from-[#0c0c0f] via-[#0e1614] to-[#0c0c0f]",
    accent: "text-[#3dc9a8]",
  },
  defense: {
    background: "from-[#0c0c0f] via-[#12121a] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.55)]",
  },
  dette: {
    background: "from-[#0c0c0f] via-[#161616] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  comparisons: {
    background: "from-[#0c0c0f] via-[#0f1018] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  finale: {
    background: "from-[#0c0c0f] via-[#111118] to-[#0c0c0f]",
    accent: "text-[rgba(255,255,255,0.45)]",
  },
  "non-imposable": {
    background: "from-[#0c0c0f] via-[#0e1610] to-[#0c0c0f]",
    accent: "text-[#30d158]",
  },
};
