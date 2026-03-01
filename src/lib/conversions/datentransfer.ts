/**
 * Data transfer rate conversion library for UmrechnerPro
 * Base unit: Bit per Second (bps)
 */

export type DataTransferUnit = 
  | 'bps'      // Bit pro Sekunde
  | 'Kbps'     // Kilobit pro Sekunde
  | 'Mbps'     // Megabit pro Sekunde
  | 'Gbps'     // Gigabit pro Sekunde
  | 'Tbps'     // Terabit pro Sekunde
  | 'B/s'      // Byte pro Sekunde
  | 'KB/s'     // Kilobyte pro Sekunde
  | 'MB/s'     // Megabyte pro Sekunde
  | 'GB/s';    // Gigabyte pro Sekunde

export interface DataTransferUnitInfo {
  symbol: DataTransferUnit;
  name: string;
  nameEn: string;
  toBps: number;
}

/**
 * Conversion factors to bits per second
 */
export const dataTransferToBps: Record<DataTransferUnit, number> = {
  bps: 1,                    // Bit pro Sekunde
  Kbps: 1000,                // Kilobit pro Sekunde
  Mbps: 1000000,             // Megabit pro Sekunde
  Gbps: 1000000000,          // Gigabit pro Sekunde
  Tbps: 1000000000000,       // Terabit pro Sekunde
  'B/s': 8,                  // Byte pro Sekunde (8 bits)
  'KB/s': 8000,              // Kilobyte pro Sekunde
  'MB/s': 8000000,           // Megabyte pro Sekunde
  'GB/s': 8000000000,        // Gigabyte pro Sekunde
};

export const dataTransferUnitInfo: Record<DataTransferUnit, DataTransferUnitInfo> = {
  bps: { symbol: 'bps', name: 'Bit pro Sekunde', nameEn: 'Bit per Second', toBps: 1 },
  Kbps: { symbol: 'Kbps', name: 'Kilobit pro Sekunde', nameEn: 'Kilobit per Second', toBps: 1000 },
  Mbps: { symbol: 'Mbps', name: 'Megabit pro Sekunde', nameEn: 'Megabit per Second', toBps: 1000000 },
  Gbps: { symbol: 'Gbps', name: 'Gigabit pro Sekunde', nameEn: 'Gigabit per Second', toBps: 1000000000 },
  Tbps: { symbol: 'Tbps', name: 'Terabit pro Sekunde', nameEn: 'Terabit per Second', toBps: 1000000000000 },
  'B/s': { symbol: 'B/s', name: 'Byte pro Sekunde', nameEn: 'Byte per Second', toBps: 8 },
  'KB/s': { symbol: 'KB/s', name: 'Kilobyte pro Sekunde', nameEn: 'Kilobyte per Second', toBps: 8000 },
  'MB/s': { symbol: 'MB/s', name: 'Megabyte pro Sekunde', nameEn: 'Megabyte per Second', toBps: 8000000 },
  'GB/s': { symbol: 'GB/s', name: 'Gigabyte pro Sekunde', nameEn: 'Gigabyte per Second', toBps: 8000000000 },
};

/**
 * Convert data transfer rate from one unit to another
 */
export function convertDataTransfer(value: number, from: DataTransferUnit, to: DataTransferUnit): number {
  if (from === to) return value;
  const inBps = value * dataTransferToBps[from];
  return inBps / dataTransferToBps[to];
}

/**
 * Get conversion factor between two units
 */
export function getDataTransferConversionFactor(from: DataTransferUnit, to: DataTransferUnit): number {
  return dataTransferToBps[from] / dataTransferToBps[to];
}

/**
 * Common data transfer conversions
 */
export const commonDataTransferConversions: Array<{ from: DataTransferUnit; to: DataTransferUnit; factor: string }> = [
  { from: 'Mbps', to: 'MB/s', factor: '0,125' },
  { from: 'MB/s', to: 'Mbps', factor: '8' },
  { from: 'Gbps', to: 'Mbps', factor: '1000' },
  { from: 'Mbps', to: 'Gbps', factor: '0,001' },
];

/**
 * Calculate download time
 * @param fileSizeBytes - File size in bytes
 * @param speedBps - Download speed in bits per second
 * @returns Time in seconds
 */
export function calculateDownloadTime(fileSizeBytes: number, speedBps: number): number {
  const bits = fileSizeBytes * 8;
  return bits / speedBps;
}
