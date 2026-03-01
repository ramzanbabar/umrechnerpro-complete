/**
 * Power conversion library for UmrechnerPro
 * Base unit: Watt (W) - SI derived unit
 */

export type PowerUnit = 
  | 'W'        // Watt
  | 'kW'       // Kilowatt
  | 'MW'       // Megawatt
  | 'GW'       // Gigawatt
  | 'PS'       // Pferdestärke (metrisch)
  | 'hp'       // Horsepower (imperial)
  | 'BTU/h'    // BTU pro Stunde
  | 'kcal/h'   // Kilokalorie pro Stunde
  | 'ft_lbf/s'; // Foot-pound pro Sekunde

export interface PowerUnitInfo {
  symbol: PowerUnit;
  name: string;
  nameEn: string;
  toWatt: number;
  category: 'si' | 'mechanical' | 'thermal';
}

/**
 * Conversion factors to Watts
 * PS (Pferdestärke) = 735.49875 W (metric horsepower)
 * HP (Horsepower) = 745.699872 W (imperial/mechanical horsepower)
 */
export const powerToWatt: Record<PowerUnit, number> = {
  W: 1,                        // Watt (SI unit)
  kW: 1000,                    // Kilowatt
  MW: 1000000,                 // Megawatt
  GW: 1000000000,              // Gigawatt
  PS: 735.49875,               // Pferdestärke (metric horsepower)
  hp: 745.69987158227022,      // Horsepower (imperial/mechanical)
  'BTU/h': 0.29307107,         // BTU per hour
  'kcal/h': 1.163,             // Kilocalorie per hour
  'ft_lbf/s': 1.3558179483314, // Foot-pound per second
};

export const powerUnitInfo: Record<PowerUnit, PowerUnitInfo> = {
  W: { symbol: 'W', name: 'Watt', nameEn: 'Watt', toWatt: 1, category: 'si' },
  kW: { symbol: 'kW', name: 'Kilowatt', nameEn: 'Kilowatt', toWatt: 1000, category: 'si' },
  MW: { symbol: 'MW', name: 'Megawatt', nameEn: 'Megawatt', toWatt: 1000000, category: 'si' },
  GW: { symbol: 'GW', name: 'Gigawatt', nameEn: 'Gigawatt', toWatt: 1000000000, category: 'si' },
  PS: { symbol: 'PS', name: 'Pferdestärke', nameEn: 'Metric Horsepower', toWatt: 735.49875, category: 'mechanical' },
  hp: { symbol: 'hp', name: 'Horsepower', nameEn: 'Imperial Horsepower', toWatt: 745.69987158227022, category: 'mechanical' },
  'BTU/h': { symbol: 'BTU/h', name: 'BTU pro Stunde', nameEn: 'BTU per Hour', toWatt: 0.29307107, category: 'thermal' },
  'kcal/h': { symbol: 'kcal/h', name: 'Kilokalorie pro Stunde', nameEn: 'Kilocalorie per Hour', toWatt: 1.163, category: 'thermal' },
  'ft_lbf/s': { symbol: 'ft_lbf/s', name: 'Foot-pound/Sekunde', nameEn: 'Foot-pound per Second', toWatt: 1.3558179483314, category: 'mechanical' },
};

/**
 * Convert power value from one unit to another
 */
export function convertPower(value: number, from: PowerUnit, to: PowerUnit): number {
  if (from === to) return value;
  const inWatts = value * powerToWatt[from];
  return inWatts / powerToWatt[to];
}

/**
 * Get conversion factor between two units
 */
export function getPowerConversionFactor(from: PowerUnit, to: PowerUnit): number {
  return powerToWatt[from] / powerToWatt[to];
}

/**
 * Common power conversions
 */
export const commonPowerConversions: Array<{ from: PowerUnit; to: PowerUnit; factor: string }> = [
  { from: 'kW', to: 'PS', factor: '1,35962' },
  { from: 'PS', to: 'kW', factor: '0,7355' },
  { from: 'hp', to: 'kW', factor: '0,7457' },
  { from: 'kW', to: 'hp', factor: '1,341' },
  { from: 'PS', to: 'hp', factor: '0,9863' },
  { from: 'kW', to: 'W', factor: '1000' },
];
