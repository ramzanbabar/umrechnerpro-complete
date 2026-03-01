/**
 * Cooking units conversion library for UmrechnerPro
 * German cooking measurements (TL, EL, Cups, etc.)
 */

export type CookingUnit = 
  | 'mL'       // Milliliter
  | 'L'        // Liter
  | 'dL'       // Deziliter
  | 'TL'       // Teelöffel (Teaspoon)
  | 'EL'       // Esslöffel (Tablespoon)
  | 'cup'      // Cup (US)
  | 'fl_oz'    // Fluid Ounce (US)
  | 'tsp'      // Teaspoon (US)
  | 'tbsp'     // Tablespoon (US)
  | 'g'        // Gramm (for water/milk approximation)
  | 'kg';      // Kilogramm

export interface CookingUnitInfo {
  symbol: CookingUnit;
  name: string;
  nameEn: string;
  toMl: number;
}

/**
 * Conversion factors to milliliters
 * Note: German TL/EL are standardized:
 * - 1 TL (Teelöffel) = 5 mL
 * - 1 EL (Esslöffel) = 15 mL
 */
export const cookingToMl: Record<CookingUnit, number> = {
  mL: 1,                     // Milliliter
  L: 1000,                   // Liter
  dL: 100,                   // Deziliter
  TL: 5,                     // Teelöffel (German standard)
  EL: 15,                    // Esslöffel (German standard)
  cup: 236.588,              // US Cup
  fl_oz: 29.5735,            // US Fluid Ounce
  tsp: 4.92892,              // US Teaspoon
  tbsp: 14.7868,             // US Tablespoon
  g: 1,                      // Gram (approx. 1mL for water)
  kg: 1000,                  // Kilogram
};

export const cookingUnitInfo: Record<CookingUnit, CookingUnitInfo> = {
  mL: { symbol: 'mL', name: 'Milliliter', nameEn: 'Milliliter', toMl: 1 },
  L: { symbol: 'L', name: 'Liter', nameEn: 'Liter', toMl: 1000 },
  dL: { symbol: 'dL', name: 'Deziliter', nameEn: 'Deciliter', toMl: 100 },
  TL: { symbol: 'TL', name: 'Teelöffel', nameEn: 'Teaspoon', toMl: 5 },
  EL: { symbol: 'EL', name: 'Esslöffel', nameEn: 'Tablespoon', toMl: 15 },
  cup: { symbol: 'cup', name: 'Cup (US)', nameEn: 'US Cup', toMl: 236.588 },
  fl_oz: { symbol: 'fl_oz', name: 'Fluid Ounce', nameEn: 'Fluid Ounce', toMl: 29.5735 },
  tsp: { symbol: 'tsp', name: 'Teaspoon (US)', nameEn: 'US Teaspoon', toMl: 4.92892 },
  tbsp: { symbol: 'tbsp', name: 'Tablespoon (US)', nameEn: 'US Tablespoon', toMl: 14.7868 },
  g: { symbol: 'g', name: 'Gramm', nameEn: 'Gram', toMl: 1 },
  kg: { symbol: 'kg', name: 'Kilogramm', nameEn: 'Kilogram', toMl: 1000 },
};

/**
 * Convert cooking volume from one unit to another
 */
export function convertCooking(value: number, from: CookingUnit, to: CookingUnit): number {
  if (from === to) return value;
  const inMl = value * cookingToMl[from];
  return inMl / cookingToMl[to];
}

/**
 * Common cooking conversions for quick reference
 */
export const commonCookingConversions: Array<{ amount: string; from: CookingUnit; ml: number }> = [
  { amount: '1 TL', from: 'TL', ml: 5 },
  { amount: '1 EL', from: 'EL', ml: 15 },
  { amount: '1 Cup', from: 'cup', ml: 236.588 },
  { amount: '1 dL', from: 'dL', ml: 100 },
  { amount: '1 fl oz', from: 'fl_oz', ml: 29.57 },
];

/**
 * Ingredient density approximations (for mass to volume conversion)
 */
export const ingredientDensity: Record<string, number> = {
  wasser: 1.0,
  milch: 1.03,
  mehl: 0.55,      // All-purpose flour
  zucker: 0.85,    // Granulated sugar
  salz: 1.2,
  oel: 0.92,
  butter: 0.91,
  honig: 1.4,
};

/**
 * Convert ingredient mass to volume
 */
export function convertIngredientMassToVolume(
  grams: number,
  ingredient: string
): number {
  const density = ingredientDensity[ingredient.toLowerCase()] || 1;
  return grams / density; // Returns mL
}

/**
 * Convert ingredient volume to mass
 */
export function convertIngredientVolumeToMass(
  ml: number,
  ingredient: string
): number {
  const density = ingredientDensity[ingredient.toLowerCase()] || 1;
  return ml * density; // Returns grams
}

/**
 * Common baking ingredient conversions
 */
export const bakingConversions = [
  { ingredient: 'Mehl', cup: '120g', el: '8g', tl: '3g' },
  { ingredient: 'Zucker', cup: '200g', el: '12g', tl: '4g' },
  { ingredient: 'Butter', cup: '225g', el: '14g', tl: '5g' },
  { ingredient: 'Haferflocken', cup: '90g', el: '6g', tl: '2g' },
];
