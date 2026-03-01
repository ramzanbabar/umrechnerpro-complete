/**
 * Categories registry for UmrechnerPro
 * All 21 categories with German metadata
 */

export type CategorySlug = 
  | 'laenge'
  | 'gewicht'
  | 'temperatur'
  | 'zeit'
  | 'geschwindigkeit'
  | 'druck'
  | 'energie'
  | 'leistung'
  | 'kraft'
  | 'winkel'
  | 'digital'
  | 'technik'
  | 'waerme'
  | 'fluessigkeiten'
  | 'licht'
  | 'elektrizitaet'
  | 'magnetismus'
  | 'strahlung'
  | 'alltag'
  | 'design'
  | 'sonstige';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
  toolCount: number;
  featured: boolean;
}

export const categories: Record<CategorySlug, Category> = {
  laenge: {
    slug: 'laenge',
    name: 'Länge & Entfernung',
    description: 'Meter, Kilometer, Meilen, Zoll, Fuß und mehr',
    icon: '📏',
    color: '#3B82F6',
    toolCount: 3,
    featured: true,
  },
  gewicht: {
    slug: 'gewicht',
    name: 'Gewicht & Masse',
    description: 'Kilogramm, Pfund, Unzen, Tonnen und mehr',
    icon: '⚖️',
    color: '#10B981',
    toolCount: 1,
    featured: true,
  },
  temperatur: {
    slug: 'temperatur',
    name: 'Temperatur',
    description: 'Celsius, Fahrenheit, Kelvin und mehr',
    icon: '🌡️',
    color: '#EF4444',
    toolCount: 1,
    featured: true,
  },
  zeit: {
    slug: 'zeit',
    name: 'Zeit',
    description: 'Sekunden, Minuten, Stunden, Tage und mehr',
    icon: '⏱️',
    color: '#8B5CF6',
    toolCount: 1,
    featured: false,
  },
  geschwindigkeit: {
    slug: 'geschwindigkeit',
    name: 'Geschwindigkeit',
    description: 'km/h, mph, m/s, Knoten und mehr',
    icon: '🚀',
    color: '#F59E0B',
    toolCount: 1,
    featured: true,
  },
  druck: {
    slug: 'druck',
    name: 'Druck',
    description: 'Pascal, bar, PSI, Atmosphäre und mehr',
    icon: '💨',
    color: '#06B6D4',
    toolCount: 1,
    featured: false,
  },
  energie: {
    slug: 'energie',
    name: 'Energie & Arbeit',
    description: 'Joule, kWh, Kalorien, BTU und mehr',
    icon: '⚡',
    color: '#F97316',
    toolCount: 1,
    featured: false,
  },
  leistung: {
    slug: 'leistung',
    name: 'Leistung',
    description: 'Watt, Kilowatt, PS, Pferdestärke und mehr',
    icon: '💪',
    color: '#EC4899',
    toolCount: 1,
    featured: true,
  },
  kraft: {
    slug: 'kraft',
    name: 'Kraft',
    description: 'Newton, Kilonewton, Kilopond und mehr',
    icon: '🔨',
    color: '#6366F1',
    toolCount: 1,
    featured: false,
  },
  winkel: {
    slug: 'winkel',
    name: 'Winkel',
    description: 'Grad, Radiant, Gon, Bogenminute und mehr',
    icon: '📐',
    color: '#14B8A6',
    toolCount: 1,
    featured: false,
  },
  digital: {
    slug: 'digital',
    name: 'Digital & Daten',
    description: 'Byte, Megabyte, Gigabyte, Zahlensysteme und mehr',
    icon: '💾',
    color: '#64748B',
    toolCount: 4,
    featured: true,
  },
  technik: {
    slug: 'technik',
    name: 'Technik & Engineering',
    description: 'Dichte, Beschleunigung, Drehmoment und mehr',
    icon: '🔧',
    color: '#78716C',
    toolCount: 5,
    featured: false,
  },
  waerme: {
    slug: 'waerme',
    name: 'Wärme & Thermodynamik',
    description: 'Wärmeleitfähigkeit, Wärmekapazität und mehr',
    icon: '🔥',
    color: '#DC2626',
    toolCount: 4,
    featured: false,
  },
  fluessigkeiten: {
    slug: 'fluessigkeiten',
    name: 'Flüssigkeiten & Strömung',
    description: 'Volumenstrom, Viskosität und mehr',
    icon: '💧',
    color: '#0EA5E9',
    toolCount: 4,
    featured: false,
  },
  licht: {
    slug: 'licht',
    name: 'Licht & Optik',
    description: 'Leuchtdichte, Beleuchtungsstärke, Frequenz',
    icon: '💡',
    color: '#FCD34D',
    toolCount: 3,
    featured: false,
  },
  elektrizitaet: {
    slug: 'elektrizitaet',
    name: 'Elektrizität',
    description: 'Spannung, Strom, Widerstand, Kapazität und mehr',
    icon: '🔌',
    color: '#FBBF24',
    toolCount: 6,
    featured: false,
  },
  magnetismus: {
    slug: 'magnetismus',
    name: 'Magnetismus',
    description: 'Magnetischer Fluss, Flussdichte und mehr',
    icon: '🧲',
    color: '#7C3AED',
    toolCount: 2,
    featured: false,
  },
  strahlung: {
    slug: 'strahlung',
    name: 'Strahlung',
    description: 'Radioaktivität, Strahlendosis und mehr',
    icon: '☢️',
    color: '#84CC16',
    toolCount: 2,
    featured: false,
  },
  alltag: {
    slug: 'alltag',
    name: 'Alltag & Lifestyle',
    description: 'Kraftstoffverbrauch, Schuhgrößen, Kleidergrößen, Kochen',
    icon: '🏠',
    color: '#F472B6',
    toolCount: 4,
    featured: true,
  },
  design: {
    slug: 'design',
    name: 'Design & Typografie',
    description: 'Pixel, Punkt, Farben HEX/RGB/HSL und mehr',
    icon: '🎨',
    color: '#A855F7',
    toolCount: 2,
    featured: true,
  },
  sonstige: {
    slug: 'sonstige',
    name: 'Sonstige',
    description: 'Römische Zahlen, SI-Präfixe, Schall und mehr',
    icon: '📦',
    color: '#9CA3AF',
    toolCount: 5,
    featured: false,
  },
};

export const categoryList = Object.values(categories);
export const featuredCategories = categoryList.filter(c => c.featured);
