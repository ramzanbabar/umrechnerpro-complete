/**
 * Volume conversion library for UmrechnerPro
 * Base unit: Liter (L) for practical use, Cubic Meter (m3) for SI
 */

export type VolumeUnit = 
  | 'mL'       // Milliliter
  | 'cL'       // Zentiliter
  | 'dL'       // Deziliter
  | 'L'        // Liter
  | 'm3'       // Kubikmeter
  | 'cm3'      // Kubikzentimeter
  | 'mm3'      // Kubikmillimeter
  | 'in3'      // Kubikzoll
  | 'ft3'      // Kubikfuss
  | 'yd3'      // Kubikyard
  | 'gal_us'   // US Gallone
  | 'gal_uk'   // UK Gallone (Imperial)
  | 'qt_us'    // US Quart
  | 'qt_uk'    // UK Quart
  | 'pt_us'    // US Pint
  | 'pt_uk'    // UK Pint
  | 'fl_oz_us' // US Fluid Ounce
  | 'fl_oz_uk' // UK Fluid Ounce
  | 'cup_us'   // US Cup
  | 'tbsp'     // Essloeffel (Tablespoon)
  | 'tsp';     // Teeloeffel (Teaspoon)

export interface VolumeUnitInfo {
  symbol: VolumeUnit;
  name: string;
  nameEn: string;
  toLiter: number;
  category: 'metric' | 'imperial_us' | 'imperial_uk' | 'cooking';
}

/**
 * Conversion factors to liters
 */
export const volumeToLiter: Record<VolumeUnit, number> = {
  mL: 0.001,                    // Milliliter
  cL: 0.01,                     // Zentiliter
  dL: 0.1,                      // Deziliter
  L: 1,                         // Liter
  m3: 1000,                     // Kubikmeter
  cm3: 0.001,                   // Kubikzentimeter (= mL)
  mm3: 0.000001,                // Kubikmillimeter
  in3: 0.016387064,             // Kubikzoll
  ft3: 28.316846592,            // Kubikfuss
  yd3: 764.554857984,           // Kubikyard
  gal_us: 3.785411784,          // US Gallone
  gal_uk: 4.54609,              // UK Gallone (Imperial)
  qt_us: 0.946352946,           // US Quart (1/4 US gallon)
  qt_uk: 1.1365225,             // UK Quart (1/4 UK gallon)
  pt_us: 0.473176473,           // US Pint (1/8 US gallon)
  pt_uk: 0.56826125,            // UK Pint (1/8 UK gallon)
  fl_oz_us: 0.0295735295625,    // US Fluid Ounce
  fl_oz_uk: 0.0284130625,       // UK Fluid Ounce
  cup_us: 0.2365882365,         // US Cup (8 US fl oz)
  tbsp: 0.01478676478125,       // US Tablespoon (1/2 US fl oz)
  tsp: 0.00492892159375,        // US Teaspoon (1/6 US fl oz)
};

export const volumeUnitInfo: Record<VolumeUnit, VolumeUnitInfo> = {
  mL: { symbol: 'mL', name: 'Milliliter', nameEn: 'Milliliter', toLiter: 0.001, category: 'metric' },
  cL: { symbol: 'cL', name: 'Zentiliter', nameEn: 'Centiliter', toLiter: 0.01, category: 'metric' },
  dL: { symbol: 'dL', name: 'Deziliter', nameEn: 'Deciliter', toLiter: 0.1, category: 'metric' },
  L: { symbol: 'L', name: 'Liter', nameEn: 'Liter', toLiter: 1, category: 'metric' },
  m3: { symbol: 'm3', name: 'Kubikmeter', nameEn: 'Cubic Meter', toLiter: 1000, category: 'metric' },
  cm3: { symbol: 'cm3', name: 'Kubikzentimeter', nameEn: 'Cubic Centimeter', toLiter: 0.001, category: 'metric' },
  mm3: { symbol: 'mm3', name: 'Kubikmillimeter', nameEn: 'Cubic Millimeter', toLiter: 0.000001, category: 'metric' },
  in3: { symbol: 'in3', name: 'Kubikzoll', nameEn: 'Cubic Inch', toLiter: 0.016387064, category: 'imperial_us' },
  ft3: { symbol: 'ft3', name: 'Kubikfuss', nameEn: 'Cubic Foot', toLiter: 28.316846592, category: 'imperial_us' },
  yd3: { symbol: 'yd3', name: 'Kubikyard', nameEn: 'Cubic Yard', toLiter: 764.554857984, category: 'imperial_us' },
  gal_us: { symbol: 'gal_us', name: 'US Gallone', nameEn: 'US Gallon', toLiter: 3.785411784, category: 'imperial_us' },
  gal_uk: { symbol: 'gal_uk', name: 'UK Gallone', nameEn: 'UK Gallon', toLiter: 4.54609, category: 'imperial_uk' },
  qt_us: { symbol: 'qt_us', name: 'US Quart', nameEn: 'US Quart', toLiter: 0.946352946, category: 'imperial_us' },
  qt_uk: { symbol: 'qt_uk', name: 'UK Quart', nameEn: 'UK Quart', toLiter: 1.1365225, category: 'imperial_uk' },
  pt_us: { symbol: 'pt_us', name: 'US Pint', nameEn: 'US Pint', toLiter: 0.473176473, category: 'imperial_us' },
  pt_uk: { symbol: 'pt_uk', name: 'UK Pint', nameEn: 'UK Pint', toLiter: 0.56826125, category: 'imperial_uk' },
  fl_oz_us: { symbol: 'fl_oz_us', name: 'US Fluid Ounce', nameEn: 'US Fluid Ounce', toLiter: 0.0295735295625, category: 'imperial_us' },
  fl_oz_uk: { symbol: 'fl_oz_uk', name: 'UK Fluid Ounce', nameEn: 'UK Fluid Ounce', toLiter: 0.0284130625, category: 'imperial_uk' },
  cup_us: { symbol: 'cup_us', name: 'US Cup', nameEn: 'US Cup', toLiter: 0.2365882365, category: 'cooking' },
  tbsp: { symbol: 'tbsp', name: 'Essloeffel', nameEn: 'Tablespoon', toLiter: 0.01478676478125, category: 'cooking' },
  tsp: { symbol: 'tsp', name: 'Teeloeffel', nameEn: 'Teaspoon', toLiter: 0.00492892159375, category: 'cooking' },
};

/**
 * Convert volume value from one unit to another
 */
export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  if (from === to) return value;
  const inLiters = value * volumeToLiter[from];
  return inLiters / volumeToLiter[to];
}

/**
 * Get conversion factor between two units
 */
export function getVolumeConversionFactor(from: VolumeUnit, to: VolumeUnit): number {
  return volumeToLiter[from] / volumeToLiter[to];
}

/**
 * Common volume conversions
 */
export const commonVolumeConversions: Array<{ from: VolumeUnit; to: VolumeUnit; factor: string }> = [
  { from: 'L', to: 'gal_us', factor: '0,26417' },
  { from: 'gal_us', to: 'L', factor: '3,78541' },
  { from: 'mL', to: 'L', factor: '0,001' },
  { from: 'cup_us', to: 'mL', factor: '236,59' },
  { from: 'tbsp', to: 'mL', factor: '14,79' },
  { from: 'tsp', to: 'mL', factor: '4,93' },
];
