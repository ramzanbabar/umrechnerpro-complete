/**
 * Data storage conversion library for UmrechnerPro
 * Supports both SI decimal (KB = 1000 bytes) and IEC binary (KiB = 1024 bytes)
 */

export type DataStorageUnit = 
  | 'bit'      // Bit
  | 'B'        // Byte
  | 'KB'       // Kilobyte (SI: 1000 B)
  | 'MB'       // Megabyte (SI: 1000000 B)
  | 'GB'       // Gigabyte
  | 'TB'       // Terabyte
  | 'PB'       // Petabyte
  | 'EB'       // Exabyte
  | 'ZB'       // Zettabyte
  | 'YB'       // Yottabyte
  | 'KiB'      // Kibibyte (IEC: 1024 B)
  | 'MiB'      // Mebibyte
  | 'GiB'      // Gibibyte
  | 'TiB'      // Tebibyte
  | 'PiB'      // Pebibyte
  | 'EiB';     // Exbibyte

export interface DataStorageUnitInfo {
  symbol: DataStorageUnit;
  name: string;
  nameEn: string;
  toByte: number;
  system: 'si' | 'iec' | 'basic';
}

/**
 * Conversion factors to Bytes
 * SI decimal: KB = 1000 B, MB = 1000000 B, etc.
 * IEC binary: KiB = 1024 B, MiB = 1048576 B, etc.
 */
export const dataStorageToByte: Record<DataStorageUnit, number> = {
  bit: 0.125,                    // 1/8 Byte
  B: 1,                          // Byte
  KB: 1000,                      // Kilobyte (SI)
  MB: 1000000,                   // Megabyte (SI)
  GB: 1000000000,                // Gigabyte (SI)
  TB: 1000000000000,             // Terabyte (SI)
  PB: 1000000000000000,          // Petabyte (SI)
  EB: 1000000000000000000,       // Exabyte (SI)
  ZB: 1e21,                      // Zettabyte (SI)
  YB: 1e24,                      // Yottabyte (SI)
  KiB: 1024,                     // Kibibyte (IEC)
  MiB: 1048576,                  // Mebibyte (IEC) = 1024²
  GiB: 1073741824,               // Gibibyte (IEC) = 1024³
  TiB: 1099511627776,            // Tebibyte (IEC) = 1024⁴
  PiB: 1125899906842624,         // Pebibyte (IEC) = 1024⁵
  EiB: 1152921504606847000,      // Exbibyte (IEC) = 1024⁶
};

export const dataStorageUnitInfo: Record<DataStorageUnit, DataStorageUnitInfo> = {
  bit: { symbol: 'bit', name: 'Bit', nameEn: 'Bit', toByte: 0.125, system: 'basic' },
  B: { symbol: 'B', name: 'Byte', nameEn: 'Byte', toByte: 1, system: 'basic' },
  KB: { symbol: 'KB', name: 'Kilobyte', nameEn: 'Kilobyte', toByte: 1000, system: 'si' },
  MB: { symbol: 'MB', name: 'Megabyte', nameEn: 'Megabyte', toByte: 1000000, system: 'si' },
  GB: { symbol: 'GB', name: 'Gigabyte', nameEn: 'Gigabyte', toByte: 1000000000, system: 'si' },
  TB: { symbol: 'TB', name: 'Terabyte', nameEn: 'Terabyte', toByte: 1000000000000, system: 'si' },
  PB: { symbol: 'PB', name: 'Petabyte', nameEn: 'Petabyte', toByte: 1000000000000000, system: 'si' },
  EB: { symbol: 'EB', name: 'Exabyte', nameEn: 'Exabyte', toByte: 1000000000000000000, system: 'si' },
  ZB: { symbol: 'ZB', name: 'Zettabyte', nameEn: 'Zettabyte', toByte: 1e21, system: 'si' },
  YB: { symbol: 'YB', name: 'Yottabyte', nameEn: 'Yottabyte', toByte: 1e24, system: 'si' },
  KiB: { symbol: 'KiB', name: 'Kibibyte', nameEn: 'Kibibyte', toByte: 1024, system: 'iec' },
  MiB: { symbol: 'MiB', name: 'Mebibyte', nameEn: 'Mebibyte', toByte: 1048576, system: 'iec' },
  GiB: { symbol: 'GiB', name: 'Gibibyte', nameEn: 'Gibibyte', toByte: 1073741824, system: 'iec' },
  TiB: { symbol: 'TiB', name: 'Tebibyte', nameEn: 'Tebibyte', toByte: 1099511627776, system: 'iec' },
  PiB: { symbol: 'PiB', name: 'Pebibyte', nameEn: 'Pebibyte', toByte: 1125899906842624, system: 'iec' },
  EiB: { symbol: 'EiB', name: 'Exbibyte', nameEn: 'Exbibyte', toByte: 1152921504606847000, system: 'iec' },
};

/**
 * Convert data storage value from one unit to another
 */
export function convertDataStorage(value: number, from: DataStorageUnit, to: DataStorageUnit): number {
  if (from === to) return value;
  const inBytes = value * dataStorageToByte[from];
  return inBytes / dataStorageToByte[to];
}

/**
 * Get conversion factor between two units
 */
export function getDataStorageConversionFactor(from: DataStorageUnit, to: DataStorageUnit): number {
  return dataStorageToByte[from] / dataStorageToByte[to];
}

/**
 * Auto-format bytes to appropriate unit
 */
export function autoFormatBytes(bytes: number, useIEC: boolean = false): string {
  if (bytes === 0) return '0 B';
  
  const units = useIEC 
    ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
    : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const base = useIEC ? 1024 : 1000;
  
  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const index = Math.min(i, units.length - 1);
  const value = bytes / Math.pow(base, index);
  
  return `${value.toFixed(2)} ${units[index]}`;
}

/**
 * Common data storage conversions
 */
export const commonDataStorageConversions: Array<{ from: DataStorageUnit; to: DataStorageUnit; factor: string }> = [
  { from: 'GB', to: 'MB', factor: '1000' },
  { from: 'MB', to: 'GB', factor: '0,001' },
  { from: 'GB', to: 'GiB', factor: '0,9313' },
  { from: 'GiB', to: 'GB', factor: '1,0737' },
  { from: 'TB', to: 'GB', factor: '1000' },
  { from: 'MB', to: 'KB', factor: '1000' },
];
