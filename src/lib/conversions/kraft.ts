/**
 * Force conversion library for UmrechnerPro
 * Base unit: Newton (N) - SI derived unit
 */

export type ForceUnit = 
  | 'N'        // Newton
  | 'kN'       // Kilonewton
  | 'MN'       // Meganewton
  | 'dyn'      // Dyne
  | 'kp'       // Kilopond
  | 'lbf'      // Pound-force
  | 'ozf'      // Ounce-force
  | 'kgf';     // Kilogram-force (= kp)

export interface ForceUnitInfo {
  symbol: ForceUnit;
  name: string;
  nameEn: string;
  toNewton: number;
  category: 'si' | 'metric' | 'imperial';
}

/**
 * Conversion factors to Newtons
 */
export const forceToNewton: Record<ForceUnit, number> = {
  N: 1,                      // Newton (SI unit)
  kN: 1000,                  // Kilonewton
  MN: 1000000,               // Meganewton
  dyn: 1e-5,                 // Dyne
  kp: 9.80665,               // Kilopond (exactly)
  lbf: 4.4482216152605,      // Pound-force
  ozf: 0.27801385140633,     // Ounce-force
  kgf: 9.80665,              // Kilogram-force (= Kilopond)
};

export const forceUnitInfo: Record<ForceUnit, ForceUnitInfo> = {
  N: { symbol: 'N', name: 'Newton', nameEn: 'Newton', toNewton: 1, category: 'si' },
  kN: { symbol: 'kN', name: 'Kilonewton', nameEn: 'Kilonewton', toNewton: 1000, category: 'si' },
  MN: { symbol: 'MN', name: 'Meganewton', nameEn: 'Meganewton', toNewton: 1000000, category: 'si' },
  dyn: { symbol: 'dyn', name: 'Dyne', nameEn: 'Dyne', toNewton: 1e-5, category: 'metric' },
  kp: { symbol: 'kp', name: 'Kilopond', nameEn: 'Kilopond', toNewton: 9.80665, category: 'metric' },
  lbf: { symbol: 'lbf', name: 'Pound-force', nameEn: 'Pound-force', toNewton: 4.4482216152605, category: 'imperial' },
  ozf: { symbol: 'ozf', name: 'Ounce-force', nameEn: 'Ounce-force', toNewton: 0.27801385140633, category: 'imperial' },
  kgf: { symbol: 'kgf', name: 'Kilogram-force', nameEn: 'Kilogram-force', toNewton: 9.80665, category: 'metric' },
};

/**
 * Convert force value from one unit to another
 */
export function convertForce(value: number, from: ForceUnit, to: ForceUnit): number {
  if (from === to) return value;
  const inNewtons = value * forceToNewton[from];
  return inNewtons / forceToNewton[to];
}

/**
 * Get conversion factor between two units
 */
export function getForceConversionFactor(from: ForceUnit, to: ForceUnit): number {
  return forceToNewton[from] / forceToNewton[to];
}
