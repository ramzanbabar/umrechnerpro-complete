/**
 * Radioactivity and radiation dose conversion library for UmrechnerPro
 */

// ============ RADIOACTIVITY ============
export type RadioactivityUnit = 
  | 'Bq'       // Becquerel
  | 'kBq'      // Kilobecquerel
  | 'MBq'      // Megabecquerel
  | 'GBq'      // Gigabecquerel
  | 'Ci'       // Curie
  | 'mCi'      // Millicurie
  | 'µCi'      // Microcurie
  | 'nCi'      // Nanocurie
  | 'dps'      // Disintegrations per second
  | 'dpm';     // Disintegrations per minute

export const radioactivityToBq: Record<RadioactivityUnit, number> = {
  'Bq': 1,
  'kBq': 1000,
  'MBq': 1000000,
  'GBq': 1000000000,
  'Ci': 3.7e10,           // Curie = 3.7 × 10¹⁰ Bq (exactly)
  'mCi': 3.7e7,
  'µCi': 3.7e4,
  'nCi': 3.7e1,
  'dps': 1,               // Disintegrations per second = Bq
  'dpm': 1/60,            // Disintegrations per minute
};

export function convertRadioactivity(
  value: number,
  from: RadioactivityUnit,
  to: RadioactivityUnit
): number {
  if (from === to) return value;
  const inBq = value * radioactivityToBq[from];
  return inBq / radioactivityToBq[to];
}

// ============ RADIATION DOSE ============
export type RadiationDoseUnit = 
  | 'Sv'       // Sievert (equivalent dose)
  | 'mSv'      // Millisievert
  | 'µSv'      // Microsievert
  | 'nSv'      // Nanosievert
  | 'rem'      // Rem
  | 'mrem'     // Millirem
  | 'Gy'       // Gray (absorbed dose)
  | 'mGy'      // Milligray
  | 'rad';     // Rad

export const radiationDoseToSv: Record<RadiationDoseUnit, number> = {
  'Sv': 1,
  'mSv': 0.001,
  'µSv': 1e-6,
  'nSv': 1e-9,
  'rem': 0.01,            // 1 rem = 0.01 Sv
  'mrem': 1e-5,
  'Gy': 1,                // Gray = Sv for equivalent dose (same J/kg)
  'mGy': 0.001,
  'rad': 0.01,            // 1 rad = 0.01 Gy
};

export function convertRadiationDose(
  value: number,
  from: RadiationDoseUnit,
  to: RadiationDoseUnit
): number {
  if (from === to) return value;
  const inSv = value * radiationDoseToSv[from];
  return inSv / radiationDoseToSv[to];
}

/**
 * Common radiation reference values
 */
export const radiationReferenceValues = [
  { source: 'Banane', value_µSv: 0.1, description: 'Natürliches Kalium-40' },
  { source: 'Flug Frankfurt-New York', value_µSv: 50, description: 'Höhenstrahlung' },
  { source: 'Röntgen Thorax', value_µSv: 20, description: 'Medizinische Diagnostik' },
  { source: 'CT Scan', value_mSv: 10, description: 'Computertomographie' },
  { source: 'Jährliche natürliche Strahlung', value_mSv: 2.4, description: 'Mittelwert weltweit' },
];
