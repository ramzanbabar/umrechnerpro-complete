/**
 * Number system conversion library for UmrechnerPro
 * Supports Decimal, Binary, Octal, Hexadecimal, and custom bases
 */

/**
 * Convert decimal to any base (2-36)
 */
export function decimalToBase(decimal: number, base: number): string {
  if (decimal === 0) return '0';
  if (base < 2 || base > 36) throw new Error('Base must be between 2 and 36');
  
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let num = Math.abs(decimal);
  
  while (num > 0) {
    result = digits[num % base] + result;
    num = Math.floor(num / base);
  }
  
  return decimal < 0 ? '-' + result : result;
}

/**
 * Convert from any base (2-36) to decimal
 */
export function baseToDecimal(value: string, base: number): number {
  if (base < 2 || base > 36) throw new Error('Base must be between 2 and 36');
  
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const upperValue = value.toUpperCase().replace('-', '');
  let result = 0;
  
  for (let i = 0; i < upperValue.length; i++) {
    const digit = digits.indexOf(upperValue[i]);
    if (digit === -1 || digit >= base) {
      throw new Error(`Invalid digit '${upperValue[i]}' for base ${base}`);
    }
    result = result * base + digit;
  }
  
  return value.startsWith('-') ? -result : result;
}

/**
 * Convert between any two bases
 */
export function convertBase(value: string, fromBase: number, toBase: number): string {
  const decimal = baseToDecimal(value, fromBase);
  return decimalToBase(decimal, toBase);
}

/**
 * Convert decimal to binary
 */
export function decimalToBinary(decimal: number): string {
  return decimalToBase(decimal, 2);
}

/**
 * Convert binary to decimal
 */
export function binaryToDecimal(binary: string): number {
  return baseToDecimal(binary, 2);
}

/**
 * Convert decimal to hexadecimal
 */
export function decimalToHex(decimal: number): string {
  return decimalToBase(decimal, 16);
}

/**
 * Convert hexadecimal to decimal
 */
export function hexToDecimal(hex: string): number {
  return baseToDecimal(hex.replace('0x', ''), 16);
}

/**
 * Convert decimal to octal
 */
export function decimalToOctal(decimal: number): string {
  return decimalToBase(decimal, 8);
}

/**
 * Convert octal to decimal
 */
export function octalToDecimal(octal: string): number {
  return baseToDecimal(octal, 8);
}

/**
 * Get binary representation with padding
 */
export function toBinaryPadded(decimal: number, bits: number = 8): string {
  const binary = decimalToBinary(Math.abs(decimal));
  const padded = binary.padStart(bits, '0');
  return padded.slice(-bits);
}

/**
 * Convert to 2's complement binary (for negative numbers)
 */
export function toTwosComplement(decimal: number, bits: number = 8): string {
  if (decimal >= 0) {
    return toBinaryPadded(decimal, bits);
  }
  
  // For negative numbers, calculate 2's complement
  const positive = Math.abs(decimal);
  const complement = (1 << bits) - positive;
  return toBinaryPadded(complement, bits);
}

/**
 * Parse and validate number in given base
 */
export function isValidNumberInBase(value: string, base: number): boolean {
  try {
    baseToDecimal(value, base);
    return true;
  } catch {
    return false;
  }
}

/**
 * Common number system conversions for display
 */
export const numberSystemExamples = [
  { decimal: 10, binary: '1010', octal: '12', hex: 'A' },
  { decimal: 16, binary: '10000', octal: '20', hex: '10' },
  { decimal: 255, binary: '11111111', octal: '377', hex: 'FF' },
  { decimal: 256, binary: '100000000', octal: '400', hex: '100' },
];
