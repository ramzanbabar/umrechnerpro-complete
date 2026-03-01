/**
 * Electrical units conversion library for UmrechnerPro
 * Voltage, Current, Resistance, Capacitance, Inductance, Charge
 */

// ============ VOLTAGE ============
export type VoltageUnit = 'µV' | 'mV' | 'V' | 'kV' | 'MV';

export const voltageToVolt: Record<VoltageUnit, number> = {
  µV: 1e-6,
  mV: 0.001,
  V: 1,
  kV: 1000,
  MV: 1000000,
};

export function convertVoltage(value: number, from: VoltageUnit, to: VoltageUnit): number {
  if (from === to) return value;
  const inVolts = value * voltageToVolt[from];
  return inVolts / voltageToVolt[to];
}

// ============ CURRENT ============
export type CurrentUnit = 'µA' | 'mA' | 'A' | 'kA';

export const currentToAmpere: Record<CurrentUnit, number> = {
  µA: 1e-6,
  mA: 0.001,
  A: 1,
  kA: 1000,
};

export function convertCurrent(value: number, from: CurrentUnit, to: CurrentUnit): number {
  if (from === to) return value;
  const inAmperes = value * currentToAmpere[from];
  return inAmperes / currentToAmpere[to];
}

// ============ RESISTANCE ============
export type ResistanceUnit = 'µΩ' | 'mΩ' | 'Ω' | 'kΩ' | 'MΩ' | 'GΩ';

export const resistanceToOhm: Record<ResistanceUnit, number> = {
  µΩ: 1e-6,
  mΩ: 0.001,
  Ω: 1,
  kΩ: 1000,
  MΩ: 1000000,
  GΩ: 1000000000,
};

export function convertResistance(value: number, from: ResistanceUnit, to: ResistanceUnit): number {
  if (from === to) return value;
  const inOhms = value * resistanceToOhm[from];
  return inOhms / resistanceToOhm[to];
}

// ============ CAPACITANCE ============
export type CapacitanceUnit = 'F' | 'mF' | 'µF' | 'nF' | 'pF' | 'fF';

export const capacitanceToFarad: Record<CapacitanceUnit, number> = {
  F: 1,
  mF: 0.001,
  µF: 1e-6,
  nF: 1e-9,
  pF: 1e-12,
  fF: 1e-15,
};

export function convertCapacitance(value: number, from: CapacitanceUnit, to: CapacitanceUnit): number {
  if (from === to) return value;
  const inFarads = value * capacitanceToFarad[from];
  return inFarads / capacitanceToFarad[to];
}

// ============ INDUCTANCE ============
export type InductanceUnit = 'H' | 'mH' | 'µH' | 'nH' | 'pH';

export const inductanceToHenry: Record<InductanceUnit, number> = {
  H: 1,
  mH: 0.001,
  µH: 1e-6,
  nH: 1e-9,
  pH: 1e-12,
};

export function convertInductance(value: number, from: InductanceUnit, to: InductanceUnit): number {
  if (from === to) return value;
  const inHenrys = value * inductanceToHenry[from];
  return inHenrys / inductanceToHenry[to];
}

// ============ CHARGE ============
export type ChargeUnit = 'C' | 'mC' | 'µC' | 'nC' | 'pC' | 'Ah' | 'mAh';

export const chargeToCoulomb: Record<ChargeUnit, number> = {
  C: 1,
  mC: 0.001,
  µC: 1e-6,
  nC: 1e-9,
  pC: 1e-12,
  Ah: 3600,
  mAh: 3.6,
};

export function convertCharge(value: number, from: ChargeUnit, to: ChargeUnit): number {
  if (from === to) return value;
  const inCoulombs = value * chargeToCoulomb[from];
  return inCoulombs / chargeToCoulomb[to];
}

// ============ POWER CALCULATIONS ============

/**
 * Calculate power using Ohm's law: P = V × I
 */
export function calculatePowerFromVI(voltage: number, current: number): number {
  return voltage * current; // Watts
}

/**
 * Calculate power: P = I² × R
 */
export function calculatePowerFromIR(current: number, resistance: number): number {
  return current * current * resistance; // Watts
}

/**
 * Calculate power: P = V² / R
 */
export function calculatePowerFromVR(voltage: number, resistance: number): number {
  return (voltage * voltage) / resistance; // Watts
}

/**
 * Calculate resistance using Ohm's law: R = V / I
 */
export function calculateResistance(voltage: number, current: number): number {
  return voltage / current; // Ohms
}

/**
 * Calculate current: I = V / R
 */
export function calculateCurrent(voltage: number, resistance: number): number {
  return voltage / resistance; // Amperes
}
