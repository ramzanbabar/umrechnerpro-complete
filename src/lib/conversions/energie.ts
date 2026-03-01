/**
 * Energy conversion library for UmrechnerPro
 * Base unit: Joule (J) - SI derived unit
 */

export type EnergyUnit = 
  | 'J'        // Joule
  | 'kJ'       // Kilojoule
  | 'MJ'       // Megajoule
  | 'GJ'       // Gigajoule
  | 'Wh'       // Wattstunde
  | 'kWh'      // Kilowattstunde
  | 'MWh'      // Megawattstunde
  | 'cal'      // Kalorie (thermochemisch)
  | 'kcal'     // Kilokalorie
  | 'BTU'      // British Thermal Unit
  | 'eV'       // Elektronenvolt
  | 'keV'      // Kiloelektronenvolt
  | 'MeV'      // Megaelektronenvolt
  | 'GeV'      // Gigaelektronenvolt
  | 'erg'      // Erg
  | 'ft_lbf';  // Foot-pound

export interface EnergyUnitInfo {
  symbol: EnergyUnit;
  name: string;
  nameEn: string;
  toJoule: number;
  category: 'si' | 'electrical' | 'thermal' | 'physics';
}

/**
 * Conversion factors to Joules
 */
export const energyToJoule: Record<EnergyUnit, number> = {
  J: 1,                           // Joule (SI unit)
  kJ: 1000,                       // Kilojoule
  MJ: 1000000,                    // Megajoule
  GJ: 1000000000,                 // Gigajoule
  Wh: 3600,                       // Wattstunde (exactly 3600 J)
  kWh: 3600000,                   // Kilowattstunde
  MWh: 3600000000,                // Megawattstunde
  cal: 4.184,                     // Kalorie (thermochemisch)
  kcal: 4184,                     // Kilokalorie (Nahrungskalorie)
  BTU: 1055.056,                  // British Thermal Unit (IT)
  eV: 1.602176634e-19,            // Elektronenvolt (exact)
  keV: 1.602176634e-16,           // Kiloelektronenvolt
  MeV: 1.602176634e-13,           // Megaelektronenvolt
  GeV: 1.602176634e-10,           // Gigaelektronenvolt
  erg: 1e-7,                      // Erg
  ft_lbf: 1.3558179483314,        // Foot-pound force
};

export const energyUnitInfo: Record<EnergyUnit, EnergyUnitInfo> = {
  J: { symbol: 'J', name: 'Joule', nameEn: 'Joule', toJoule: 1, category: 'si' },
  kJ: { symbol: 'kJ', name: 'Kilojoule', nameEn: 'Kilojoule', toJoule: 1000, category: 'si' },
  MJ: { symbol: 'MJ', name: 'Megajoule', nameEn: 'Megajoule', toJoule: 1000000, category: 'si' },
  GJ: { symbol: 'GJ', name: 'Gigajoule', nameEn: 'Gigajoule', toJoule: 1000000000, category: 'si' },
  Wh: { symbol: 'Wh', name: 'Wattstunde', nameEn: 'Watt-hour', toJoule: 3600, category: 'electrical' },
  kWh: { symbol: 'kWh', name: 'Kilowattstunde', nameEn: 'Kilowatt-hour', toJoule: 3600000, category: 'electrical' },
  MWh: { symbol: 'MWh', name: 'Megawattstunde', nameEn: 'Megawatt-hour', toJoule: 3600000000, category: 'electrical' },
  cal: { symbol: 'cal', name: 'Kalorie', nameEn: 'Calorie', toJoule: 4.184, category: 'thermal' },
  kcal: { symbol: 'kcal', name: 'Kilokalorie', nameEn: 'Kilocalorie', toJoule: 4184, category: 'thermal' },
  BTU: { symbol: 'BTU', name: 'British Thermal Unit', nameEn: 'BTU', toJoule: 1055.056, category: 'thermal' },
  eV: { symbol: 'eV', name: 'Elektronenvolt', nameEn: 'Electronvolt', toJoule: 1.602176634e-19, category: 'physics' },
  keV: { symbol: 'keV', name: 'Kiloelektronenvolt', nameEn: 'Kiloelectronvolt', toJoule: 1.602176634e-16, category: 'physics' },
  MeV: { symbol: 'MeV', name: 'Megaelektronenvolt', nameEn: 'Megaelectronvolt', toJoule: 1.602176634e-13, category: 'physics' },
  GeV: { symbol: 'GeV', name: 'Gigaelektronenvolt', nameEn: 'Gigaelectronvolt', toJoule: 1.602176634e-10, category: 'physics' },
  erg: { symbol: 'erg', name: 'Erg', nameEn: 'Erg', toJoule: 1e-7, category: 'physics' },
  ft_lbf: { symbol: 'ft_lbf', name: 'Foot-pound', nameEn: 'Foot-pound', toJoule: 1.3558179483314, category: 'physics' },
};

/**
 * Convert energy value from one unit to another
 */
export function convertEnergy(value: number, from: EnergyUnit, to: EnergyUnit): number {
  if (from === to) return value;
  const inJoules = value * energyToJoule[from];
  return inJoules / energyToJoule[to];
}

/**
 * Get conversion factor between two units
 */
export function getEnergyConversionFactor(from: EnergyUnit, to: EnergyUnit): number {
  return energyToJoule[from] / energyToJoule[to];
}

/**
 * Common energy conversions
 */
export const commonEnergyConversions: Array<{ from: EnergyUnit; to: EnergyUnit; factor: string }> = [
  { from: 'kcal', to: 'kJ', factor: '4,184' },
  { from: 'kJ', to: 'kcal', factor: '0,239' },
  { from: 'kWh', to: 'MJ', factor: '3,6' },
  { from: 'J', to: 'cal', factor: '0,239' },
  { from: 'BTU', to: 'kWh', factor: '0,000293' },
];
