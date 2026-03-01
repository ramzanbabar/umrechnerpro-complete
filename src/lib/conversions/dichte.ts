/**
 * Density conversion library for UmrechnerPro
 * Base unit: Kilogram per Cubic Meter (kg/m³) - SI derived unit
 */

export type DensityUnit = 
  | 'kg/m³'    // Kilogram pro Kubikmeter
  | 'g/cm³'    // Gramm pro Kubikzentimeter
  | 'g/mL'     // Gramm pro Milliliter
  | 'g/L'      // Gramm pro Liter
  | 'mg/mL'    // Milligramm pro Milliliter
  | 'lb/ft³'   // Pfund pro Kubikfuß
  | 'lb/in³'   // Pfund pro Kubikzoll
  | 'lb/gal'   // Pfund pro Gallone (US)
  | 'oz/in³';  // Unze pro Kubikzoll

export interface DensityUnitInfo {
  symbol: DensityUnit;
  name: string;
  nameEn: string;
  toKgPerM3: number;
}

/**
 * Conversion factors to kg/m³
 */
export const densityToKgPerM3: Record<DensityUnit, number> = {
  'kg/m³': 1,                        // SI unit
  'g/cm³': 1000,                     // g/cm³ = 1000 kg/m³
  'g/mL': 1000,                      // g/mL = g/cm³
  'g/L': 1,                          // g/L
  'mg/mL': 1,                        // mg/mL
  'lb/ft³': 16.01846337396,          // Pound per cubic foot
  'lb/in³': 27679.904710203,         // Pound per cubic inch
  'lb/gal': 119.8264273169,          // Pound per US gallon
  'oz/in³': 1729.9940443877,         // Ounce per cubic inch
};

export const densityUnitInfo: Record<DensityUnit, DensityUnitInfo> = {
  'kg/m³': { symbol: 'kg/m³', name: 'Kilogramm pro Kubikmeter', nameEn: 'Kilogram per Cubic Meter', toKgPerM3: 1 },
  'g/cm³': { symbol: 'g/cm³', name: 'Gramm pro Kubikzentimeter', nameEn: 'Gram per Cubic Centimeter', toKgPerM3: 1000 },
  'g/mL': { symbol: 'g/mL', name: 'Gramm pro Milliliter', nameEn: 'Gram per Milliliter', toKgPerM3: 1000 },
  'g/L': { symbol: 'g/L', name: 'Gramm pro Liter', nameEn: 'Gram per Liter', toKgPerM3: 1 },
  'mg/mL': { symbol: 'mg/mL', name: 'Milligramm pro Milliliter', nameEn: 'Milligram per Milliliter', toKgPerM3: 1 },
  'lb/ft³': { symbol: 'lb/ft³', name: 'Pfund pro Kubikfuß', nameEn: 'Pound per Cubic Foot', toKgPerM3: 16.01846337396 },
  'lb/in³': { symbol: 'lb/in³', name: 'Pfund pro Kubikzoll', nameEn: 'Pound per Cubic Inch', toKgPerM3: 27679.904710203 },
  'lb/gal': { symbol: 'lb/gal', name: 'Pfund pro Gallone', nameEn: 'Pound per Gallon', toKgPerM3: 119.8264273169 },
  'oz/in³': { symbol: 'oz/in³', name: 'Unze pro Kubikzoll', nameEn: 'Ounce per Cubic Inch', toKgPerM3: 1729.9940443877 },
};

/**
 * Convert density value from one unit to another
 */
export function convertDensity(value: number, from: DensityUnit, to: DensityUnit): number {
  if (from === to) return value;
  const inKgPerM3 = value * densityToKgPerM3[from];
  return inKgPerM3 / densityToKgPerM3[to];
}

/**
 * Common density reference values
 */
export const densityReferenceValues: Array<{ substance: string; kgPerM3: number }> = [
  { substance: 'Luft (Meereshöhe)', kgPerM3: 1.225 },
  { substance: 'Wasser (4°C)', kgPerM3: 1000 },
  { substance: 'Öl', kgPerM3: 900 },
  { substance: 'Stahl', kgPerM3: 7850 },
  { substance: 'Gold', kgPerM3: 19300 },
  { substance: 'Blei', kgPerM3: 11340 },
];
