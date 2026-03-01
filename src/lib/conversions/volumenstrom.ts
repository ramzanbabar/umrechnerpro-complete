/**
 * Volume flow rate conversion library for UmrechnerPro
 */

export type VolumeFlowUnit = 
  | 'm³/s'      // Cubic meter per second
  | 'm³/min'    // Cubic meter per minute
  | 'm³/h'      // Cubic meter per hour
  | 'L/s'       // Liter per second
  | 'L/min'     // Liter per minute
  | 'L/h'       // Liter per hour
  | 'mL/s'      // Milliliter per second
  | 'cm³/s'     // Cubic centimeter per second
  | 'ft³/s'     // Cubic foot per second
  | 'ft³/min'   // Cubic foot per minute (CFM)
  | 'gal_us/min' // US Gallon per minute (GPM)
  | 'gal_us/h'; // US Gallon per hour (GPH)

export const volumeFlowToM3S: Record<VolumeFlowUnit, number> = {
  'm³/s': 1,
  'm³/min': 1/60,
  'm³/h': 1/3600,
  'L/s': 0.001,
  'L/min': 0.001/60,
  'L/h': 0.001/3600,
  'mL/s': 1e-6,
  'cm³/s': 1e-6,
  'ft³/s': 0.028316846592,
  'ft³/min': 0.028316846592/60,  // CFM
  'gal_us/min': 3.785411784/1000/60,  // GPM
  'gal_us/h': 3.785411784/1000/3600,  // GPH
};

export function convertVolumeFlow(
  value: number,
  from: VolumeFlowUnit,
  to: VolumeFlowUnit
): number {
  if (from === to) return value;
  const inM3S = value * volumeFlowToM3S[from];
  return inM3S / volumeFlowToM3S[to];
}

/**
 * Mass flow rate conversion library
 */

export type MassFlowUnit = 
  | 'kg/s'      // Kilogram per second
  | 'kg/min'    // Kilogram per minute
  | 'kg/h'      // Kilogram per hour
  | 'g/s'       // Gram per second
  | 'g/min'     // Gram per minute
  | 'lb/s'      // Pound per second
  | 'lb/min'    // Pound per minute
  | 'lb/h'      // Pound per hour
  | 't/h';      // Metric ton per hour

export const massFlowToKgS: Record<MassFlowUnit, number> = {
  'kg/s': 1,
  'kg/min': 1/60,
  'kg/h': 1/3600,
  'g/s': 0.001,
  'g/min': 0.001/60,
  'lb/s': 0.45359237,
  'lb/min': 0.45359237/60,
  'lb/h': 0.45359237/3600,
  't/h': 1000/3600,
};

export function convertMassFlow(
  value: number,
  from: MassFlowUnit,
  to: MassFlowUnit
): number {
  if (from === to) return value;
  const inKgS = value * massFlowToKgS[from];
  return inKgS / massFlowToKgS[to];
}
