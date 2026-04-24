import type { TaxInput } from "../tax/calculator";
import type { FocusCategoryId } from "../budget/preferences";

export type { FocusCategoryId };

// ============================================================================
// BACKWARD-COMPATIBLE API (keep existing callers working)
// ============================================================================

/**
 * Backward-compatible encode: returns base64("salaireBrut|situation|enfants")
 * @deprecated Use encodePayload with SharePayload instead for new features
 */
export function encodeParams(input: TaxInput): string {
  const data = `${input.salaireBrut}|${input.situation}|${input.enfants}`;
  return btoa(data);
}

/**
 * Backward-compatible decode: returns TaxInput | null
 * @deprecated Use decodePayload for richer data or decodeLegacyParams for classic mode only
 */
export function decodeParams(encoded: string): TaxInput | null {
  return decodeLegacyParams(encoded);
}

/**
 * Decode a legacy-style encoded string (salaireBrut|situation|enfants)
 * Returns TaxInput for classic mode compatibility
 */
export function decodeLegacyParams(encoded: string): TaxInput | null {
  try {
    const data = atob(encoded);
    const parts = data.split("|");
    if (parts.length !== 3) {
      return null;
    }
    const [brutStr, situation, enfantsStr] = parts;
    const brut = Number(brutStr);
    const enfants = Number(enfantsStr);
    if (
      isNaN(brut) ||
      isNaN(enfants) ||
      (situation !== "celibataire" && situation !== "couple")
    ) {
      return null;
    }
    return {
      salaireBrut: brut,
      situation: situation as "celibataire" | "couple",
      enfants,
    };
  } catch {
    return null;
  }
}

// ============================================================================
// NEW TYPED CONTRACT FOR PREFERENCE MODE (forward-compatible)
// ============================================================================

const VERSION = "v2";

export type InteractionMode = "classic" | "preference";

export interface PreferenceValues {
  retraites: number;
  sante: number;
  education: number;
  administration: number;
  defense: number;
  dette: number;
}

export interface SharePayload {
  version: typeof VERSION;
  mode: InteractionMode;
  tax: TaxInput;
  preferences?: PreferenceValues;
}

export function makeClassicPayload(tax: TaxInput): SharePayload {
  return { version: VERSION, mode: "classic", tax };
}

export function makePreferencePayload(
  tax: TaxInput,
  preferences: PreferenceValues
): SharePayload {
  return { version: VERSION, mode: "preference", tax, preferences };
}

export function encodePayload(payload: SharePayload): string {
  const data = JSON.stringify(payload);
  return btoa(data);
}

/**
 * Decode a modern SharePayload from base64
 */
export function decodePayload(encoded: string): SharePayload | null {
  try {
    const data = atob(encoded);
    const payload: unknown = JSON.parse(data);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("version" in payload) ||
      !("mode" in payload) ||
      !("tax" in payload)
    ) {
      return null;
    }

    const payloadTyped = payload as Record<string, unknown>;

    if (payloadTyped.version !== VERSION) {
      return null;
    }

    if (payloadTyped.mode !== "classic" && payloadTyped.mode !== "preference") {
      return null;
    }

    const tax = payloadTyped.tax as Partial<TaxInput>;
    if (
      typeof tax.salaireBrut !== "number" ||
      typeof tax.enfants !== "number" ||
      typeof tax.situation !== "string" ||
      !["celibataire", "couple"].includes(tax.situation) ||
      isNaN(tax.salaireBrut) ||
      isNaN(tax.enfants)
    ) {
      return null;
    }

    const taxInput: TaxInput = {
      salaireBrut: tax.salaireBrut,
      situation: tax.situation,
      enfants: tax.enfants,
    };

    if (payloadTyped.mode === "preference") {
      const prefs = payloadTyped.preferences as Record<string, number> | undefined;
      if (!prefs) {
        return null;
      }

      const focusIds: FocusCategoryId[] = [
        "retraites",
        "sante",
        "education",
        "administration",
        "defense",
        "dette",
      ];

      for (const id of focusIds) {
        if (typeof prefs[id] !== "number" || isNaN(prefs[id])) {
          return null;
        }
      }

      return {
        version: VERSION,
        mode: "preference",
        tax: taxInput,
        preferences: {
          retraites: prefs.retraites,
          sante: prefs.sante,
          education: prefs.education,
          administration: prefs.administration,
          defense: prefs.defense,
          dette: prefs.dette,
        },
      };
    }

    return { version: VERSION, mode: "classic", tax: taxInput };
  } catch {
    return null;
  }
}

export function getTaxInput(payload: SharePayload): TaxInput {
  return payload.tax;
}
