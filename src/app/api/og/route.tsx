import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { decodeParams } from "@/lib/share/encode-params";
import { calculateTax } from "@/lib/tax/calculator";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const encoded = searchParams.get("r");

  let taxAmount = "???";
  let tauxEffectif = "?%";

  if (encoded) {
    const input = decodeParams(encoded);
    if (input) {
      const result = calculateTax(input);
      taxAmount = result.impotNet.toLocaleString("fr-FR") + " \u20ac";
      tauxEffectif = (result.tauxEffectif * 100).toFixed(1) + "%";
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1b4b, #312e81, #1e1b4b)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>
          {"\ud83c\uddeb\ud83c\uddf7"}
        </div>
        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            marginBottom: "24px",
            backgroundImage:
              "linear-gradient(90deg, #f0f0f2, #0a84ff, #f0f0f2)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Impots Wrapped 2025
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          {taxAmount}
        </div>
        <div style={{ fontSize: "32px", color: "#a5b4fc" }}>
          Taux effectif : {tauxEffectif}
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#818cf8",
            marginTop: "32px",
          }}
        >
          Decouvrez ou vont vos impots
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
