/**
 * German number formatting utilities for UmrechnerPro
 * All outputs use de-DE locale with comma as decimal separator
 */

/**
 * Format a number using German locale
 * @param value - The number to format
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted string with German conventions
 */
export function formatGermanNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0,
    ...options,
  };
  
  return new Intl.NumberFormat('de-DE', defaultOptions).format(value);
}

/**
 * Format a number as German percentage (with space before %)
 * @param value - The decimal value (0.0525 = 5.25%)
 * @param decimals - Number of decimal places
 */
export function formatGermanPercent(value: number, decimals: number = 2): string {
  const formatted = formatGermanNumber(value * 100, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
  return `${formatted} %`;
}

/**
 * Format a number in scientific notation (German style)
 * @param value - The number to format
 * @param decimals - Number of decimal places
 */
export function formatScientificGerman(value: number, decimals: number = 2): string {
  if (value === 0) return '0';
  
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);
  
  const formattedMantissa = formatGermanNumber(mantissa, {
    maximumFractionDigits: decimals,
  });
  
  // Convert exponent to superscript
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '-': '⁻', '+': '⁺',
  };
  
  const exponentStr = exponent.toString().split('').map(c => superscripts[c] || c).join('');
  
  return `${formattedMantissa} × 10${exponentStr}`;
}

/**
 * Smart format - automatically chooses between regular and scientific
 * @param value - The number to format
 */
export function smartFormat(value: number): string {
  if (value === 0) return '0';
  
  const absValue = Math.abs(value);
  
  // Use scientific notation for very large or very small numbers
  if (absValue >= 1e9 || (absValue < 1e-4 && absValue > 0)) {
    return formatScientificGerman(value);
  }
  
  return formatGermanNumber(value);
}

/**
 * Parse a German-formatted number string
 * Accepts both comma and dot as decimal separator
 * @param str - The string to parse
 */
export function parseGermanNumber(str: string): number {
  if (!str || str.trim() === '') return NaN;
  
  // Remove thousand separators (German: periods)
  // Replace comma with dot for decimal
  const normalized = str
    .replace(/\./g, '')  // Remove thousand separators
    .replace(/,/g, '.')  // Convert decimal comma to dot
    .replace(/\s/g, ''); // Remove spaces
  
  return parseFloat(normalized);
}

/**
 * Format a currency value in EUR
 * @param value - The amount in EUR
 */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

/**
 * Format a date in German format
 * @param date - The date to format
 */
export function formatGermanDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Format bytes with proper unit
 * @param bytes - Number of bytes
 * @param decimals - Decimal places
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const value = bytes / Math.pow(k, i);
  return `${formatGermanNumber(value, { maximumFractionDigits: decimals })} ${sizes[i]}`;
}
