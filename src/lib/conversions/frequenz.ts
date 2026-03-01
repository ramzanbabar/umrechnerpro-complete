/**
 * Frequency conversion library for UmrechnerPro
 * Base unit: Hertz (Hz) - SI derived unit (1/s)
 */

export type FrequencyUnit = 
  | 'Hz'       // Hertz
  | 'kHz'      // Kilohertz
  | 'MHz'      // Megahertz
  | 'GHz'      // Gigahertz
  | 'THz'      // Terahertz
  | 'rpm'      // Umdrehungen pro Minute (Revolutions per Minute)
  | 'rad/s'    // Radiant pro Sekunde
  | '°/s';     // Grad pro Sekunde

export interface FrequencyUnitInfo {
  symbol: FrequencyUnit;
  name: string;
  nameEn: string;
  toHertz: number;
}

/**
 * Conversion factors to Hertz
 */
export const frequencyToHertz: Record<FrequencyUnit, number> = {
  Hz: 1,                     // Hertz (SI unit)
  kHz: 1000,                 // Kilohertz
  MHz: 1000000,              // Megahertz
  GHz: 1000000000,           // Gigahertz
  THz: 1000000000000,        // Terahertz
  rpm: 1/60,                 // Umdrehungen pro Minute
  'rad/s': 1/(2*Math.PI),    // Radiant pro Sekunde
  '°/s': 1/360,              // Grad pro Sekunde
};

export const frequencyUnitInfo: Record<FrequencyUnit, FrequencyUnitInfo> = {
  Hz: { symbol: 'Hz', name: 'Hertz', nameEn: 'Hertz', toHertz: 1 },
  kHz: { symbol: 'kHz', name: 'Kilohertz', nameEn: 'Kilohertz', toHertz: 1000 },
  MHz: { symbol: 'MHz', name: 'Megahertz', nameEn: 'Megahertz', toHertz: 1000000 },
  GHz: { symbol: 'GHz', name: 'Gigahertz', nameEn: 'Gigahertz', toHertz: 1000000000 },
  THz: { symbol: 'THz', name: 'Terahertz', nameEn: 'Terahertz', toHertz: 1000000000000 },
  rpm: { symbol: 'rpm', name: 'Umdrehungen pro Minute', nameEn: 'Revolutions per Minute', toHertz: 1/60 },
  'rad/s': { symbol: 'rad/s', name: 'Radiant pro Sekunde', nameEn: 'Radian per Second', toHertz: 1/(2*Math.PI) },
  '°/s': { symbol: '°/s', name: 'Grad pro Sekunde', nameEn: 'Degree per Second', toHertz: 1/360 },
};

/**
 * Convert frequency value from one unit to another
 */
export function convertFrequency(value: number, from: FrequencyUnit, to: FrequencyUnit): number {
  if (from === to) return value;
  const inHertz = value * frequencyToHertz[from];
  return inHertz / frequencyToHertz[to];
}

/**
 * Get conversion factor between two units
 */
export function getFrequencyConversionFactor(from: FrequencyUnit, to: FrequencyUnit): number {
  return frequencyToHertz[from] / frequencyToHertz[to];
}

/**
 * Common frequency conversions
 */
export const commonFrequencyConversions: Array<{ from: FrequencyUnit; to: FrequencyUnit; factor: string }> = [
  { from: 'kHz', to: 'Hz', factor: '1000' },
  { from: 'MHz', to: 'kHz', factor: '1000' },
  { from: 'GHz', to: 'MHz', factor: '1000' },
  { from: 'rpm', to: 'Hz', factor: '0,0167' },
  { from: 'Hz', to: 'rpm', factor: '60' },
  { from: 'rad/s', to: 'Hz', factor: '0,159' },
];

/**
 * Calculate period from frequency
 */
export function frequencyToPeriod(frequency: number, unit: FrequencyUnit = 'Hz'): number {
  const inHertz = frequency * frequencyToHertz[unit];
  return 1 / inHertz; // Period in seconds
}
