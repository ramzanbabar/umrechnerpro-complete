/**
 * Roman numerals conversion library for UmrechnerPro
 * Supports range 1 - 3,999,999
 */

const romanNumerals: Array<{ value: number; numeral: string }> = [
  { value: 1000000, numeral: 'M̄' },
  { value: 900000, numeral: 'C̄M̄' },
  { value: 500000, numeral: 'D̄' },
  { value: 400000, numeral: 'C̄D̄' },
  { value: 100000, numeral: 'C̄' },
  { value: 90000, numeral: 'X̄C̄' },
  { value: 50000, numeral: 'L̄' },
  { value: 40000, numeral: 'X̄L̄' },
  { value: 10000, numeral: 'X̄' },
  { value: 9000, numeral: 'MX̄' },
  { value: 5000, numeral: 'V̄' },
  { value: 4000, numeral: 'MV̄' },
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
];

const romanToDecimalMap: Record<string, number> = {
  'I': 1, 'V': 5, 'X': 10, 'L': 50,
  'C': 100, 'D': 500, 'M': 1000,
  'I̅': 1000, 'V̅': 5000, 'X̅': 10000, 'L̅': 50000,
  'C̅': 100000, 'D̅': 500000, 'M̅': 1000000,
};

/**
 * Convert decimal to Roman numeral
 */
export function decimalToRoman(decimal: number): string {
  if (decimal < 1 || decimal > 3999999) {
    throw new Error('Zahl muss zwischen 1 und 3.999.999 liegen');
  }
  
  let result = '';
  let remaining = decimal;
  
  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  
  return result;
}

/**
 * Convert Roman numeral to decimal
 */
export function romanToDecimal(roman: string): number {
  if (!roman || roman.trim() === '') {
    throw new Error('Römische Zahl darf nicht leer sein');
  }
  
  const upperRoman = roman.toUpperCase().trim();
  let result = 0;
  let i = 0;
  
  // Handle overline characters (multiplied by 1000)
  const overlineChars: Record<string, string> = {
    'V̄': 'V', 'X̄': 'X', 'L̄': 'L', 'C̄': 'C', 'D̄': 'D', 'M̄': 'M',
  };
  
  while (i < upperRoman.length) {
    // Check for overline characters (2-char sequences)
    let currentChar = upperRoman[i];
    let multiplier = 1;
    
    // Check if next char is combining overline
    if (i + 1 < upperRoman.length && upperRoman[i + 1] === '\u0305') {
      multiplier = 1000;
      i++; // Skip the combining character
    }
    
    // Check for precomposed overline characters
    if (overlineChars[currentChar]) {
      multiplier = 1000;
    }
    
    const currentValue = (romanToDecimalMap[currentChar] || 0) * 
                         (multiplier === 1000 && !overlineChars[currentChar] ? 1 : 
                          overlineChars[currentChar] ? 1000 : 1);
    
    if (!currentValue && !overlineChars[currentChar]) {
      throw new Error(`Ungültiges römisches Zeichen: ${currentChar}`);
    }
    
    // Look ahead for subtractive notation
    let nextChar = upperRoman[i + 1];
    let nextMultiplier = 1;
    
    if (i + 2 < upperRoman.length && upperRoman[i + 2] === '\u0305') {
      nextMultiplier = 1000;
    }
    
    if (overlineChars[nextChar]) {
      nextMultiplier = 1000;
    }
    
    const nextValue = nextChar ? 
      ((romanToDecimalMap[nextChar] || 0) * 
       (nextMultiplier === 1000 && !overlineChars[nextChar] ? 1 : 
        overlineChars[nextChar] ? 1000 : 1)) : 0;
    
    if (nextChar && nextValue > currentValue * (overlineChars[currentChar] ? 1000 : 1)) {
      result += nextValue - currentValue * (overlineChars[currentChar] ? 1 : 1);
      i += 2;
    } else {
      result += currentValue;
      i++;
    }
  }
  
  return result;
}

/**
 * Validate Roman numeral format
 */
export function isValidRomanNumeral(roman: string): boolean {
  try {
    romanToDecimal(roman);
    return true;
  } catch {
    return false;
  }
}

/**
 * Common Roman numeral examples
 */
export const romanNumeralExamples: Array<{ decimal: number; roman: string }> = [
  { decimal: 1, roman: 'I' },
  { decimal: 4, roman: 'IV' },
  { decimal: 5, roman: 'V' },
  { decimal: 9, roman: 'IX' },
  { decimal: 10, roman: 'X' },
  { decimal: 40, roman: 'XL' },
  { decimal: 50, roman: 'L' },
  { decimal: 90, roman: 'XC' },
  { decimal: 100, roman: 'C' },
  { decimal: 400, roman: 'CD' },
  { decimal: 500, roman: 'D' },
  { decimal: 900, roman: 'CM' },
  { decimal: 1000, roman: 'M' },
  { decimal: 2024, roman: 'MMXXIV' },
  { decimal: 2026, roman: 'MMXXVI' },
];
