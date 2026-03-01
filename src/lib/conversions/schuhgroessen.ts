/**
 * Shoe size conversion library for UmrechnerPro
 * Supports EU, UK, US (Men/Women), and cm sizing
 */

export type ShoeSizeSystem = 'EU' | 'UK' | 'US_Men' | 'US_Women' | 'cm';

export interface ShoeSizeConversion {
  eu: number;
  uk: number;
  usMen: number;
  usWomen: number;
  cm: number;
}

/**
 * Shoe size conversion table
 * Based on standard conversion formulas and common sizes
 */
export const shoeSizeTable: ShoeSizeConversion[] = [
  { eu: 35, uk: 2, usMen: 3, usWomen: 4.5, cm: 22 },
  { eu: 35.5, uk: 2.5, usMen: 3.5, usWomen: 5, cm: 22.5 },
  { eu: 36, uk: 3, usMen: 4, usWomen: 5.5, cm: 23 },
  { eu: 37, uk: 3.5, usMen: 4.5, usWomen: 6, cm: 23.5 },
  { eu: 37.5, uk: 4, usMen: 5, usWomen: 6.5, cm: 24 },
  { eu: 38, uk: 4.5, usMen: 5.5, usWomen: 7, cm: 24.5 },
  { eu: 39, uk: 5.5, usMen: 6.5, usWomen: 8, cm: 25 },
  { eu: 40, uk: 6, usMen: 7, usWomen: 8.5, cm: 25.5 },
  { eu: 41, uk: 7, usMen: 8, usWomen: 9.5, cm: 26 },
  { eu: 42, uk: 7.5, usMen: 8.5, usWomen: 10, cm: 26.5 },
  { eu: 43, uk: 8.5, usMen: 9.5, usWomen: 11, cm: 27.5 },
  { eu: 44, uk: 9.5, usMen: 10.5, usWomen: 12, cm: 28 },
  { eu: 45, uk: 10.5, usMen: 11.5, usWomen: 13, cm: 29 },
  { eu: 46, uk: 11, usMen: 12, usWomen: 13.5, cm: 29.5 },
  { eu: 47, uk: 12, usMen: 13, usWomen: 14.5, cm: 30 },
  { eu: 48, uk: 13, usMen: 14, usWomen: 15.5, cm: 31 },
  { eu: 49, uk: 14, usMen: 15, usWomen: 16.5, cm: 32 },
  { eu: 50, uk: 15, usMen: 16, usWomen: 17.5, cm: 33 },
];

/**
 * Convert shoe size between systems
 */
export function convertShoeSize(
  value: number,
  from: ShoeSizeSystem,
  to: ShoeSizeSystem
): number | null {
  if (from === to) return value;
  
  // Find closest matching size in the table
  let closestEntry: ShoeSizeConversion | null = null;
  let minDiff = Infinity;
  
  for (const entry of shoeSizeTable) {
    let diff: number;
    
    switch (from) {
      case 'EU':
        diff = Math.abs(entry.eu - value);
        break;
      case 'UK':
        diff = Math.abs(entry.uk - value);
        break;
      case 'US_Men':
        diff = Math.abs(entry.usMen - value);
        break;
      case 'US_Women':
        diff = Math.abs(entry.usWomen - value);
        break;
      case 'cm':
        diff = Math.abs(entry.cm - value);
        break;
      default:
        diff = Infinity;
    }
    
    if (diff < minDiff) {
      minDiff = diff;
      closestEntry = entry;
    }
  }
  
  if (!closestEntry) return null;
  
  // If using formulas for interpolation
  if (minDiff > 0.5) {
    // Use conversion formulas for better precision
    return convertShoeSizeByFormula(value, from, to);
  }
  
  switch (to) {
    case 'EU':
      return closestEntry.eu;
    case 'UK':
      return closestEntry.uk;
    case 'US_Men':
      return closestEntry.usMen;
    case 'US_Women':
      return closestEntry.usWomen;
    case 'cm':
      return closestEntry.cm;
    default:
      return null;
  }
}

/**
 * Formula-based shoe size conversion (approximate)
 */
function convertShoeSizeByFormula(value: number, from: ShoeSizeSystem, to: ShoeSizeSystem): number {
  // Convert to cm first (foot length)
  let cm: number;
  
  switch (from) {
    case 'EU':
      cm = (value - 2) * 0.667; // EU formula approximation
      break;
    case 'UK':
      cm = (value + 23) * 0.846; // UK formula approximation
      break;
    case 'US_Men':
      cm = (value + 23.5) * 0.846; // US Men formula
      break;
    case 'US_Women':
      cm = (value + 22) * 0.846; // US Women formula
      break;
    case 'cm':
      cm = value;
      break;
    default:
      cm = value;
  }
  
  // Convert from cm to target
  switch (to) {
    case 'EU':
      return Math.round((cm / 0.667 + 2) * 2) / 2; // Round to nearest 0.5
    case 'UK':
      return Math.round((cm / 0.846 - 23) * 2) / 2;
    case 'US_Men':
      return Math.round((cm / 0.846 - 23.5) * 2) / 2;
    case 'US_Women':
      return Math.round((cm / 0.846 - 22) * 2) / 2;
    case 'cm':
      return cm;
    default:
      return cm;
  }
}

/**
 * Get all size conversions for a given size
 */
export function getAllShoeSizes(euSize: number): ShoeSizeConversion | null {
  const entry = shoeSizeTable.find(s => s.eu === euSize);
  return entry || null;
}

/**
 * Get recommended size based on foot length in cm
 */
export function getRecommendedShoeSize(footLengthCm: number): ShoeSizeConversion {
  // Add ~1-1.5cm for comfort
  const insoleLength = footLengthCm + 1.2;
  
  // Find best matching size
  let bestMatch = shoeSizeTable[0];
  let minDiff = Math.abs(shoeSizeTable[0].cm - insoleLength);
  
  for (const size of shoeSizeTable) {
    const diff = Math.abs(size.cm - insoleLength);
    if (diff < minDiff) {
      minDiff = diff;
      bestMatch = size;
    }
  }
  
  return bestMatch;
}
