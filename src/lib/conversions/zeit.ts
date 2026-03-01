/**
 * Time conversion library for UmrechnerPro
 * Base unit: Second (s) - SI base unit
 */

export type TimeUnit = 
  | 'ns'      // Nanosekunde
  | 'µs'      // Mikrosekunde
  | 'ms'      // Millisekunde
  | 's'       // Sekunde
  | 'min'     // Minute
  | 'h'       // Stunde
  | 'd'       // Tag
  | 'wk'      // Woche
  | 'mo'      // Monat (durchschnittlich 30,44 Tage)
  | 'yr'      // Jahr (Kalenderjahr 365,25 Tage)
  | 'decade'  // Jahrzehnt
  | 'century' // Jahrhundert
  | 'millennium'; // Jahrtausend

export interface TimeUnitInfo {
  symbol: TimeUnit;
  name: string;
  nameEn: string;
  toSecond: number;
}

/**
 * Conversion factors to seconds
 * Using exact definitions where possible
 */
export const timeToSecond: Record<TimeUnit, number> = {
  ns: 1e-9,                    // Nanosekunde
  µs: 1e-6,                    // Mikrosekunde
  ms: 0.001,                   // Millisekunde
  s: 1,                        // Sekunde (SI base unit)
  min: 60,                     // Minute (60 s)
  h: 3600,                     // Stunde (3600 s)
  d: 86400,                    // Tag (86400 s)
  wk: 604800,                  // Woche (7 × 86400 s)
  mo: 2629746,                 // Monat (durchschnittlich, Julianisches Jahr / 12)
  yr: 31557600,                // Jahr (Julianisches Jahr = 365,25 Tage)
  decade: 315576000,           // Jahrzehnt
  century: 3155760000,         // Jahrhundert
  millennium: 31557600000,     // Jahrtausend
};

export const timeUnitInfo: Record<TimeUnit, TimeUnitInfo> = {
  ns: { symbol: 'ns', name: 'Nanosekunde', nameEn: 'Nanosecond', toSecond: 1e-9 },
  µs: { symbol: 'µs', name: 'Mikrosekunde', nameEn: 'Microsecond', toSecond: 1e-6 },
  ms: { symbol: 'ms', name: 'Millisekunde', nameEn: 'Millisecond', toSecond: 0.001 },
  s: { symbol: 's', name: 'Sekunde', nameEn: 'Second', toSecond: 1 },
  min: { symbol: 'min', name: 'Minute', nameEn: 'Minute', toSecond: 60 },
  h: { symbol: 'h', name: 'Stunde', nameEn: 'Hour', toSecond: 3600 },
  d: { symbol: 'd', name: 'Tag', nameEn: 'Day', toSecond: 86400 },
  wk: { symbol: 'wk', name: 'Woche', nameEn: 'Week', toSecond: 604800 },
  mo: { symbol: 'mo', name: 'Monat', nameEn: 'Month', toSecond: 2629746 },
  yr: { symbol: 'yr', name: 'Jahr', nameEn: 'Year', toSecond: 31557600 },
  decade: { symbol: 'decade', name: 'Jahrzehnt', nameEn: 'Decade', toSecond: 315576000 },
  century: { symbol: 'century', name: 'Jahrhundert', nameEn: 'Century', toSecond: 3155760000 },
  millennium: { symbol: 'millennium', name: 'Jahrtausend', nameEn: 'Millennium', toSecond: 31557600000 },
};

/**
 * Convert time value from one unit to another
 */
export function convertTime(value: number, from: TimeUnit, to: TimeUnit): number {
  if (from === to) return value;
  const inSeconds = value * timeToSecond[from];
  return inSeconds / timeToSecond[to];
}

/**
 * Get conversion factor between two units
 */
export function getTimeConversionFactor(from: TimeUnit, to: TimeUnit): number {
  return timeToSecond[from] / timeToSecond[to];
}

/**
 * Format time duration in human-readable German
 */
export function formatDuration(seconds: number): string {
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)} ms`;
  } else if (seconds < 60) {
    return `${seconds.toFixed(1)} s`;
  } else if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins} min ${secs} s`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.round((seconds % 3600) / 60);
    return `${hours} h ${mins} min`;
  } else {
    const days = Math.floor(seconds / 86400);
    const hours = Math.round((seconds % 86400) / 3600);
    return `${days} d ${hours} h`;
  }
}
