/**
 * VIN Decoder — NHTSA vPIC API integration with database caching
 */
import { getDb } from './db';
import { vinCache } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const NHTSA_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const TIMEOUT_MS = 8000;

// Fields to display in the result card (in order)
export const DISPLAY_FIELDS = [
  'ModelYear', 'Make', 'Model', 'Series', 'VehicleType', 'BodyClass',
  'GVWR', 'GCWR', 'Axles', 'TrailerType', 'TrailerBodyType', 'TrailerLength',
  'EngineManufacturer', 'EngineModel', 'DisplacementL', 'EngineHP',
  'FuelTypePrimary', 'BrakeSystemType', 'DriveType',
  'Manufacturer', 'PlantCity', 'PlantState', 'PlantCountry',
];

export interface VinDecodeResult {
  vin: string;
  status: 'verified' | 'failed' | 'warning';
  data: Record<string, string>;
  errorText?: string;
  suggestedVin?: string;
  isTrailer: boolean;
}

/**
 * Clean decoded values — remove empty, "Not Applicable", "0" values
 */
function cleanDecoded(raw: Record<string, string>): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!value || value === '' || value === 'Not Applicable' || value === '0') continue;
    cleaned[key] = value;
  }
  return cleaned;
}

/**
 * Determine status from NHTSA ErrorCode
 * "0" → verified, "1" or "11" → failed, else warning
 */
function determineStatus(errorCode: string): 'verified' | 'failed' | 'warning' {
  if (errorCode === '0') return 'verified';
  if (errorCode === '1' || errorCode === '11') return 'failed';
  return 'warning';
}

/**
 * Check if the decoded vehicle is a trailer
 */
function checkIsTrailer(data: Record<string, string>): boolean {
  const vehicleType = (data.VehicleType || '').toLowerCase();
  const bodyClass = (data.BodyClass || '').toLowerCase();
  const trailerType = data.TrailerType || '';
  return vehicleType.includes('trailer') || bodyClass.includes('trailer') || !!trailerType;
}

/**
 * Fetch from cache
 */
async function getFromCache(vin: string): Promise<VinDecodeResult | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(vinCache).where(eq(vinCache.vin, vin)).limit(1);
  if (rows.length === 0) return null;
  const row = rows[0];
  const data = row.decodedJson as Record<string, string>;
  return {
    vin,
    status: row.status as 'verified' | 'failed' | 'warning',
    data,
    isTrailer: checkIsTrailer(data),
  };
}

/**
 * Save to cache
 */
async function saveToCache(vin: string, data: Record<string, string>, status: string) {
  try {
    const db = await getDb();
    if (!db) return;
    await db.insert(vinCache).values({
      vin,
      decodedJson: data,
      status,
    }).onDuplicateKeyUpdate({ set: { decodedJson: data, status } });
  } catch (e) {
    console.error('VIN cache write error:', e);
  }
}

/**
 * Decode a single VIN via NHTSA API
 */
export async function decodeVin(vin: string, modelYear?: number): Promise<VinDecodeResult> {
  // Check cache first
  const cached = await getFromCache(vin);
  if (cached) return cached;

  // Build URL
  let url = `${NHTSA_BASE}/DecodeVinValues/${vin}?format=json`;
  if (modelYear) url += `&modelyear=${modelYear}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return { vin, status: 'failed', data: {}, errorText: `NHTSA API returned ${response.status}`, isTrailer: false };
    }

    const json = await response.json();
    const results = json.Results?.[0];
    if (!results) {
      return { vin, status: 'failed', data: {}, errorText: 'No results from NHTSA', isTrailer: false };
    }

    const errorCode = String(results.ErrorCode || '').split(',')[0].trim();
    const errorText = results.ErrorText || '';
    const suggestedVin = results.SuggestedVIN || '';
    const status = determineStatus(errorCode);

    // Clean the data
    const cleaned = cleanDecoded(results);
    const isTrailer = checkIsTrailer(cleaned);

    // Cache the result
    await saveToCache(vin, cleaned, status);

    const result: VinDecodeResult = { vin, status, data: cleaned, isTrailer };
    if (errorText && status !== 'verified') result.errorText = errorText;
    if (suggestedVin && !suggestedVin.includes('!')) result.suggestedVin = suggestedVin;

    return result;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { vin, status: 'warning', data: {}, errorText: 'NHTSA temporarily unavailable — try again', isTrailer: false };
    }
    return { vin, status: 'failed', data: {}, errorText: `Decode error: ${error.message}`, isTrailer: false };
  }
}

/**
 * Batch decode multiple VINs (up to 50 per NHTSA call)
 * Deduplicates and uses cache for already-decoded VINs
 */
export async function batchDecodeVins(vins: string[]): Promise<VinDecodeResult[]> {
  // Deduplicate
  const unique = Array.from(new Set(vins));
  const results: Map<string, VinDecodeResult> = new Map();

  // Check cache for all
  const uncached: string[] = [];
  for (const vin of unique) {
    const cached = await getFromCache(vin);
    if (cached) {
      results.set(vin, cached);
    } else {
      uncached.push(vin);
    }
  }

  // Batch decode uncached VINs (50 per call)
  for (let i = 0; i < uncached.length; i += 50) {
    const batch = uncached.slice(i, i + 50);
    const batchData = batch.map(v => `${v}`).join(';');

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await fetch(`${NHTSA_BASE}/DecodeVinValuesBatch/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `DATA=${encodeURIComponent(batchData)}&format=json`,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        // Fall back to individual decoding
        for (const vin of batch) {
          const result = await decodeVin(vin);
          results.set(vin, result);
        }
        continue;
      }

      const json = await response.json();
      const batchResults = json.Results || [];

      for (const raw of batchResults) {
        const vinFromResult = raw.VIN;
        if (!vinFromResult) continue;

        const errorCode = String(raw.ErrorCode || '').split(',')[0].trim();
        const errorText = raw.ErrorText || '';
        const suggestedVin = raw.SuggestedVIN || '';
        const status = determineStatus(errorCode);
        const cleaned = cleanDecoded(raw);
        const isTrailer = checkIsTrailer(cleaned);

        await saveToCache(vinFromResult, cleaned, status);

        const result: VinDecodeResult = { vin: vinFromResult, status, data: cleaned, isTrailer };
        if (errorText && status !== 'verified') result.errorText = errorText;
        if (suggestedVin && !suggestedVin.includes('!')) result.suggestedVin = suggestedVin;

        results.set(vinFromResult, result);
      }
    } catch (error: any) {
      // Fall back to individual decoding
      for (const vin of batch) {
        const result = await decodeVin(vin);
        results.set(vin, result);
      }
    }
  }

  // Return in original order
  return vins.map(vin => results.get(vin) || { vin, status: 'failed', data: {}, errorText: 'Not decoded', isTrailer: false });
}
