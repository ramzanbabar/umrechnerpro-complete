'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type ConsentLevel = {
  necessary: boolean;
  statistics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'umrechnerpro-consent';

const DEFAULT_CONSENT: ConsentLevel = {
  necessary: true,
  statistics: false,
  marketing: false,
};

// Helper to read from localStorage safely
function getStoredConsent(): ConsentLevel | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Helper to check if consent has been set
function hasStoredConsent(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function GdprBanner() {
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasConsent, setHasConsent] = useState(true);
  const [consent, setConsent] = useState<ConsentLevel>(DEFAULT_CONSENT);

  // Handle mount - read initial state
  useEffect(() => {
    const stored = getStoredConsent();
    const hasStored = hasStoredConsent();

    // Use requestAnimationFrame to defer state updates
    requestAnimationFrame(() => {
      setHasConsent(hasStored);
      if (stored) {
        setConsent(stored);
      }
      setMounted(true);
    });
  }, []);

  // Listen for storage changes (e.g., in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const stored = getStoredConsent();
        requestAnimationFrame(() => {
          setHasConsent(e.newValue !== null);
          if (stored) {
            setConsent(stored);
          }
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveConsent = useCallback((level: ConsentLevel) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(level));
    setConsent(level);
    setHasConsent(true);
  }, []);

  const handleAcceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      statistics: true,
      marketing: true,
    });
  }, [saveConsent]);

  const handleRejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      statistics: false,
      marketing: false,
    });
  }, [saveConsent]);

  const handleSaveSettings = useCallback(() => {
    saveConsent(consent);
  }, [consent, saveConsent]);

  const handleStatisticsChange = useCallback((checked: boolean) => {
    setConsent(prev => ({ ...prev, statistics: checked }));
  }, []);

  const handleMarketingChange = useCallback((checked: boolean) => {
    setConsent(prev => ({ ...prev, marketing: checked }));
  }, []);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) return null;

  // Don't show if consent is already stored
  if (hasConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-4xl">
        {!showSettings ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-semibold">
                Diese Website verwendet Cookies und ähnliche Technologien
              </h2>
              <p className="text-sm text-muted-foreground">
                Wir nutzen Cookies für Statistiken und Marketing. Mit Klick auf &quot;Alle akzeptieren&quot;
                stimmen Sie der Verwendung zu. Sie können Ihre Einstellungen jederzeit ändern.
                Mehr Informationen in unserer{' '}
                <Link href="/datenschutz" className="underline hover:text-primary">
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setShowSettings(true)}>
                Einstellungen
              </Button>
              <Button variant="outline" onClick={handleRejectAll}>
                Ablehnen
              </Button>
              <Button onClick={handleAcceptAll}>
                Alle akzeptieren
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-semibold">Cookie-Einstellungen</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox id="necessary" checked disabled />
                <div className="space-y-1">
                  <label htmlFor="necessary" className="font-medium">
                    Notwendig
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Diese Cookies sind für den Betrieb der Website erforderlich.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="statistics"
                  checked={consent.statistics}
                  onCheckedChange={handleStatisticsChange}
                />
                <div className="space-y-1">
                  <label htmlFor="statistics" className="font-medium">
                    Statistiken
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Google Analytics mit IP-Anonymisierung.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={consent.marketing}
                  onCheckedChange={handleMarketingChange}
                />
                <div className="space-y-1">
                  <label htmlFor="marketing" className="font-medium">
                    Marketing
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Google AdSense für relevante Werbung.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Zurück
              </Button>
              <Button onClick={handleSaveSettings}>
                Einstellungen speichern
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
