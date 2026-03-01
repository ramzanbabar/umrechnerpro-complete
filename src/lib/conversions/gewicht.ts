/**
 * Weight/Mass conversion library for UmrechnerPro
 * Based on NIST standards
 * Base unit: Kilogram (kg)
 */

export type WeightUnit = 
  | 'µg'    // Mikrogramm
  | 'mg'    // Milligramm
  | 'g'     // Gramm
  | 'kg'    // Kilogramm
  | 't'     // Tonne (metrisch)
  | 'kt'    // Kilotonne
  | 'Mt'    // Megatonne
  | 'lb'    // Pfund (Pound)
  | 'oz'    // Unze (Ounce)
  | 'st'    // Stone
  | 'troy_oz' // Feinunze (Troy ounce)
  | 'gr'    // Grain
  | 'cwt'   // Zentner (US hundredweight)
  | 'cwt_uk'; // Britischer Zentner

export interface WeightUnitInfo {
  symbol: WeightUnit;
  name: string;
  nameEn: string;
  toKg: number;
  category: 'metric' | 'imperial' | 'troy';
}

/**
 * Conversion factors to kilograms
 */
export const weightToKilogram: Record<WeightUnit, number> = {
  µg: 1e-9,            // Mikrogramm
  mg: 1e-6,            // Milligramm
  g: 0.001,            // Gramm
  kg: 1,               // Kilogramm (SI base unit)
  t: 1000,             // Metrische Tonne
  kt: 1000000,         // Kilotonne
  Mt: 1000000000,      // Megatonne
  lb: 0.45359237,      // Pfund (exactly 0.45359237 kg)
  oz: 0.028349523125,  // Unze (1/16 lb)
  st: 6.35029318,      // Stone (14 lb)
  troy_oz: 0.0311034768, // Feinunze
  gr: 0.00006479891,   // Grain (exactly 64.79891 mg)
  cwt: 45.359237,      // US hundredweight (100 lb)
  cwt_uk: 50.80234544, // UK hundredweight (112 lb / 8 stone)
};

export const weightUnitInfo: Record<WeightUnit, WeightUnitInfo> = {
  µg: { symbol: 'µg', name: 'Mikrogramm', nameEn: 'Microgram', toKg: 1e-9, category: 'metric' },
  mg: { symbol: 'mg', name: 'Milligramm', nameEn: 'Milligram', toKg: 1e-6, category: 'metric' },
  g: { symbol: 'g', name: 'Gramm', nameEn: 'Gram', toKg: 0.001, category: 'metric' },
  kg: { symbol: 'kg', name: 'Kilogramm', nameEn: 'Kilogram', toKg: 1, category: 'metric' },
  t: { symbol: 't', name: 'Tonne', nameEn: 'Metric Ton', toKg: 1000, category: 'metric' },
  kt: { symbol: 'kt', name: 'Kilotonne', nameEn: 'Kiloton', toKg: 1000000, category: 'metric' },
  Mt: { symbol: 'Mt', name: 'Megatonne', nameEn: 'Megaton', toKg: 1000000000, category: 'metric' },
  lb: { symbol: 'lb', name: 'Pfund', nameEn: 'Pound', toKg: 0.45359237, category: 'imperial' },
  oz: { symbol: 'oz', name: 'Unze', nameEn: 'Ounce', toKg: 0.028349523125, category: 'imperial' },
  st: { symbol: 'st', name: 'Stone', nameEn: 'Stone', toKg: 6.35029318, category: 'imperial' },
  troy_oz: { symbol: 'troy_oz', name: 'Feinunze', nameEn: 'Troy Ounce', toKg: 0.0311034768, category: 'troy' },
  gr: { symbol: 'gr', name: 'Grain', nameEn: 'Grain', toKg: 0.00006479891, category: 'imperial' },
  cwt: { symbol: 'cwt', name: 'Zentner (US)', nameEn: 'US Hundredweight', toKg: 45.359237, category: 'imperial' },
  cwt_uk: { symbol: 'cwt_uk', name: 'Zentner (UK)', nameEn: 'UK Hundredweight', toKg: 50.80234544, category: 'imperial' },
};

/**
 * Convert weight/mass value from one unit to another
 */
export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (from === to) return value;
  const inKg = value * weightToKilogram[from];
  return inKg / weightToKilogram[to];
}

/**
 * Get conversion factor between two units
 */
export function getWeightConversionFactor(from: WeightUnit, to: WeightUnit): number {
  return weightToKilogram[from] / weightToKilogram[to];
}

/**
 * Common weight conversions
 */
export const commonWeightConversions: Array<{ from: WeightUnit; to: WeightUnit; factor: string }> = [
  { from: 'kg', to: 'lb', factor: '2,20462' },
  { from: 'lb', to: 'kg', factor: '0,45359' },
  { from: 'g', to: 'oz', factor: '0,03527' },
  { from: 'oz', to: 'g', factor: '28,35' },
  { from: 'kg', to: 'g', factor: '1000' },
  { from: 't', to: 'kg', factor: '1000' },
];
