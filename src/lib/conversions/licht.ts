/**
 * Light and illumination conversion library for UmrechnerPro
 * Luminance and Illuminance
 */

// ============ LUMINANCE ============
export type LuminanceUnit = 
  | 'cd/m²'    // Candela per square meter (Nit)
  | 'cd/cm²'   // Candela per square centimeter (Stilb)
  | 'cd/ft²'   // Candela per square foot
  | 'fL'       // Footlambert
  | 'L'        // Lambert
  | 'asb'      // Apostilb
  | 'sb';      // Stilb

export const luminanceToCdM2: Record<LuminanceUnit, number> = {
  'cd/m²': 1,              // Nit
  'cd/cm²': 10000,         // Stilb
  'cd/ft²': 10.763910417,
  'fL': 3.4262591,         // Footlambert = 1/π cd/ft²
  'L': 10000/Math.PI,      // Lambert
  'asb': 1/Math.PI,        // Apostilb
  'sb': 10000,             // Stilb = cd/cm²
};

export function convertLuminance(
  value: number,
  from: LuminanceUnit,
  to: LuminanceUnit
): number {
  if (from === to) return value;
  const inCdM2 = value * luminanceToCdM2[from];
  return inCdM2 / luminanceToCdM2[to];
}

// ============ ILLUMINANCE ============
export type IlluminanceUnit = 
  | 'lx'       // Lux
  | 'klx'      // Kilolux
  | 'fc'       // Footcandle
  | 'ph'       // Phot
  | 'nox';     // Nox (millilux)

export const illuminanceToLx: Record<IlluminanceUnit, number> = {
  'lx': 1,
  'klx': 1000,
  'fc': 10.763910417,      // Footcandle
  'ph': 10000,             // Phot = 10,000 lx
  'nox': 0.001,            // Millilux
};

export function convertIlluminance(
  value: number,
  from: IlluminanceUnit,
  to: IlluminanceUnit
): number {
  if (from === to) return value;
  const inLx = value * illuminanceToLx[from];
  return inLx / illuminanceToLx[to];
}

/**
 * Common illuminance reference values
 */
export const illuminanceReferenceValues = [
  { condition: 'Sternklare Nacht', lx: 0.001, description: 'Sehr dunkel' },
  { condition: 'Vollmond', lx: 0.25, description: 'Nachts' },
  { condition: 'Bürobeleuchtung', lx: 500, description: 'Arbeitsplatz' },
  { condition: 'Bewölkter Tag', lx: 1000, description: 'Draußen' },
  { condition: 'Sonniger Tag', lx: 100000, description: 'Direktes Sonnenlicht' },
];
