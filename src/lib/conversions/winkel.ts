/**
 * Angle conversion library for UmrechnerPro
 * Base unit: Radian (rad) - SI derived unit
 */

export type AngleUnit = 
  | 'rad'      // Radiant
  | 'mrad'     // Milliradiant
  | 'deg'      // Grad
  | 'arcmin'   // Bogenminute
  | 'arcsec'   // Bogensekunde
  | 'gon'      // Gon (Neugrad)
  | 'rev'      // Umdrehung
  | 'mil';     // Mil (NATO)

export interface AngleUnitInfo {
  symbol: AngleUnit;
  name: string;
  nameEn: string;
  toRadian: number;
}

/**
 * Conversion factors to Radians
 */
export const angleToRadian: Record<AngleUnit, number> = {
  rad: 1,                    // Radiant (SI unit)
  mrad: 0.001,               // Milliradiant
  deg: Math.PI / 180,        // Grad
  arcmin: Math.PI / 10800,   // Bogenminute (1/60 degree)
  arcsec: Math.PI / 648000,  // Bogensekunde (1/3600 degree)
  gon: Math.PI / 200,        // Gon (Neugrad) - 400 gon = 360 deg
  rev: 2 * Math.PI,          // Umdrehung
  mil: Math.PI / 3200,       // Mil (NATO) - 6400 mil = 360 deg
};

export const angleUnitInfo: Record<AngleUnit, AngleUnitInfo> = {
  rad: { symbol: 'rad', name: 'Radiant', nameEn: 'Radian', toRadian: 1 },
  mrad: { symbol: 'mrad', name: 'Milliradiant', nameEn: 'Milliradian', toRadian: 0.001 },
  deg: { symbol: 'deg', name: 'Grad', nameEn: 'Degree', toRadian: Math.PI / 180 },
  arcmin: { symbol: 'arcmin', name: 'Bogenminute', nameEn: 'Arcminute', toRadian: Math.PI / 10800 },
  arcsec: { symbol: 'arcsec', name: 'Bogensekunde', nameEn: 'Arcsecond', toRadian: Math.PI / 648000 },
  gon: { symbol: 'gon', name: 'Gon', nameEn: 'Gon', toRadian: Math.PI / 200 },
  rev: { symbol: 'rev', name: 'Umdrehung', nameEn: 'Revolution', toRadian: 2 * Math.PI },
  mil: { symbol: 'mil', name: 'Mil (NATO)', nameEn: 'NATO Mil', toRadian: Math.PI / 3200 },
};

/**
 * Convert angle value from one unit to another
 */
export function convertAngle(value: number, from: AngleUnit, to: AngleUnit): number {
  if (from === to) return value;
  const inRadians = value * angleToRadian[from];
  return inRadians / angleToRadian[to];
}

/**
 * Get conversion factor between two units
 */
export function getAngleConversionFactor(from: AngleUnit, to: AngleUnit): number {
  return angleToRadian[from] / angleToRadian[to];
}

/**
 * Format angle as degrees, minutes, seconds
 */
export function formatDMS(decimalDegrees: number): string {
  const sign = decimalDegrees < 0 ? '-' : '';
  const abs = Math.abs(decimalDegrees);
  const degrees = Math.floor(abs);
  const minutesFloat = (abs - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);
  
  return `${sign}${degrees} deg ${minutes}' ${seconds}"`;
}

/**
 * Common angle conversions
 */
export const commonAngleConversions: Array<{ from: AngleUnit; to: AngleUnit; factor: string }> = [
  { from: 'deg', to: 'rad', factor: 'pi/180 = 0,01745' },
  { from: 'rad', to: 'deg', factor: '180/pi = 57,296' },
  { from: 'deg', to: 'gon', factor: '10/9 = 1,111' },
  { from: 'gon', to: 'deg', factor: '0,9' },
  { from: 'rad', to: 'rev', factor: '1/(2 pi) = 0,159' },
];
