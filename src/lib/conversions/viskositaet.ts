/**
 * Viscosity conversion library for UmrechnerPro
 * Both dynamic and kinematic viscosity
 */

// ============ DYNAMIC VISCOSITY ============
export type DynamicViscosityUnit = 
  | 'Pa·s'     // Pascal-second
  | 'mPa·s'    // Millipascal-second
  | 'µPa·s'    // Micropascal-second
  | 'cP'       // Centipoise
  | 'P'        // Poise
  | 'dyn·s/cm²' // Dyne-second per square centimeter
  | 'lbf·s/ft²' // Pound-force second per square foot
  | 'lb/(ft·s)'; // Pound per foot second

export const dynamicViscosityToPaS: Record<DynamicViscosityUnit, number> = {
  'Pa·s': 1,
  'mPa·s': 0.001,
  'µPa·s': 1e-6,
  'cP': 0.001,              // Centipoise = mPa·s
  'P': 0.1,                 // Poise
  'dyn·s/cm²': 0.1,         // Same as Poise
  'lbf·s/ft²': 47.88025898,
  'lb/(ft·s)': 1.488164,
};

export function convertDynamicViscosity(
  value: number,
  from: DynamicViscosityUnit,
  to: DynamicViscosityUnit
): number {
  if (from === to) return value;
  const inPaS = value * dynamicViscosityToPaS[from];
  return inPaS / dynamicViscosityToPaS[to];
}

// ============ KINEMATIC VISCOSITY ============
export type KinematicViscosityUnit = 
  | 'm²/s'     // Square meter per second
  | 'cm²/s'    // Square centimeter per second (Stokes)
  | 'mm²/s'    // Square millimeter per second (Centistokes)
  | 'ft²/s'    // Square foot per second
  | 'in²/s';   // Square inch per second

export const kinematicViscosityToM2S: Record<KinematicViscosityUnit, number> = {
  'm²/s': 1,
  'cm²/s': 1e-4,            // Stokes (St)
  'mm²/s': 1e-6,            // Centistokes (cSt)
  'ft²/s': 0.09290304,
  'in²/s': 0.00064516,
};

export function convertKinematicViscosity(
  value: number,
  from: KinematicViscosityUnit,
  to: KinematicViscosityUnit
): number {
  if (from === to) return value;
  const inM2S = value * kinematicViscosityToM2S[from];
  return inM2S / kinematicViscosityToM2S[to];
}

/**
 * Convert dynamic viscosity to kinematic viscosity
 * Requires density of the fluid
 */
export function dynamicToKinematicViscosity(
  dynamicViscosity: number,  // in Pa·s
  density: number            // in kg/m³
): number {
  return dynamicViscosity / density; // Returns m²/s
}

/**
 * Convert kinematic viscosity to dynamic viscosity
 * Requires density of the fluid
 */
export function kinematicToDynamicViscosity(
  kinematicViscosity: number, // in m²/s
  density: number            // in kg/m³
): number {
  return kinematicViscosity * density; // Returns Pa·s
}

/**
 * Common viscosity reference values
 */
export const viscosityReferenceValues = [
  { substance: 'Wasser (20°C)', dynamic_cP: 1.002, kinematic_cSt: 1.004 },
  { substance: 'Luft (20°C)', dynamic_cP: 0.018, kinematic_cSt: 15 },
  { substance: 'Olivenöl', dynamic_cP: 84, kinematic_cSt: 93 },
  { substance: 'Honig', dynamic_cP: 10000, kinematic_cSt: 7300 },
  { substance: 'Motoröl SAE 30', dynamic_cP: 250, kinematic_cSt: 280 },
];
