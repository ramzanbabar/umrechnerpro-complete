/**
 * Magnetic units conversion library for UmrechnerPro
 * Magnetic flux and magnetic flux density
 */

// ============ MAGNETIC FLUX ============
export type MagneticFluxUnit = 
  | 'Wb'       // Weber
  | 'mWb'      // Milliweber
  | 'µWb'      // Microweber
  | 'Mx'       // Maxwell
  | 'V·s';     // Volt-second

export const magneticFluxToWb: Record<MagneticFluxUnit, number> = {
  'Wb': 1,
  'mWb': 0.001,
  'µWb': 1e-6,
  'Mx': 1e-8,      // Maxwell = 10⁻⁸ Wb
  'V·s': 1,        // Volt-second = Weber
};

export function convertMagneticFlux(
  value: number,
  from: MagneticFluxUnit,
  to: MagneticFluxUnit
): number {
  if (from === to) return value;
  const inWb = value * magneticFluxToWb[from];
  return inWb / magneticFluxToWb[to];
}

// ============ MAGNETIC FLUX DENSITY ============
export type MagneticFluxDensityUnit = 
  | 'T'        // Tesla
  | 'mT'       // Millitesla
  | 'µT'       // Microtesla
  | 'nT'       // Nanotesla
  | 'G'        // Gauss
  | 'mG'       // Milligauss
  | 'µG'       // Microgauss
  | 'γ';       // Gamma (= 1 nT)

export const magneticFluxDensityToT: Record<MagneticFluxDensityUnit, number> = {
  'T': 1,
  'mT': 0.001,
  'µT': 1e-6,
  'nT': 1e-9,
  'G': 1e-4,       // Gauss = 10⁻⁴ Tesla
  'mG': 1e-7,
  'µG': 1e-10,
  'γ': 1e-9,       // Gamma = 1 nT
};

export function convertMagneticFluxDensity(
  value: number,
  from: MagneticFluxDensityUnit,
  to: MagneticFluxDensityUnit
): number {
  if (from === to) return value;
  const inT = value * magneticFluxDensityToT[from];
  return inT / magneticFluxDensityToT[to];
}

/**
 * Common magnetic field reference values
 */
export const magneticFieldReferenceValues = [
  { source: 'Erdmagnetfeld', value_nT: 50000, description: 'Stärke auf der Erdoberfläche' },
  { source: 'Kühlschrankmagnet', value_mT: 5, description: 'Typische Stärke' },
  { source: 'MRI Scanner', value_T: 1.5, description: 'Medizinische Bildgebung' },
  { source: 'Neodym-Magnet', value_T: 1.25, description: 'Starke Dauermagnete' },
];
