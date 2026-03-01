/**
 * Typography units conversion library for UmrechnerPro
 * px, pt, em, rem, and physical units
 */

export type TypographyUnit = 
  | 'px'     // Pixel
  | 'pt'     // Punkt (Point)
  | 'pc'     // Pica
  | 'em'     // Em (relativ)
  | 'rem'    // Root Em
  | 'in'     // Zoll
  | 'mm'     // Millimeter
  | 'cm';    // Zentimeter

export interface TypographyUnitInfo {
  symbol: TypographyUnit;
  name: string;
  nameEn: string;
  description: string;
}

/**
 * Conversion factors assuming 96 DPI (standard web)
 * 1 inch = 96 px = 72 pt
 * Therefore: 1 px = 0.75 pt
 */
export const typographyToPx: Record<TypographyUnit, number> = {
  px: 1,                  // Pixel
  pt: 96 / 72,            // Point (1 pt = 1/72 inch = 96/72 px)
  pc: 96 / 72 * 12,       // Pica (1 pc = 12 pt)
  em: 16,                 // Em (assuming default 16px base)
  rem: 16,                // Root Em (assuming default 16px base)
  in: 96,                 // Inch
  mm: 96 / 25.4,          // Millimeter
  cm: 96 / 2.54,          // Centimeter
};

export const typographyUnitInfo: Record<TypographyUnit, TypographyUnitInfo> = {
  px: { symbol: 'px', name: 'Pixel', nameEn: 'Pixel', description: 'Ein Bildschirmpixel' },
  pt: { symbol: 'pt', name: 'Punkt', nameEn: 'Point', description: 'Typografische Einheit (1/72 Zoll)' },
  pc: { symbol: 'pc', name: 'Pica', nameEn: 'Pica', description: 'Typografische Einheit (12 Punkte)' },
  em: { symbol: 'em', name: 'Em', nameEn: 'Em', description: 'Relativ zur Schriftgröße des Elternelements' },
  rem: { symbol: 'rem', name: 'Root Em', nameEn: 'Root Em', description: 'Relativ zur Wurzel-Schriftgröße' },
  in: { symbol: 'in', name: 'Zoll', nameEn: 'Inch', description: 'Englisches Zoll' },
  mm: { symbol: 'mm', name: 'Millimeter', nameEn: 'Millimeter', description: 'Metrische Einheit' },
  cm: { symbol: 'cm', name: 'Zentimeter', nameEn: 'Centimeter', description: 'Metrische Einheit' },
};

/**
 * Convert typography value from one unit to another
 * @param baseFontSize - Base font size in pixels (default: 16)
 */
export function convertTypography(
  value: number,
  from: TypographyUnit,
  to: TypographyUnit,
  baseFontSize: number = 16
): number {
  if (from === to) return value;
  
  // Convert to pixels first
  let inPixels: number;
  
  switch (from) {
    case 'em':
    case 'rem':
      inPixels = value * baseFontSize;
      break;
    default:
      inPixels = value * typographyToPx[from];
  }
  
  // Convert from pixels to target
  switch (to) {
    case 'em':
    case 'rem':
      return inPixels / baseFontSize;
    default:
      return inPixels / typographyToPx[to];
  }
}

/**
 * Common typography conversions for display
 */
export const commonTypographyConversions: Array<{ 
  description: string; 
  px: number; 
  pt: number;
  em: string;
}> = [
  { description: 'Sehr klein', px: 10, pt: 7.5, em: '0.625em' },
  { description: 'Klein', px: 12, pt: 9, em: '0.75em' },
  { description: 'Normal', px: 16, pt: 12, em: '1em' },
  { description: 'Mittel', px: 18, pt: 13.5, em: '1.125em' },
  { description: 'Groß', px: 24, pt: 18, em: '1.5em' },
  { description: 'Sehr groß', px: 32, pt: 24, em: '2em' },
  { description: 'Überschrift', px: 48, pt: 36, em: '3em' },
];

/**
 * Calculate line-height from font-size
 * @param fontSizePx - Font size in pixels
 * @param lineHeight - Line height value (unitless or with unit)
 */
export function calculateLineHeight(fontSizePx: number, lineHeight: number | string): number {
  if (typeof lineHeight === 'number') {
    return fontSizePx * lineHeight;
  }
  
  // Parse line-height string
  if (lineHeight.endsWith('px')) {
    return parseFloat(lineHeight);
  }
  if (lineHeight.endsWith('em') || lineHeight.endsWith('rem')) {
    return fontSizePx * parseFloat(lineHeight);
  }
  if (lineHeight.endsWith('%')) {
    return fontSizePx * (parseFloat(lineHeight) / 100);
  }
  
  // Unitless value
  return fontSizePx * parseFloat(lineHeight);
}

/**
 * Get CSS font-size string
 */
export function getCSSFontSize(value: number, unit: TypographyUnit): string {
  return `${value}${unit}`;
}

/**
 * Convert px to accessible rem (for accessibility)
 * Returns rem value for use in CSS
 */
export function pxToRem(px: number, baseFontSize: number = 16): number {
  return px / baseFontSize;
}

/**
 * Convert rem to px
 */
export function remToPx(rem: number, baseFontSize: number = 16): number {
  return rem * baseFontSize;
}
