/**
 * French payroll contributions (cotisations salariales) + CSG/CRDS
 * Applied to salaire brut to derive net imposable and total prelevements.
 */

/** Cotisations salariales: ~22% of brut (retraite, chomage, maladie, etc.) */
export const TAUX_COTISATIONS_SALARIALES = 0.22;

/** CSG rate: 9.2% on 98.25% of brut */
export const TAUX_CSG = 0.092;

/** CRDS rate: 0.5% on 98.25% of brut */
export const TAUX_CRDS = 0.005;

/** CSG deductible rate: 6.8% on 98.25% of brut (used for net imposable) */
export const TAUX_CSG_DEDUCTIBLE = 0.068;

/** Assiette CSG/CRDS: 98.25% of brut */
export const ASSIETTE_CSG_CRDS = 0.9825;

export interface CotisationsResult {
  cotisationsSalariales: number;
  csg: number;
  crds: number;
  csgDeductible: number;
  revenuNetImposable: number;
  salaireNet: number;
}

export function computeCotisations(salaireBrut: number): CotisationsResult {
  const cotisationsSalariales = Math.round(salaireBrut * TAUX_COTISATIONS_SALARIALES);
  const assiette = salaireBrut * ASSIETTE_CSG_CRDS;
  const csg = Math.round(assiette * TAUX_CSG);
  const crds = Math.round(assiette * TAUX_CRDS);
  const csgDeductible = Math.round(assiette * TAUX_CSG_DEDUCTIBLE);

  const salaireNet = salaireBrut - cotisationsSalariales;
  const revenuNetImposable = salaireBrut - cotisationsSalariales - csgDeductible;

  return {
    cotisationsSalariales,
    csg,
    crds,
    csgDeductible,
    revenuNetImposable: Math.max(0, revenuNetImposable),
    salaireNet: Math.max(0, salaireNet),
  };
}
