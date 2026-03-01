import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ArrowRight, 
  Check, 
  Zap, 
  Smartphone, 
  Shield, 
  Globe,
  Calculator
} from 'lucide-react';
import { categories, categoryList, featuredCategories } from '@/lib/categories';
import { featuredTools, getAllSubConversions } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
  description: '50+ professionelle Umrechner für Länge, Gewicht, Temperatur, Volumen und mehr – kostenlos, sofort und auf Deutsch. Für Deutschland, Österreich & Schweiz.',
  openGraph: {
    title: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
    description: '50+ professionelle Umrechner für Länge, Gewicht, Temperatur, Volumen und mehr.',
    url: 'https://umrechnerpro.de',
  },
};

export default function HomePage() {
  const popularConversions = getAllSubConversions().slice(0, 12);
  
  const usps = [
    { icon: Calculator, title: 'Wissenschaftlich präzise Formeln', description: 'NIST-Standard' },
    { icon: Zap, title: 'Sofortanzeige ohne Neuladen', description: 'Echtzeitberechnung' },
    { icon: Smartphone, title: 'Optimiert für Smartphone & Tablet', description: 'Mobile-First' },
    { icon: Shield, title: 'DSGVO-konform', description: 'Datenschutz garantiert' },
    { icon: Globe, title: 'Vollständig auf Deutsch', description: 'Für DACH-Region' },
    { icon: Check, title: 'Keine Anmeldung nötig', description: '100% kostenlos' },
  ];

  const faqs = [
    { q: 'Wie rechne ich cm in Zoll um?', a: '1 Zentimeter entspricht 0,3937 Zoll. Die Formel lautet: Zoll = cm × 0,3937. Zum Beispiel: 10 cm = 3,937 Zoll.' },
    { q: 'Was ist der Unterschied zwischen Pfund und Kilogramm?', a: 'Ein Pfund (lb) entspricht 0,4536 Kilogramm. Das Kilogramm ist die SI-Basiseinheit für Masse, während das Pfund vor allem im angloamerikanischen Raum verwendet wird.' },
    { q: 'Wie viele Liter sind eine Gallone?', a: 'Eine US-Gallone entspricht 3,785 Litern. Eine britische Gallone (Imperial Gallon) ist größer und entspricht 4,546 Litern.' },
    { q: 'Wie rechnet man Celsius in Fahrenheit um?', a: 'Die Formel lautet: °F = °C × 9/5 + 32. Wasser gefriert bei 0°C (32°F) und siedet bei 100°C (212°F).' },
    { q: 'Was bedeutet PS beim Auto?', a: 'PS steht für Pferdestärke und ist eine veraltete Einheit für Leistung. 1 PS = 0,735 kW = 735,5 Watt. Ein Auto mit 150 PS hat also etwa 110 kW.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Kostenlose Einheitenumrechner – Einfach & Präzise
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              50+ professionelle Umrechner für Länge, Gewicht, Temperatur, Volumen und mehr – 
              kostenlos, sofort und auf Deutsch
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Suche nach Umrechner..."
                className="pl-10 h-12 text-lg"
              />
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="py-1.5">54 Umrechner</Badge>
              <Badge variant="secondary" className="py-1.5">100% Kostenlos</Badge>
              <Badge variant="secondary" className="py-1.5">Keine Anmeldung</Badge>
              <Badge variant="secondary" className="py-1.5">DSGVO-konform</Badge>
            </div>
            
            {/* Quick access */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {popularConversions.slice(0, 6).map((conv) => (
                <Link key={conv.slug} href={`/umrechnung/${conv.slug}`}>
                  <Button variant="outline" size="sm">
                    {conv.fromLabel} → {conv.toLabel}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Alle Kategorien
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryList.map((category) => (
              <Link key={category.slug} href={`/kategorie/${category.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.toolCount} {category.toolCount === 1 ? 'Tool' : 'Tools'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Beliebte Umrechner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.slice(0, 9).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{tool.icon}</span>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {tool.shortDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {tool.popularConversions.slice(0, 3).map((conv) => (
                        <Badge key={conv.slug} variant="secondary" className="text-xs">
                          {conv.fromLabel} → {conv.toLabel}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Beliebteste Umrechnungen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularConversions.slice(0, 16).map((conv) => (
              <Link
                key={conv.slug}
                href={`/umrechnung/${conv.slug}`}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">
                  {conv.fromLabel} → {conv.toLabel}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Warum UmrechnerPro?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {usps.map((usp, i) => (
              <div key={i} className="text-center p-4">
                <usp.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm">{usp.title}</h3>
                <p className="text-xs text-muted-foreground">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
            <h2 className="text-2xl font-bold mb-4">
              Einheitenumrechner auf Deutsch – Warum UmrechnerPro?
            </h2>
            <p className="text-muted-foreground">
              UmrechnerPro ist Ihre erste Anlaufstelle für präzise Einheitenumrechnungen auf Deutsch. 
              Egal ob Sie Längen, Gewichte, Temperaturen oder Volumina umrechnen möchten – unsere 
              54 spezialisierten Umrechner liefern Ihnen sofortige, wissenschaftlich präzise Ergebnisse.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">
              Für alle Einheitensysteme
            </h3>
            <p className="text-muted-foreground">
              Unsere Umrechner unterstützen sowohl das metrische System (SI-Einheiten) als auch 
              imperialen und US-amerikanischen Einheiten. Von Kilometern zu Meilen, von Kilogramm 
              zu Pfund, von Celsius zu Fahrenheit – wir decken alle gängigen Konvertierungen ab.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">
              Wissenschaftlich korrekte Formeln
            </h3>
            <p className="text-muted-foreground">
              Alle Umrechnungsformeln basieren auf offiziellen NIST-Standards (National Institute 
              of Standards and Technology) und sind auf höchste Präzision ausgelegt. Besonders bei 
              Temperaturumrechnungen ist dies wichtig, da diese nicht linear erfolgen.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">
              Ideal für Schule, Studium & Beruf
            </h3>
            <p className="text-muted-foreground">
              Schüler, Studenten, Ingenieure, Köche und Handwerker – alle finden bei UmrechnerPro 
              die passenden Werkzeuge. Die Ergebnisse werden im deutschen Zahlenformat angezeigt 
              (Komma als Dezimaltrennzeichen, Punkt als Tausendertrennzeichen).
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">
              DACH-Region: Deutschland, Österreich & Schweiz
            </h3>
            <p className="text-muted-foreground">
              UmrechnerPro wurde speziell für den deutschsprachigen Raum entwickelt. Alle Inhalte, 
              Einheiten und Formate sind auf die Bedürfnisse von Nutzern aus Deutschland, Österreich 
              und der Schweiz zugeschnitten.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Häufig gestellte Fragen
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
