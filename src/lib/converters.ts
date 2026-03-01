/**
 * Conversion function registry
 * Maps tool slugs to their corresponding conversion functions
 */

import { convertLength } from './conversions/laenge';
import { convertWeight } from './conversions/gewicht';
import { convertTemperature } from './conversions/temperatur';
import { convertArea } from './conversions/flaeche';
import { convertVolume } from './conversions/volumen';
import { convertTime } from './conversions/zeit';
import { convertSpeed } from './conversions/geschwindigkeit';
import { convertPressure } from './conversions/druck';
import { convertEnergy } from './conversions/energie';
import { convertPower } from './conversions/leistung';
import { convertForce } from './conversions/kraft';
import { convertAngle } from './conversions/winkel';
import { convertDataStorage } from './conversions/datenspeicher';
import { convertDataTransfer } from './conversions/datentransfer';
import { convertFrequency } from './conversions/frequenz';
import { convertDensity } from './conversions/dichte';
import { convertAcceleration } from './conversions/beschleunigung';
import { convertTorque } from './conversions/drehmoment';
import { convertDynamicViscosity, convertKinematicViscosity } from './conversions/viskositaet';
import { convertVoltage, convertCurrent, convertResistance, convertCapacitance, convertInductance, convertCharge } from './conversions/elektrisch';
import { convertMagneticFlux, convertMagneticFluxDensity } from './conversions/magnetisch';
import { convertLuminance, convertIlluminance } from './conversions/licht';
import { convertRadioactivity, convertRadiationDose } from './conversions/strahlung';
import { convertVolumeFlow, convertMassFlow } from './conversions/volumenstrom';
import { convertCooking } from './conversions/kocheinheiten';
import { convertFuelConsumption } from './conversions/kraftstoffverbrauch';
import { decimalToRoman } from './conversions/roemische-zahlen';

export type ConversionFunction = (value: number, from: string, to: string) => number;

/**
 * Registry of all conversion functions mapped to tool slugs
 * Functions are cast to ConversionFunction type for type safety
 */
const conversionRegistry: Record<string, ConversionFunction> = {
  'laengen-umrechner': convertLength as ConversionFunction,
  'gewicht-umrechner': convertWeight as ConversionFunction,
  'temperatur-umrechner': convertTemperature as ConversionFunction,
  'flaechen-umrechner': convertArea as ConversionFunction,
  'volumen-umrechner': convertVolume as ConversionFunction,
  'zeit-umrechner': convertTime as ConversionFunction,
  'geschwindigkeit-umrechner': convertSpeed as ConversionFunction,
  'druck-umrechner': convertPressure as ConversionFunction,
  'energie-umrechner': convertEnergy as ConversionFunction,
  'leistung-umrechner': convertPower as ConversionFunction,
  'kraft-umrechner': convertForce as ConversionFunction,
  'winkel-umrechner': convertAngle as ConversionFunction,
  'datenspeicher-umrechner': convertDataStorage as ConversionFunction,
  'datentransfer-umrechner': convertDataTransfer as ConversionFunction,
  'frequenz-umrechner': convertFrequency as ConversionFunction,
  'dichte-umrechner': convertDensity as ConversionFunction,
  'beschleunigung-umrechner': convertAcceleration as ConversionFunction,
  'drehmoment-umrechner': convertTorque as ConversionFunction,
  'viskositaet-dynamisch-umrechner': convertDynamicViscosity as ConversionFunction,
  'viskositaet-kinematisch-umrechner': convertKinematicViscosity as ConversionFunction,
  'spannung-umrechner': convertVoltage as ConversionFunction,
  'strom-umrechner': convertCurrent as ConversionFunction,
  'widerstand-umrechner': convertResistance as ConversionFunction,
  'kapazitaet-umrechner': convertCapacitance as ConversionFunction,
  'induktivitaet-umrechner': convertInductance as ConversionFunction,
  'ladung-umrechner': convertCharge as ConversionFunction,
  'magnetischer-fluss-umrechner': convertMagneticFlux as ConversionFunction,
  'magnetflussdichte-umrechner': convertMagneticFluxDensity as ConversionFunction,
  'leuchtdichte-umrechner': convertLuminance as ConversionFunction,
  'beleuchtungsstaerke-umrechner': convertIlluminance as ConversionFunction,
  'radioaktivitaet-umrechner': convertRadioactivity as ConversionFunction,
  'strahlendosis-umrechner': convertRadiationDose as ConversionFunction,
  'volumenstrom-umrechner': convertVolumeFlow as ConversionFunction,
  'massenstrom-umrechner': convertMassFlow as ConversionFunction,
  'kocheinheiten-umrechner': convertCooking as ConversionFunction,
  'kraftstoffverbrauch-umrechner': convertFuelConsumption as ConversionFunction,
};

/**
 * Get the appropriate conversion function based on tool slug
 */
export function getConversionFunction(slug: string): ConversionFunction {
  // Special handling for number-based converters
  if (slug === 'zahlen-umrechner') {
    return (value, _from, _to) => {
      // This would need special handling for base conversion
      return value; // Placeholder
    };
  }

  if (slug === 'roemische-zahlen-umrechner') {
    return (value, from, to) => {
      try {
        if (from === 'arabisch' && to === 'roemisch') {
          return parseInt(decimalToRoman(value).replace(/[^\d]/g, '')) || value;
        }
        return value;
      } catch {
        return value;
      }
    };
  }

  if (slug === 'farb-umrechner') {
    return (value, _from, _to) => {
      // Color conversion is handled specially
      return value;
    };
  }

  return conversionRegistry[slug] || ((value) => value);
}
