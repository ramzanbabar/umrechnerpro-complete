/**
 * Temperature conversion library for UmrechnerPro
 * Temperature uses formulas, not simple factors
 * Base reference: Celsius
 */

export type TemperatureUnit = 
  | 'C'     // Celsius
  | 'F'     // Fahrenheit
  | 'K'     // Kelvin
  | 'R'     // Rankine
  | 'Ré'    // Réaumur
  | 'Rø'    // Rømer
  | 'N'     // Newton
  | 'De';   // Delisle

export interface TemperatureUnitInfo {
  symbol: TemperatureUnit;
  name: string;
  nameEn: string;
  freezingPoint: number;  // Water freezing point in this scale
  boilingPoint: number;   // Water boiling point in this scale
}

export const temperatureUnitInfo: Record<TemperatureUnit, TemperatureUnitInfo> = {
  C: { symbol: 'C', name: 'Celsius', nameEn: 'Celsius', freezingPoint: 0, boilingPoint: 100 },
  F: { symbol: 'F', name: 'Fahrenheit', nameEn: 'Fahrenheit', freezingPoint: 32, boilingPoint: 212 },
  K: { symbol: 'K', name: 'Kelvin', nameEn: 'Kelvin', freezingPoint: 273.15, boilingPoint: 373.15 },
  R: { symbol: 'R', name: 'Rankine', nameEn: 'Rankine', freezingPoint: 491.67, boilingPoint: 671.67 },
  Ré: { symbol: 'Ré', name: 'Réaumur', nameEn: 'Reaumur', freezingPoint: 0, boilingPoint: 80 },
  Rø: { symbol: 'Rø', name: 'Rømer', nameEn: 'Romer', freezingPoint: 7.5, boilingPoint: 60 },
  N: { symbol: 'N', name: 'Newton', nameEn: 'Newton', freezingPoint: 0, boilingPoint: 33 },
  De: { symbol: 'De', name: 'Delisle', nameEn: 'Delisle', freezingPoint: 150, boilingPoint: 0 },
};

/**
 * Convert temperature value from one unit to another
 * Uses formula-based conversion (not factor-based)
 */
export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) return value;
  
  // First convert to Celsius (base reference)
  let celsius: number;
  
  switch (from) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    case 'R':
      celsius = (value - 491.67) * 5 / 9;
      break;
    case 'Ré':
      celsius = value * 1.25;  // Réaumur = Celsius * 0.8
      break;
    case 'Rø':
      celsius = (value - 7.5) * 40 / 21;
      break;
    case 'N':
      celsius = value * 100 / 33;
      break;
    case 'De':
      celsius = 100 - value * 2 / 3;
      break;
    default:
      celsius = value;
  }
  
  // Then convert from Celsius to target unit
  switch (to) {
    case 'C':
      return celsius;
    case 'F':
      return celsius * 9 / 5 + 32;
    case 'K':
      return celsius + 273.15;
    case 'R':
      return (celsius + 273.15) * 9 / 5;
    case 'Ré':
      return celsius * 0.8;
    case 'Rø':
      return celsius * 21 / 40 + 7.5;
    case 'N':
      return celsius * 33 / 100;
    case 'De':
      return (100 - celsius) * 3 / 2;
    default:
      return celsius;
  }
}

/**
 * Get conversion formula as string
 */
export function getTemperatureFormula(from: TemperatureUnit, to: TemperatureUnit): string {
  if (from === to) return 'Identische Einheiten';
  
  // Common formulas
  const formulas: Record<string, string> = {
    'C-F': '°F = °C × 9/5 + 32',
    'F-C': '°C = (°F - 32) × 5/9',
    'C-K': 'K = °C + 273,15',
    'K-C': '°C = K - 273,15',
    'F-K': 'K = (°F - 32) × 5/9 + 273,15',
    'K-F': '°F = (K - 273,15) × 9/5 + 32',
  };
  
  const key = `${from}-${to}`;
  return formulas[key] || `Konvertierung über Celsius als Referenz`;
}

/**
 * Common temperature reference points
 */
export const temperatureReferencePoints: Array<{ name: string; celsius: number }> = [
  { name: 'Absoluter Nullpunkt', celsius: -273.15 },
  { name: 'Gefrierpunkt von Wasser', celsius: 0 },
  { name: 'Körpertemperatur', celsius: 37 },
  { name: 'Siedepunkt von Wasser', celsius: 100 },
  { name: 'Ofentemperatur (Backen)', celsius: 180 },
  { name: 'Flamme (Kerze)', celsius: 1400 },
];
