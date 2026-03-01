'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

type ConsentLevel = {
  necessary: boolean;
  statistics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'umrechnerpro-consent';

// Helper to read consent from localStorage safely
function getStoredConsent(): ConsentLevel | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Helper to check if consent has been stored
function hasConsentStored(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export interface AdSlotProps {
  /** Google AdSense slot ID */
  slot: string;
  /** Ad format: 'auto', 'horizontal', 'vertical', 'rectangle' */
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  /** Enable responsive ad */
  responsive?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom placeholder text for development mode */
  placeholderText?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<object>;
  }
}

/**
 * Google AdSense-compatible ad slot component with DSGVO compliance.
 * Only loads ads after marketing consent has been given.
 * Shows a placeholder in development mode.
 */
export function AdSlot({
  slot,
  format = 'auto',
  responsive = true,
  className,
  placeholderText = 'Anzeige',
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentLevel | null>(null);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Read consent on mount
  useEffect(() => {
    const stored = getStoredConsent();
    const hasStored = hasConsentStored();

    requestAnimationFrame(() => {
      setConsent(stored);
      setHasStoredConsent(hasStored);
      setMounted(true);
    });

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        requestAnimationFrame(() => {
          setConsent(getStoredConsent());
          setHasStoredConsent(e.newValue !== null);
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const hasMarketingConsent = consent?.marketing === true;

  useEffect(() => {
    // Don't load ad if:
    // 1. No consent has been stored yet (GDPR banner still showing)
    // 2. Marketing consent not given
    // 3. Already loaded
    // 4. In development mode
    if (!hasStoredConsent || !hasMarketingConsent || isLoadedRef.current || isDevelopment) {
      return;
    }

    try {
      // Push ad to Google AdSense
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoadedRef.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [hasMarketingConsent, hasStoredConsent, isDevelopment]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) return null;

  // Development mode placeholder
  if (isDevelopment) {
    return (
      <div
        className={cn(
          'bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center min-h-[100px]',
          className
        )}
        aria-label="Anzeigen-Platzhalter (nur in Entwicklung sichtbar)"
      >
        <div className="text-center p-4">
          <p className="text-muted-foreground text-sm font-medium">
            {placeholderText}
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            AdSense Slot: {slot}
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Format: {format}
          </p>
        </div>
      </div>
    );
  }

  // No consent stored yet - don't show anything
  if (!hasStoredConsent) {
    return null;
  }

  // Consent stored but marketing not allowed - show privacy placeholder
  if (!hasMarketingConsent) {
    return (
      <div
        className={cn(
          'bg-muted/30 border border-muted rounded-lg flex items-center justify-center min-h-[100px]',
          className
        )}
        aria-label="Anzeigen deaktiviert aufgrund von Datenschutzeinstellungen"
      >
        <p className="text-muted-foreground text-sm p-4 text-center">
          Werbung wird nicht angezeigt, da Sie Marketing-Cookies deaktiviert haben.
        </p>
      </div>
    );
  }

  // Render actual ad slot
  return (
    <div className={cn('ad-container', className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        aria-label="Anzeige"
      />
    </div>
  );
}

/**
 * Hook to check if marketing consent has been given.
 * Useful for conditional ad loading in other components.
 */
export function useMarketingConsent(): {
  hasConsent: boolean;
  isLoading: boolean;
} {
  const [consent, setConsent] = useState<ConsentLevel | null>(null);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setConsent(getStoredConsent());
      setHasStoredConsent(hasConsentStored());
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        requestAnimationFrame(() => {
          setConsent(getStoredConsent());
          setHasStoredConsent(e.newValue !== null);
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    hasConsent: consent?.marketing === true && hasStoredConsent,
    isLoading: !hasStoredConsent,
  };
}

export default AdSlot;
