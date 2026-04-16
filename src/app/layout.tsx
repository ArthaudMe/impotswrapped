import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Impots Wrapped 2025 - Decouvrez ou vont vos impots",
  description:
    "Visualisez comment chaque euro de vos impots est depense par l'Etat francais. 100% prive, vos donnees ne quittent jamais votre navigateur.",
  openGraph: {
    title: "Impots Wrapped 2025 - Decouvrez ou vont vos impots",
    description:
      "Visualisez comment chaque euro de vos impots est depense par l'Etat francais.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impots Wrapped 2025",
    description:
      "Visualisez comment chaque euro de vos impots est depense par l'Etat francais.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0c0c0f] text-[#f0f0f2]">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
