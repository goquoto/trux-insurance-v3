import { useState, useCallback } from 'react';
import { trpc } from '../lib/trpc';
import { getVinSegments, normalizeVin, hasInvalidChars } from '../../../shared/vin-validator';

interface VinVerifierProps {
  value: string;
  onChange: (vin: string) => void;
  onVerified?: (result: VinDecodeResult | null) => void;
  required?: boolean;
  disabled?: boolean;
}

interface VinDecodeResult {
  vin: string;
  status: 'verified' | 'failed' | 'warning';
  data: Record<string, string>;
  errorText?: string;
  suggestedVin?: string;
  isTrailer: boolean;
}

const DISPLAY_FIELDS = [
  'ModelYear', 'Make', 'Model', 'Series', 'VehicleType', 'BodyClass',
  'GVWR', 'GCWR', 'Axles', 'TrailerType', 'TrailerBodyType', 'TrailerLength',
  'EngineManufacturer', 'EngineModel', 'DisplacementL', 'EngineHP',
  'FuelTypePrimary', 'BrakeSystemType', 'DriveType',
  'Manufacturer', 'PlantCity', 'PlantState', 'PlantCountry',
];

const SEGMENT_COLORS: Record<string, string> = {
  wmi: '#6B5CE7',       // purple - World Manufacturer Identifier
  descriptor: '#B8860B', // gold - Vehicle Descriptor Section
  check: '#6E6B66',     // neutral - Check Digit
  serial: '#6B5CE7',    // purple - Vehicle Identifier Section
};

export function VinVerifier({ value, onChange, onVerified, required, disabled }: VinVerifierProps) {
  const [decodeResult, setDecodeResult] = useState<VinDecodeResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const decodeMutation = trpc.vin.decode.useMutation();

  const segments = getVinSegments(value || '');
  const normalized = normalizeVin(value || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17);
    onChange(raw);
    // Clear verification when VIN changes
    if (decodeResult) {
      setDecodeResult(null);
      onVerified?.(null);
    }
    setLocalError(null);
  };

  const handleVerify = useCallback(async () => {
    if (!normalized || normalized.length === 0) return;

    // Check for I/O/Q locally first
    const { has, chars } = hasInvalidChars(normalized);
    if (has) {
      setLocalError(`VINs never contain ${chars.join(', ')} — check for 1s and 0s`);
      return;
    }

    setIsVerifying(true);
    setLocalError(null);

    try {
      const result = await decodeMutation.mutateAsync({ vin: normalized });
      setDecodeResult(result);
      onVerified?.(result);
    } catch (err: any) {
      setLocalError(err.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  }, [normalized, decodeMutation, onVerified]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleVerify();
    }
  };

  const handleUseSuggestion = async () => {
    if (!decodeResult?.suggestedVin) return;
    const suggested = decodeResult.suggestedVin;
    onChange(suggested);
    setDecodeResult(null);
    setLocalError(null);

    // Re-verify with suggested VIN
    setIsVerifying(true);
    try {
      const result = await decodeMutation.mutateAsync({ vin: suggested });
      setDecodeResult(result);
      onVerified?.(result);
    } catch (err: any) {
      setLocalError(err.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const getCheckDigitColor = () => {
    if (!decodeResult) return SEGMENT_COLORS.check;
    if (decodeResult.status === 'verified') return '#22c55e'; // green
    if (decodeResult.status === 'failed') return '#ef4444'; // red
    return '#f59e0b'; // amber
  };

  return (
    <div className="vin-verifier">
      {/* Input row */}
      <div className="vin-input-row">
        <input
          type="text"
          value={value || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          className="vin-input"
          disabled={disabled}
          required={required}
          style={{ fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying || !normalized || disabled}
          className="vin-verify-btn"
        >
          {isVerifying ? (
            <span className="vin-spinner" />
          ) : (
            'Verify'
          )}
        </button>
      </div>

      {/* 17-cell VIN strip */}
      {normalized.length > 0 && (
        <div className="vin-strip">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="vin-cell"
              style={{
                borderBottomColor: seg.segment === 'check' ? getCheckDigitColor() : SEGMENT_COLORS[seg.segment],
              }}
            >
              {seg.char}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      {normalized.length > 0 && (
        <div className="vin-legend">
          <span style={{ color: SEGMENT_COLORS.wmi }}>1–3 WMI</span>
          <span style={{ color: SEGMENT_COLORS.descriptor }}>4–8 Descriptor</span>
          <span style={{ color: SEGMENT_COLORS.check }}>9 Check</span>
          <span style={{ color: SEGMENT_COLORS.serial }}>10–17 Serial</span>
        </div>
      )}

      {/* Error message */}
      {localError && (
        <div className="vin-status vin-status-error">{localError}</div>
      )}

      {/* Status banners */}
      {decodeResult && (
        <>
          {decodeResult.status === 'verified' && (
            <div className="vin-status vin-status-verified">
              VIN verified — clean decode against the federal database
            </div>
          )}
          {decodeResult.status === 'failed' && (
            <div className="vin-status vin-status-failed">
              VIN decode failed{decodeResult.errorText ? `: ${decodeResult.errorText}` : ''}
              {decodeResult.suggestedVin && (
                <div className="vin-suggestion">
                  Did you mean <strong>{decodeResult.suggestedVin}</strong>?{' '}
                  <button type="button" onClick={handleUseSuggestion} className="vin-use-suggestion-btn">
                    Use this VIN
                  </button>
                </div>
              )}
            </div>
          )}
          {decodeResult.status === 'warning' && (
            <div className="vin-status vin-status-warning">
              {decodeResult.errorText || 'VIN decoded with warnings'}
            </div>
          )}

          {/* Result card */}
          {decodeResult.status !== 'failed' && Object.keys(decodeResult.data).length > 0 && (
            <div className="vin-result-card">
              <div className="vin-result-title">
                {decodeResult.data.ModelYear} {decodeResult.data.Make} {decodeResult.data.Model}
                {decodeResult.isTrailer && <span className="vin-trailer-tag">· Trailer</span>}
              </div>
              <div className="vin-result-subtitle">
                {decodeResult.data.VehicleType}{decodeResult.data.BodyClass ? ` · ${decodeResult.data.BodyClass}` : ''} · VIN {normalized}
              </div>
              <div className="vin-result-grid">
                {DISPLAY_FIELDS.filter(f => decodeResult.data[f]).map(field => (
                  <div key={field} className="vin-result-field">
                    <span className="vin-field-label">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="vin-field-value">{decodeResult.data[field]}</span>
                  </div>
                ))}
              </div>
              <div className="vin-result-footer">
                <button
                  type="button"
                  className="vin-copy-btn"
                  onClick={() => {
                    const text = DISPLAY_FIELDS
                      .filter(f => decodeResult.data[f])
                      .map(f => `${f}: ${decodeResult.data[f]}`)
                      .join('\n');
                    navigator.clipboard.writeText(text);
                  }}
                >
                  Copy results
                </button>
                <a
                  href={`https://vpic.nhtsa.dot.gov/decoder/Decoder?VIN=${normalized}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vin-nhtsa-link"
                >
                  Open on NHTSA
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export type { VinDecodeResult };
