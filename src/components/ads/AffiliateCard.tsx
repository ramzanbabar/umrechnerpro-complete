'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export interface AffiliateCardProps {
  /** Product/service title */
  title: string;
  /** Product/service description */
  description: string;
  /** Affiliate link URL */
  link: string;
  /** Logo URL or emoji for the affiliate */
  logo?: string;
  /** Badge text (e.g., "Empfehlung", "Bestseller") */
  badge?: string;
  /** Badge variant */
  badgeVariant?: 'default' | 'secondary' | 'outline';
  /** Platform identifier for DSGVO disclosure */
  platform?: 'amazon' | 'otto' | 'ebay' | 'mediamarkt' | 'saturn' | 'other';
  /** Custom disclosure text (overrides default) */
  disclosureText?: string;
  /** Call-to-action button text */
  ctaText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the card even without marketing consent */
  showWithoutConsent?: boolean;
}

/**
 * Affiliate card component for DACH region affiliate links.
 * Includes proper DSGVO-compliant disclosure text.
 * Supports Amazon.de and other DACH affiliate programs.
 */
export function AffiliateCard({
  title,
  description,
  link,
  logo,
  badge,
  badgeVariant = 'secondary',
  platform = 'other',
  disclosureText,
  ctaText = 'Jetzt ansehen',
  className,
  showWithoutConsent = false,
}: AffiliateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentLevel | null>(null);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);

  // Check consent on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setConsent(getStoredConsent());
      setHasStoredConsent(hasConsentStored());
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

  // Get platform-specific disclosure text
  const getDisclosureText = () => {
    if (disclosureText) return disclosureText;
    
    switch (platform) {
      case 'amazon':
        return 'Werbelink: Als Amazon-Partner verdienen wir an qualifizierten Käufen.';
      case 'otto':
        return 'Werbelink: Wir erhalten eine Provision bei Kauf über diesen Link.';
      case 'ebay':
        return 'Werbelink: Wir erhalten eine Provision bei Kauf über diesen Link.';
      case 'mediamarkt':
      case 'saturn':
        return 'Werbelink: Wir erhalten eine Provision bei Kauf über diesen Link.';
      default:
        return 'Anzeige: Dieser Link führt zu einem Partner-Angebot.';
    }
  };

  // Get platform logo/emoji
  const getPlatformLogo = () => {
    if (logo) return logo;
    
    switch (platform) {
      case 'amazon':
        return '🛒';
      case 'otto':
        return '👗';
      case 'ebay':
        return '📦';
      case 'mediamarkt':
      case 'saturn':
        return '🔌';
      default:
        return '🔗';
    }
  };

  // Handle link click with rel attributes for security
  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) return null;

  // If no consent stored and not allowed to show without consent, return nothing
  if (!showWithoutConsent && !hasStoredConsent) {
    return null;
  }

  // If consent stored but marketing not allowed and not allowed to show without consent
  if (!showWithoutConsent && hasStoredConsent && !hasMarketingConsent) {
    return null;
  }

  return (
    <Card
      className={cn(
        'relative transition-all duration-200',
        isHovered && 'shadow-md',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge variant={badgeVariant}>
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          {/* Logo/Emoji */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
            {getPlatformLogo()}
          </div>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight">
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3 pt-0">
        {/* CTA Button */}
        <Button
          onClick={handleClick}
          className="w-full"
          variant="default"
        >
          {ctaText}
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Button>

        {/* DSGVO Disclosure */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          {getDisclosureText()}
        </p>
      </CardFooter>
    </Card>
  );
}

/**
 * A compact version of the affiliate card for inline use.
 */
export function AffiliateLink({
  title,
  link,
  platform = 'other',
  disclosureText,
  className,
}: {
  title: string;
  link: string;
  platform?: 'amazon' | 'otto' | 'ebay' | 'mediamarkt' | 'saturn' | 'other';
  disclosureText?: string;
  className?: string;
}) {
  // Get disclosure text
  const getDisclosureText = () => {
    if (disclosureText) return disclosureText;
    return platform === 'amazon' 
      ? 'Werbelink' 
      : 'Anzeige';
  };

  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <button
        onClick={handleClick}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {title}
      </button>
      <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
        {getDisclosureText()}
      </Badge>
    </span>
  );
}

/**
 * Pre-configured Amazon affiliate card for common use cases.
 */
export function AmazonAffiliateCard({
  title,
  description,
  link,
  badge,
  ctaText = 'Bei Amazon ansehen',
  className,
}: Omit<AffiliateCardProps, 'platform' | 'logo'>) {
  return (
    <AffiliateCard
      title={title}
      description={description}
      link={link}
      badge={badge}
      platform="amazon"
      ctaText={ctaText}
      className={className}
    />
  );
}

export default AffiliateCard;
