/**
 * Acceleration conversion library for UmrechnerPro
 * Base unit: Meter per Second Squared (m/s²) - SI derived unit
 */

export type AccelerationUnit = 
  | 'm/s²'     // Meter pro Sekunde zum Quadrat
  | 'cm/s²'    // Zentimeter pro Sekunde zum Quadrat (Gal)
  | 'ft/s²'    // Fuß pro Sekunde zum Quadrat
  | 'in/s²'    // Zoll pro Sekunde zum Quadrat
  | 'g'        // Erdbeschleunigung (Standard)
  | 'Gal'      // Gal (cm/s²)
  | 'mGal';    // Milligal

export interface AccelerationUnitInfo {
  symbol: AccelerationUnit;
  name: string;
  nameEn: string;
  toMps2: number;
}

/**
 * Conversion factors to m/s²
 * Standard gravity g = 9.80665 m/s² (exactly)
 */
export const accelerationToMps2: Record<AccelerationUnit, number> = {
  'm/s²': 1,                    // SI unit
  'cm/s²': 0.01,                // Centimeter per second squared
  'ft/s²': 0.3048,              // Foot per second squared
  'in/s²': 0.0254,              // Inch per second squared
  'g': 9.80665,                 // Standard gravity
  'Gal': 0.01,                  // Gal (= cm/s²)
  'mGal': 0.00001,              // Milligal
};

export const accelerationUnitInfo: Record<AccelerationUnit, AccelerationUnitInfo> = {
  'm/s²': { symbol: 'm/s²', name: 'Meter pro Sekunde²', nameEn: 'Meter per Second Squared', toMps2: 1 },
  'cm/s²': { symbol: 'cm/s²', name: 'Zentimeter pro Sekunde²', nameEn: 'Centimeter per Second Squared', toMps2: 0.01 },
  'ft/s²': { symbol: 'ft/s²', name: 'Fuß pro Sekunde²', nameEn: 'Foot per Second Squared', toMps2: 0.3048 },
  'in/s²': { symbol: 'in/s²', name: 'Zoll pro Sekunde²', nameEn: 'Inch per Second Squared', toMps2: 0.0254 },
  'g': { symbol: 'g', name: 'Erdbeschleunigung', nameEn: 'Standard Gravity', toMps2: 9.80665 },
  'Gal': { symbol: 'Gal', name: 'Gal', nameEn: 'Gal', toMps2: 0.01 },
  'mGal': { symbol: 'mGal', name: 'Milligal', nameEn: 'Milligal', toMps2: 0.00001 },
};

/**
 * Convert acceleration value from one unit to another
 */
export function convertAcceleration(value: number, from: AccelerationUnit, to: AccelerationUnit): number {
  if (from === to) return value;
  const inMps2 = value * accelerationToMps2[from];
  return inMps2 / accelerationToMps2[to];
}

/**
 * Common acceleration reference values
 */
export const accelerationReferenceValues: Array<{ description: string; mps2: number }> = [
  { description: 'Erdbeschleunigung (Standard)', mps2: 9.80665 },
  { description: 'Erdbeschleunigung (Äquator)', mps2: 9.78 },
  { description: 'Erdbeschleunigung (Pol)', mps2: 9.83 },
  { description: 'Freier Fall (Typisch)', mps2: 9.8 },
  { description: 'Auto Beschleunigung (0-100 km/h in 10s)', mps2: 2.78 },
];
