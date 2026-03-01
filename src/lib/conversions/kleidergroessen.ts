/**
 * Clothing size conversion library for UmrechnerPro
 * Supports EU, UK, US, IT, FR sizing for Damen (Women), Herren (Men), Kinder (Children)
 */

export interface ClothingSize {
  eu: string;
  uk: string;
  us: string;
  it: string;
  fr: string;
  chestCm?: number;
  waistCm?: number;
  hipCm?: number;
}

/**
 * Damen (Women) clothing sizes
 */
export const womenClothingSizes: ClothingSize[] = [
  { eu: '32', uk: '4', us: '0', it: '36', fr: '34', chestCm: 80, waistCm: 64, hipCm: 88 },
  { eu: '34', uk: '6', us: '2', it: '38', fr: '36', chestCm: 84, waistCm: 68, hipCm: 92 },
  { eu: '36', uk: '8', us: '4', it: '40', fr: '38', chestCm: 88, waistCm: 72, hipCm: 96 },
  { eu: '38', uk: '10', us: '6', it: '42', fr: '40', chestCm: 92, waistCm: 76, hipCm: 100 },
  { eu: '40', uk: '12', us: '8', it: '44', fr: '42', chestCm: 96, waistCm: 80, hipCm: 104 },
  { eu: '42', uk: '14', us: '10', it: '46', fr: '44', chestCm: 100, waistCm: 84, hipCm: 108 },
  { eu: '44', uk: '16', us: '12', it: '48', fr: '46', chestCm: 104, waistCm: 88, hipCm: 112 },
  { eu: '46', uk: '18', us: '14', it: '50', fr: '48', chestCm: 108, waistCm: 92, hipCm: 116 },
  { eu: '48', uk: '20', us: '16', it: '52', fr: '50', chestCm: 112, waistCm: 96, hipCm: 120 },
  { eu: '50', uk: '22', us: '18', it: '54', fr: '52', chestCm: 116, waistCm: 100, hipCm: 124 },
];

/**
 * Herren (Men) clothing sizes
 */
export const menClothingSizes: ClothingSize[] = [
  { eu: '44', uk: '34', us: '34', it: '44', fr: '44', chestCm: 88, waistCm: 74 },
  { eu: '46', uk: '36', us: '36', it: '46', fr: '46', chestCm: 92, waistCm: 78 },
  { eu: '48', uk: '38', us: '38', it: '48', fr: '48', chestCm: 96, waistCm: 82 },
  { eu: '50', uk: '40', us: '40', it: '50', fr: '50', chestCm: 100, waistCm: 86 },
  { eu: '52', uk: '42', us: '42', it: '52', fr: '52', chestCm: 104, waistCm: 90 },
  { eu: '54', uk: '44', us: '44', it: '54', fr: '54', chestCm: 108, waistCm: 94 },
  { eu: '56', uk: '46', us: '46', it: '56', fr: '56', chestCm: 112, waistCm: 98 },
  { eu: '58', uk: '48', us: '48', it: '58', fr: '58', chestCm: 116, waistCm: 102 },
  { eu: '60', uk: '50', us: '50', it: '60', fr: '60', chestCm: 120, waistCm: 106 },
];

/**
 * Kinder (Children) clothing sizes - based on height
 */
export const childrenClothingSizes: Array<{ height: string; eu: string; uk: string; us: string; age: string }> = [
  { height: '92', eu: '92', uk: '2-3', us: '2T', age: '2-3 Jahre' },
  { height: '98', eu: '98', uk: '3-4', us: '3T', age: '3-4 Jahre' },
  { height: '104', eu: '104', uk: '4-5', us: '4T', age: '4-5 Jahre' },
  { height: '110', eu: '110', uk: '5-6', us: '5', age: '5-6 Jahre' },
  { height: '116', eu: '116', uk: '6-7', us: '6', age: '6-7 Jahre' },
  { height: '122', eu: '122', uk: '7-8', us: '7', age: '7-8 Jahre' },
  { height: '128', eu: '128', uk: '8-9', us: '8', age: '8-9 Jahre' },
  { height: '134', eu: '134', uk: '9-10', us: '9-10', age: '9-10 Jahre' },
  { height: '140', eu: '140', uk: '10-11', us: '10', age: '10-11 Jahre' },
  { height: '146', eu: '146', uk: '11-12', us: '11-12', age: '11-12 Jahre' },
  { height: '152', eu: '152', uk: '12-13', us: '12-13', age: '12-13 Jahre' },
  { height: '158', eu: '158', uk: '13-14', us: '14', age: '13-14 Jahre' },
  { height: '164', eu: '164', uk: '14-15', us: '16', age: '14-15 Jahre' },
];

export type ClothingCategory = 'damen' | 'herren' | 'kinder';

/**
 * Convert clothing size between systems
 */
export function convertClothingSize(
  value: string,
  fromSystem: 'EU' | 'UK' | 'US' | 'IT' | 'FR',
  toSystem: 'EU' | 'UK' | 'US' | 'IT' | 'FR',
  category: ClothingCategory
): string | null {
  if (fromSystem === toSystem) return value;
  
  const sizes = category === 'damen' ? womenClothingSizes : 
                category === 'herren' ? menClothingSizes : null;
  
  if (!sizes) return null; // Children use height-based sizing
  
  const key = fromSystem.toLowerCase() as keyof ClothingSize;
  const targetKey = toSystem.toLowerCase() as keyof ClothingSize;
  
  const entry = sizes.find(s => s[key] === value);
  if (!entry) return null;
  
  const result = entry[targetKey];
  return typeof result === 'string' ? result : null;
}

/**
 * Get all size conversions for a given EU size
 */
export function getAllClothingSizes(euSize: string, category: ClothingCategory): ClothingSize | null {
  const sizes = category === 'damen' ? womenClothingSizes : 
                category === 'herren' ? menClothingSizes : null;
  
  if (!sizes) return null;
  
  return sizes.find(s => s.eu === euSize) || null;
}

/**
 * Get recommended size based on measurements
 */
export function getRecommendedClothingSize(
  category: 'damen' | 'herren',
  measurements: { chestCm?: number; waistCm?: number; hipCm?: number }
): ClothingSize | null {
  const sizes = category === 'damen' ? womenClothingSizes : menClothingSizes;
  
  for (const size of sizes) {
    let matches = true;
    
    if (measurements.chestCm && size.chestCm) {
      matches = matches && measurements.chestCm <= size.chestCm;
    }
    if (measurements.waistCm && size.waistCm) {
      matches = matches && measurements.waistCm <= size.waistCm;
    }
    if (measurements.hipCm && size.hipCm) {
      matches = matches && measurements.hipCm <= size.hipCm;
    }
    
    if (matches) return size;
  }
  
  return sizes[sizes.length - 1]; // Return largest size if no match
}
