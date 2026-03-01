/**
 * Pressure conversion library for UmrechnerPro
 * Base unit: Pascal (Pa) - SI derived unit (N/m²)
 */

export type PressureUnit = 
  | 'Pa'       // Pascal
  | 'hPa'      // Hektopascal
  | 'kPa'      // Kilopascal
  | 'MPa'      // Megapascal
  | 'GPa'      // Gigapascal
  | 'bar'      // Bar
  | 'mbar'     // Millibar
  | 'psi'      // Pound per Square Inch
  | 'atm'      // Atmosphäre (physikalisch)
  | 'at'       // Atmosphäre (technisch)
  | 'Torr'     // Torr
  | 'mmHg'     // Millimeter Quecksilbersäule
  | 'cmH2O'    // Zentimeter Wassersäule
  | 'inHg'     // Zoll Quecksilbersäule
  | 'inH2O';   // Zoll Wassersäule

export interface PressureUnitInfo {
  symbol: PressureUnit;
  name: string;
  nameEn: string;
  toPascal: number;
  category: 'metric' | 'imperial' | 'scientific';
}

/**
 * Conversion factors to Pascals
 */
export const pressureToPascal: Record<PressureUnit, number> = {
  Pa: 1,                         // Pascal (SI unit)
  hPa: 100,                      // Hektopascal
  kPa: 1000,                     // Kilopascal
  MPa: 1000000,                  // Megapascal
  GPa: 1000000000,               // Gigapascal
  bar: 100000,                   // Bar (exactly 100 kPa)
  mbar: 100,                     // Millibar (= 1 hPa)
  psi: 6894.757293168,           // Pound per Square Inch
  atm: 101325,                   // Standard Atmosphere (exact)
  at: 98066.5,                   // Technical Atmosphere (kgf/cm²)
  Torr: 133.3223684211,          // Torr (= 1/760 atm)
  mmHg: 133.322387415,           // Millimeter of Mercury
  cmH2O: 98.0665,                // Centimeter of Water
  inHg: 3386.389,                // Inch of Mercury (at 32°F)
  inH2O: 249.0889,               // Inch of Water (at 60°F)
};

export const pressureUnitInfo: Record<PressureUnit, PressureUnitInfo> = {
  Pa: { symbol: 'Pa', name: 'Pascal', nameEn: 'Pascal', toPascal: 1, category: 'metric' },
  hPa: { symbol: 'hPa', name: 'Hektopascal', nameEn: 'Hectopascal', toPascal: 100, category: 'metric' },
  kPa: { symbol: 'kPa', name: 'Kilopascal', nameEn: 'Kilopascal', toPascal: 1000, category: 'metric' },
  MPa: { symbol: 'MPa', name: 'Megapascal', nameEn: 'Megapascal', toPascal: 1000000, category: 'metric' },
  GPa: { symbol: 'GPa', name: 'Gigapascal', nameEn: 'Gigapascal', toPascal: 1000000000, category: 'metric' },
  bar: { symbol: 'bar', name: 'Bar', nameEn: 'Bar', toPascal: 100000, category: 'metric' },
  mbar: { symbol: 'mbar', name: 'Millibar', nameEn: 'Millibar', toPascal: 100, category: 'metric' },
  psi: { symbol: 'psi', name: 'Pfund pro Quadratzoll', nameEn: 'Pound per Square Inch', toPascal: 6894.757293168, category: 'imperial' },
  atm: { symbol: 'atm', name: 'Atmosphäre (phys.)', nameEn: 'Standard Atmosphere', toPascal: 101325, category: 'scientific' },
  at: { symbol: 'at', name: 'Atmosphäre (tech.)', nameEn: 'Technical Atmosphere', toPascal: 98066.5, category: 'metric' },
  Torr: { symbol: 'Torr', name: 'Torr', nameEn: 'Torr', toPascal: 133.3223684211, category: 'scientific' },
  mmHg: { symbol: 'mmHg', name: 'mm Quecksilbersäule', nameEn: 'Millimeter of Mercury', toPascal: 133.322387415, category: 'scientific' },
  cmH2O: { symbol: 'cmH2O', name: 'cm Wassersäule', nameEn: 'Centimeter of Water', toPascal: 98.0665, category: 'metric' },
  inHg: { symbol: 'inHg', name: 'Zoll Quecksilbersäule', nameEn: 'Inch of Mercury', toPascal: 3386.389, category: 'imperial' },
  inH2O: { symbol: 'inH2O', name: 'Zoll Wassersäule', nameEn: 'Inch of Water', toPascal: 249.0889, category: 'imperial' },
};

/**
 * Convert pressure value from one unit to another
 */
export function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  if (from === to) return value;
  const inPascals = value * pressureToPascal[from];
  return inPascals / pressureToPascal[to];
}

/**
 * Get conversion factor between two units
 */
export function getPressureConversionFactor(from: PressureUnit, to: PressureUnit): number {
  return pressureToPascal[from] / pressureToPascal[to];
}

/**
 * Common pressure conversions
 */
export const commonPressureConversions: Array<{ from: PressureUnit; to: PressureUnit; factor: string }> = [
  { from: 'bar', to: 'psi', factor: '14,5038' },
  { from: 'psi', to: 'bar', factor: '0,06895' },
  { from: 'atm', to: 'bar', factor: '1,01325' },
  { from: 'bar', to: 'atm', factor: '0,98692' },
  { from: 'bar', to: 'kPa', factor: '100' },
  { from: 'mbar', to: 'hPa', factor: '1' },
];
