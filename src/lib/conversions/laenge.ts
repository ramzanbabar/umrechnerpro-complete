/**
 * Length conversion library for UmrechnerPro
 * Based on NIST standards and SI definitions
 * Base unit: Meter (m)
 */

export type LengthUnit = 
  | 'nm'    // Nanometer
  | 'µm'    // Mikrometer
  | 'mm'    // Millimeter
  | 'cm'    // Zentimeter
  | 'dm'    // Dezimeter
  | 'm'     // Meter
  | 'km'    // Kilometer
  | 'in'    // Zoll (Inch)
  | 'ft'    // Fuß (Foot)
  | 'yd'    // Yard
  | 'mi'    // Meile (Mile)
  | 'nmi'   // Seemeile (Nautical Mile)
  | 'mil'   // Mil (Tausendstel Zoll)
  | 'Å'     // Ångström
  | 'au'    // Astronomische Einheit
  | 'ly'    // Lichtjahr
  | 'pc';   // Parsec

export interface LengthUnitInfo {
  symbol: LengthUnit;
  name: string;
  nameEn: string;
  toMeter: number;
  category: 'metric' | 'imperial' | 'astronomical';
}

/**
 * Conversion factors to meters
 * All values based on NIST and international definitions
 */
export const lengthToMeter: Record<LengthUnit, number> = {
  nm: 1e-9,           // Nanometer
  µm: 1e-6,           // Mikrometer
  mm: 0.001,          // Millimeter
  cm: 0.01,           // Zentimeter
  dm: 0.1,            // Dezimeter
  m: 1,               // Meter (SI base unit)
  km: 1000,           // Kilometer
  in: 0.0254,         // Zoll (exactly 2.54 cm per international inch)
  ft: 0.3048,         // Fuß (exactly 12 inches)
  yd: 0.9144,         // Yard (exactly 3 feet)
  mi: 1609.344,       // Meile (exactly 5280 feet)
  nmi: 1852,          // Seemeile (international nautical mile)
  mil: 0.0000254,     // Mil (thousandth of an inch)
  Å: 1e-10,           // Ångström
  au: 149597870700,   // Astronomische Einheit (IAU definition)
  ly: 9460730472580800, // Lichtjahr (Julian year)
  pc: 30856775814671900, // Parsec (IAU definition)
};

export const lengthUnitInfo: Record<LengthUnit, LengthUnitInfo> = {
  nm: { symbol: 'nm', name: 'Nanometer', nameEn: 'Nanometer', toMeter: 1e-9, category: 'metric' },
  µm: { symbol: 'µm', name: 'Mikrometer', nameEn: 'Micrometer', toMeter: 1e-6, category: 'metric' },
  mm: { symbol: 'mm', name: 'Millimeter', nameEn: 'Millimeter', toMeter: 0.001, category: 'metric' },
  cm: { symbol: 'cm', name: 'Zentimeter', nameEn: 'Centimeter', toMeter: 0.01, category: 'metric' },
  dm: { symbol: 'dm', name: 'Dezimeter', nameEn: 'Decimeter', toMeter: 0.1, category: 'metric' },
  m: { symbol: 'm', name: 'Meter', nameEn: 'Meter', toMeter: 1, category: 'metric' },
  km: { symbol: 'km', name: 'Kilometer', nameEn: 'Kilometer', toMeter: 1000, category: 'metric' },
  in: { symbol: 'in', name: 'Zoll', nameEn: 'Inch', toMeter: 0.0254, category: 'imperial' },
  ft: { symbol: 'ft', name: 'Fuß', nameEn: 'Foot', toMeter: 0.3048, category: 'imperial' },
  yd: { symbol: 'yd', name: 'Yard', nameEn: 'Yard', toMeter: 0.9144, category: 'imperial' },
  mi: { symbol: 'mi', name: 'Meile', nameEn: 'Mile', toMeter: 1609.344, category: 'imperial' },
  nmi: { symbol: 'nmi', name: 'Seemeile', nameEn: 'Nautical Mile', toMeter: 1852, category: 'imperial' },
  mil: { symbol: 'mil', name: 'Mil', nameEn: 'Mil', toMeter: 0.0000254, category: 'imperial' },
  Å: { symbol: 'Å', name: 'Ångström', nameEn: 'Angstrom', toMeter: 1e-10, category: 'metric' },
  au: { symbol: 'au', name: 'Astronomische Einheit', nameEn: 'Astronomical Unit', toMeter: 149597870700, category: 'astronomical' },
  ly: { symbol: 'ly', name: 'Lichtjahr', nameEn: 'Light Year', toMeter: 9460730472580800, category: 'astronomical' },
  pc: { symbol: 'pc', name: 'Parsec', nameEn: 'Parsec', toMeter: 30856775814671900, category: 'astronomical' },
};

/**
 * Convert a length value from one unit to another
 * @param value - The numeric value to convert
 * @param from - Source unit
 * @param to - Target unit
 * @returns Converted value
 */
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  if (from === to) return value;
  
  // Convert to meters first, then to target unit
  const inMeters = value * lengthToMeter[from];
  return inMeters / lengthToMeter[to];
}

/**
 * Get conversion factor between two units
 */
export function getLengthConversionFactor(from: LengthUnit, to: LengthUnit): number {
  return lengthToMeter[from] / lengthToMeter[to];
}

/**
 * Common length conversions for quick reference
 */
export const commonLengthConversions: Array<{ from: LengthUnit; to: LengthUnit; factor: string }> = [
  { from: 'cm', to: 'in', factor: '0,3937' },
  { from: 'in', to: 'cm', factor: '2,54' },
  { from: 'm', to: 'ft', factor: '3,28084' },
  { from: 'ft', to: 'm', factor: '0,3048' },
  { from: 'km', to: 'mi', factor: '0,62137' },
  { from: 'mi', to: 'km', factor: '1,60934' },
  { from: 'mm', to: 'in', factor: '0,03937' },
  { from: 'in', to: 'mm', factor: '25,4' },
];

/**
 * Generate conversion table for a specific conversion
 */
export function generateLengthConversionTable(
  from: LengthUnit,
  to: LengthUnit,
  values: number[]
): Array<{ from: number; to: number }> {
  return values.map(v => ({
    from: v,
    to: convertLength(v, from, to),
  }));
}
