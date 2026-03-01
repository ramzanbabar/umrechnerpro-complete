/**
 * Torque conversion library for UmrechnerPro
 * Base unit: Newton Meter (N·m) - SI derived unit
 */

export type TorqueUnit = 
  | 'N·m'      // Newtonmeter
  | 'kN·m'     // Kilonewtonmeter
  | 'kgf·m'    // Kilogram-force Meter (Kilopondmeter)
  | 'kgf·cm'   // Kilogram-force Centimeter
  | 'lbf·ft'   // Pound-force Foot
  | 'lbf·in'   // Pound-force Inch
  | 'ozf·in'   // Ounce-force Inch
  | 'dyn·cm';  // Dyne Centimeter

export interface TorqueUnitInfo {
  symbol: TorqueUnit;
  name: string;
  nameEn: string;
  toNm: number;
}

/**
 * Conversion factors to N·m
 */
export const torqueToNm: Record<TorqueUnit, number> = {
  'N·m': 1,                        // SI unit
  'kN·m': 1000,                    // Kilonewton meter
  'kgf·m': 9.80665,                // Kilogram-force meter
  'kgf·cm': 0.0980665,             // Kilogram-force centimeter
  'lbf·ft': 1.3558179483314,       // Pound-force foot
  'lbf·in': 0.1129848290276,       // Pound-force inch
  'ozf·in': 0.0070615518142,       // Ounce-force inch
  'dyn·cm': 1e-7,                  // Dyne centimeter
};

export const torqueUnitInfo: Record<TorqueUnit, TorqueUnitInfo> = {
  'N·m': { symbol: 'N·m', name: 'Newtonmeter', nameEn: 'Newton Meter', toNm: 1 },
  'kN·m': { symbol: 'kN·m', name: 'Kilonewtonmeter', nameEn: 'Kilonewton Meter', toNm: 1000 },
  'kgf·m': { symbol: 'kgf·m', name: 'Kilopondmeter', nameEn: 'Kilogram-force Meter', toNm: 9.80665 },
  'kgf·cm': { symbol: 'kgf·cm', name: 'Kilopondzentimeter', nameEn: 'Kilogram-force Centimeter', toNm: 0.0980665 },
  'lbf·ft': { symbol: 'lbf·ft', name: 'Pfund-Fuß', nameEn: 'Pound-force Foot', toNm: 1.3558179483314 },
  'lbf·in': { symbol: 'lbf·in', name: 'Pfund-Zoll', nameEn: 'Pound-force Inch', toNm: 0.1129848290276 },
  'ozf·in': { symbol: 'ozf·in', name: 'Unze-Zoll', nameEn: 'Ounce-force Inch', toNm: 0.0070615518142 },
  'dyn·cm': { symbol: 'dyn·cm', name: 'Dyne-Zentimeter', nameEn: 'Dyne Centimeter', toNm: 1e-7 },
};

/**
 * Convert torque value from one unit to another
 */
export function convertTorque(value: number, from: TorqueUnit, to: TorqueUnit): number {
  if (from === to) return value;
  const inNm = value * torqueToNm[from];
  return inNm / torqueToNm[to];
}

/**
 * Common torque conversions
 */
export const commonTorqueConversions: Array<{ from: TorqueUnit; to: TorqueUnit; factor: string }> = [
  { from: 'N·m', to: 'lbf·ft', factor: '0,7376' },
  { from: 'lbf·ft', to: 'N·m', factor: '1,3558' },
  { from: 'N·m', to: 'kgf·m', factor: '0,102' },
  { from: 'kgf·m', to: 'N·m', factor: '9,8067' },
];
