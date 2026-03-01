/**
 * Fuel consumption conversion library for UmrechnerPro
 * Note: L/100km and MPG are INVERSE relationships
 */

export type FuelConsumptionUnit = 
  | 'L/100km'   // Liter pro 100 Kilometer
  | 'km/L'      // Kilometer pro Liter
  | 'mpg_us'    // Meilen pro Gallone (US)
  | 'mpg_uk'    // Meilen pro Gallone (UK)
  | 'L/km';     // Liter pro Kilometer

export interface FuelConsumptionUnitInfo {
  symbol: FuelConsumptionUnit;
  name: string;
  nameEn: string;
  description: string;
}

export const fuelConsumptionUnitInfo: Record<FuelConsumptionUnit, FuelConsumptionUnitInfo> = {
  'L/100km': { 
    symbol: 'L/100km', 
    name: 'Liter pro 100 km', 
    nameEn: 'Liters per 100 Kilometers',
    description: 'Verbrauch in Litern für 100 km'
  },
  'km/L': { 
    symbol: 'km/L', 
    name: 'Kilometer pro Liter', 
    nameEn: 'Kilometers per Liter',
    description: 'Reichweite in km pro Liter Kraftstoff'
  },
  'mpg_us': { 
    symbol: 'mpg_us', 
    name: 'Meilen pro Gallone (US)', 
    nameEn: 'Miles per US Gallon',
    description: 'Reichweite in US-Meilen pro US-Gallone'
  },
  'mpg_uk': { 
    symbol: 'mpg_uk', 
    name: 'Meilen pro Gallone (UK)', 
    nameEn: 'Miles per UK Gallon',
    description: 'Reichweite in UK-Meilen pro UK-Gallone'
  },
  'L/km': { 
    symbol: 'L/km', 
    name: 'Liter pro Kilometer', 
    nameEn: 'Liters per Kilometer',
    description: 'Verbrauch in Litern pro km'
  },
};

/**
 * Convert fuel consumption value from one unit to another
 */
export function convertFuelConsumption(
  value: number, 
  from: FuelConsumptionUnit, 
  to: FuelConsumptionUnit
): number {
  if (from === to) return value;
  
  // Convert to L/100km first
  let lPer100km: number;
  
  switch (from) {
    case 'L/100km':
      lPer100km = value;
      break;
    case 'km/L':
      lPer100km = value > 0 ? 100 / value : 0;
      break;
    case 'mpg_us':
      // 1 US gallon = 3.78541 L, 1 mile = 1.60934 km
      lPer100km = value > 0 ? (100 * 3.78541) / (value * 1.60934) : 0;
      break;
    case 'mpg_uk':
      // 1 UK gallon = 4.54609 L, 1 mile = 1.60934 km
      lPer100km = value > 0 ? (100 * 4.54609) / (value * 1.60934) : 0;
      break;
    case 'L/km':
      lPer100km = value * 100;
      break;
    default:
      lPer100km = value;
  }
  
  // Convert from L/100km to target unit
  switch (to) {
    case 'L/100km':
      return lPer100km;
    case 'km/L':
      return lPer100km > 0 ? 100 / lPer100km : 0;
    case 'mpg_us':
      return lPer100km > 0 ? (100 * 3.78541) / (lPer100km * 1.60934) : 0;
    case 'mpg_uk':
      return lPer100km > 0 ? (100 * 4.54609) / (lPer100km * 1.60934) : 0;
    case 'L/km':
      return lPer100km / 100;
    default:
      return lPer100km;
  }
}

/**
 * Common fuel consumption conversions
 */
export const commonFuelConsumptionConversions: Array<{ 
  from: FuelConsumptionUnit; 
  to: FuelConsumptionUnit; 
  example: string 
}> = [
  { from: 'L/100km', to: 'mpg_us', example: '8 L/100km ≈ 29,4 mpg (US)' },
  { from: 'mpg_us', to: 'L/100km', example: '30 mpg ≈ 7,8 L/100km' },
  { from: 'L/100km', to: 'km/L', example: '8 L/100km = 12,5 km/L' },
];

/**
 * Calculate CO2 emissions estimate (approximate)
 * @param lPer100km - Fuel consumption in L/100km
 * @param fuelType - 'petrol' or 'diesel'
 * @returns CO2 emissions in g/km
 */
export function estimateCO2Emissions(lPer100km: number, fuelType: 'petrol' | 'diesel' = 'petrol'): number {
  // Approximate: Petrol ~2.31 kg CO2/L, Diesel ~2.68 kg CO2/L
  const factor = fuelType === 'diesel' ? 2.68 : 2.31;
  return lPer100km * factor * 10; // Convert to g/km
}
