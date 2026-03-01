/**
 * Speed/Velocity conversion library for UmrechnerPro
 * Base unit: Meter per Second (m/s) - SI derived unit
 */

export type SpeedUnit = 
  | 'm/s'      // Meter pro Sekunde
  | 'km/h'     // Kilometer pro Stunde
  | 'mph'      // Meilen pro Stunde
  | 'kn'       // Knoten (Seemeile pro Stunde)
  | 'ft/s'     // Fuß pro Sekunde
  | 'ft/min'   // Fuß pro Minute
  | 'Mach'     // Mach-Zahl (bei 20°C auf Meereshöhe)
  | 'c';       // Lichtgeschwindigkeit

export interface SpeedUnitInfo {
  symbol: SpeedUnit;
  name: string;
  nameEn: string;
  toMeterPerSecond: number;
  category: 'metric' | 'imperial' | 'aviation' | 'physics';
}

/**
 * Conversion factors to meters per second
 * Mach varies with temperature; using 20°C at sea level (343 m/s)
 * Light speed is exact: 299,792,458 m/s
 */
export const speedToMeterPerSecond: Record<SpeedUnit, number> = {
  'm/s': 1,                         // SI unit
  'km/h': 0.277777778,              // 1000/3600
  'mph': 0.44704,                   // Exactly 0.44704 m/s
  'kn': 0.514444444,                // 1852/3600 (nautical mile per hour)
  'ft/s': 0.3048,                   // Exactly 0.3048 m/s
  'ft/min': 0.00508,                // 0.3048/60
  'Mach': 343,                      // At 20°C at sea level
  'c': 299792458,                   // Speed of light (exact)
};

export const speedUnitInfo: Record<SpeedUnit, SpeedUnitInfo> = {
  'm/s': { symbol: 'm/s', name: 'Meter pro Sekunde', nameEn: 'Meter per Second', toMeterPerSecond: 1, category: 'metric' },
  'km/h': { symbol: 'km/h', name: 'Kilometer pro Stunde', nameEn: 'Kilometer per Hour', toMeterPerSecond: 0.277777778, category: 'metric' },
  'mph': { symbol: 'mph', name: 'Meilen pro Stunde', nameEn: 'Miles per Hour', toMeterPerSecond: 0.44704, category: 'imperial' },
  'kn': { symbol: 'kn', name: 'Knoten', nameEn: 'Knot', toMeterPerSecond: 0.514444444, category: 'aviation' },
  'ft/s': { symbol: 'ft/s', name: 'Fuß pro Sekunde', nameEn: 'Foot per Second', toMeterPerSecond: 0.3048, category: 'imperial' },
  'ft/min': { symbol: 'ft/min', name: 'Fuß pro Minute', nameEn: 'Foot per Minute', toMeterPerSecond: 0.00508, category: 'imperial' },
  'Mach': { symbol: 'Mach', name: 'Mach', nameEn: 'Mach Number', toMeterPerSecond: 343, category: 'aviation' },
  'c': { symbol: 'c', name: 'Lichtgeschwindigkeit', nameEn: 'Speed of Light', toMeterPerSecond: 299792458, category: 'physics' },
};

/**
 * Convert speed value from one unit to another
 */
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  if (from === to) return value;
  const inMetersPerSecond = value * speedToMeterPerSecond[from];
  return inMetersPerSecond / speedToMeterPerSecond[to];
}

/**
 * Get conversion factor between two units
 */
export function getSpeedConversionFactor(from: SpeedUnit, to: SpeedUnit): number {
  return speedToMeterPerSecond[from] / speedToMeterPerSecond[to];
}

/**
 * Common speed reference points
 */
export const speedReferencePoints: Array<{ name: string; mps: number }> = [
  { name: 'Gehen (gemütlich)', mps: 1.4 },
  { name: 'Gehen (schnell)', mps: 1.8 },
  { name: 'Radfahren', mps: 5 },
  { name: 'Autobahn (Richtgeschwindigkeit)', mps: 38.9 },  // 140 km/h
  { name: 'Schallgeschwindigkeit', mps: 343 },
  { name: 'Lichtgeschwindigkeit', mps: 299792458 },
];

/**
 * Common speed conversions
 */
export const commonSpeedConversions: Array<{ from: SpeedUnit; to: SpeedUnit; factor: string }> = [
  { from: 'km/h', to: 'mph', factor: '0,62137' },
  { from: 'mph', to: 'km/h', factor: '1,60934' },
  { from: 'm/s', to: 'km/h', factor: '3,6' },
  { from: 'km/h', to: 'm/s', factor: '0,27778' },
  { from: 'kn', to: 'km/h', factor: '1,852' },
  { from: 'km/h', to: 'kn', factor: '0,53996' },
];
