/**
 * Area conversion library for UmrechnerPro
 * Base unit: Square Meter (m2)
 */

export type AreaUnit = 
  | 'mm2'     // Quadratmillimeter
  | 'cm2'     // Quadratzentimeter
  | 'dm2'     // Quadratdezimeter
  | 'm2'      // Quadratmeter
  | 'a'       // Ar
  | 'ha'      // Hektar
  | 'km2'     // Quadratkilometer
  | 'in2'     // Quadratzoll
  | 'ft2'     // Quadratfuss
  | 'yd2'     // Quadratyard
  | 'mi2'     // Quadratmeile
  | 'ac';     // Acre

export interface AreaUnitInfo {
  symbol: AreaUnit;
  name: string;
  nameEn: string;
  toSquareMeter: number;
  category: 'metric' | 'imperial';
}

/**
 * Conversion factors to square meters
 */
export const areaToSquareMeter: Record<AreaUnit, number> = {
  mm2: 0.000001,           // Quadratmillimeter
  cm2: 0.0001,             // Quadratzentimeter
  dm2: 0.01,               // Quadratdezimeter
  m2: 1,                   // Quadratmeter (SI)
  a: 100,                  // Ar (100 m2)
  ha: 10000,               // Hektar (100 Ar = 10.000 m2)
  km2: 1000000,            // Quadratkilometer
  in2: 0.00064516,         // Quadratzoll (exactly 6.4516 cm2)
  ft2: 0.09290304,         // Quadratfuss (exactly 144 in2)
  yd2: 0.83612736,         // Quadratyard (exactly 9 ft2)
  mi2: 2589988.110336,     // Quadratmeile
  ac: 4046.8564224,        // Acre (exactly 43,560 ft2)
};

export const areaUnitInfo: Record<AreaUnit, AreaUnitInfo> = {
  mm2: { symbol: 'mm2', name: 'Quadratmillimeter', nameEn: 'Square Millimeter', toSquareMeter: 0.000001, category: 'metric' },
  cm2: { symbol: 'cm2', name: 'Quadratzentimeter', nameEn: 'Square Centimeter', toSquareMeter: 0.0001, category: 'metric' },
  dm2: { symbol: 'dm2', name: 'Quadratdezimeter', nameEn: 'Square Decimeter', toSquareMeter: 0.01, category: 'metric' },
  m2: { symbol: 'm2', name: 'Quadratmeter', nameEn: 'Square Meter', toSquareMeter: 1, category: 'metric' },
  a: { symbol: 'a', name: 'Ar', nameEn: 'Are', toSquareMeter: 100, category: 'metric' },
  ha: { symbol: 'ha', name: 'Hektar', nameEn: 'Hectare', toSquareMeter: 10000, category: 'metric' },
  km2: { symbol: 'km2', name: 'Quadratkilometer', nameEn: 'Square Kilometer', toSquareMeter: 1000000, category: 'metric' },
  in2: { symbol: 'in2', name: 'Quadratzoll', nameEn: 'Square Inch', toSquareMeter: 0.00064516, category: 'imperial' },
  ft2: { symbol: 'ft2', name: 'Quadratfuss', nameEn: 'Square Foot', toSquareMeter: 0.09290304, category: 'imperial' },
  yd2: { symbol: 'yd2', name: 'Quadratyard', nameEn: 'Square Yard', toSquareMeter: 0.83612736, category: 'imperial' },
  mi2: { symbol: 'mi2', name: 'Quadratmeile', nameEn: 'Square Mile', toSquareMeter: 2589988.110336, category: 'imperial' },
  ac: { symbol: 'ac', name: 'Acre', nameEn: 'Acre', toSquareMeter: 4046.8564224, category: 'imperial' },
};

/**
 * Convert area value from one unit to another
 */
export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  if (from === to) return value;
  const inSquareMeters = value * areaToSquareMeter[from];
  return inSquareMeters / areaToSquareMeter[to];
}

/**
 * Get conversion factor between two units
 */
export function getAreaConversionFactor(from: AreaUnit, to: AreaUnit): number {
  return areaToSquareMeter[from] / areaToSquareMeter[to];
}

/**
 * Common area conversions
 */
export const commonAreaConversions: Array<{ from: AreaUnit; to: AreaUnit; factor: string }> = [
  { from: 'ha', to: 'm2', factor: '10.000' },
  { from: 'm2', to: 'ha', factor: '0,0001' },
  { from: 'ac', to: 'ha', factor: '0,40469' },
  { from: 'ha', to: 'ac', factor: '2,47105' },
  { from: 'km2', to: 'm2', factor: '1.000.000' },
  { from: 'ft2', to: 'm2', factor: '0,0929' },
];
