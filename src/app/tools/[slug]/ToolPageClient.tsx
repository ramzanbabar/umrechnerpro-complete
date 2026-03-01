'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tool } from '@/lib/tools';
import { Category } from '@/lib/categories';
import { UnitConverter } from '@/components/tools/UnitConverter';
import { getConversionFunction } from '@/lib/converters';
import { getToolBySlug } from '@/lib/tools';

interface ToolPageClientProps {
  tool: Tool;
  category: Category;
  initialParams?: {
    value?: string;
    from?: string;
    to?: string;
  };
}

export function ToolPageClient({ tool, category, initialParams }: ToolPageClientProps) {
  const convertFn = getConversionFunction(tool.slug);
  
  const defaultFrom = initialParams?.from || tool.units[0]?.symbol;
  const defaultTo = initialParams?.to || tool.units[1]?.symbol || tool.units[0]?.symbol;
  const defaultValue = initialParams?.value ? parseFloat(initialParams.value) : 1;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Startseite</Link>
        {' / '}
        <Link href={`/kategorie/${category.slug}`} className="hover:text-foreground">
          {category.name}
        </Link>
        {' / '}
        <span className="text-foreground">{tool.name}</span>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Converter (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* H1 */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{tool.h1}</h1>
            <p className="mt-2 text-muted-foreground">{tool.shortDescription}</p>
          </div>

          {/* Main Converter */}
          <UnitConverter
            units={tool.units}
            convertFn={convertFn}
            defaultFrom={defaultFrom}
            defaultTo={defaultTo}
            defaultValue={defaultValue}
            popularConversions={tool.popularConversions}
            toolSlug={tool.slug}
          />

          {/* Content Section */}
          <Card>
            <CardHeader>
              <CardTitle>Wie funktioniert dieser Umrechner?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Der {tool.name} ermöglicht Ihnen, {tool.primaryKeyword.replace(/-/g, ' ')} 
                schnell und präzise durchzuführen. Wählen Sie einfach die Ausgangseinheit 
                und Zieleinheit aus, geben Sie den Wert ein und erhalten Sie sofort das Ergebnis.
              </p>
              <p>
                Alle Berechnungen basieren auf wissenschaftlich präzisen Formeln gemäß 
                NIST-Standard (National Institute of Standards and Technology). Die Ergebnisse 
                werden im deutschen Zahlenformat mit Komma als Dezimaltrennzeichen angezeigt.
              </p>
            </CardContent>
          </Card>

          {/* Popular Conversions */}
          {tool.popularConversions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Beliebte Umrechnungen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.popularConversions.map((conv) => (
                    <Link
                      key={conv.slug}
                      href={`/umrechnung/${conv.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <span className="font-medium">
                          {conv.fromLabel} → {conv.toLabel}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {conv.searchVolume} Suchanfragen/Monat
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tool.popularConversions.slice(0, 5).map((conv, i) => (
                <div key={i}>
                  <h3 className="font-semibold">
                    Wie rechnet man {conv.fromLabel} in {conv.toLabel} um?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verwenden Sie unseren {tool.name} oben auf dieser Seite. 
                    Geben Sie einfach den Wert in {conv.fromLabel} ein und Sie erhalten 
                    sofort das Ergebnis in {conv.toLabel}. Die Umrechnung erfolgt in Echtzeit.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Category Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Kategorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/kategorie/${category.slug}`}
                className="flex items-center gap-2 hover:text-primary"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                {category.description}
              </p>
            </CardContent>
          </Card>

          {/* Related Tools */}
          {tool.relatedTools.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ähnliche Umrechner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tool.relatedTools.map((relatedSlug) => {
                  const relatedTool = getToolBySlug(relatedSlug);
                  if (!relatedTool) return null;
                  return (
                    <Link
                      key={relatedSlug}
                      href={`/tools/${relatedSlug}`}
                      className="flex items-center gap-2 p-2 rounded hover:bg-muted/50"
                    >
                      <span>{relatedTool.icon}</span>
                      <span className="text-sm">{relatedTool.name}</span>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Keywords */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Schlüsselwörter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{tool.primaryKeyword}</Badge>
                {tool.secondaryKeywords.slice(0, 4).map((kw, i) => (
                  <Badge key={i} variant="outline">{kw}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-xs text-muted-foreground">
              <p>
                Alle Berechnungen auf UmrechnerPro.de dienen ausschließlich der Information. 
                Trotz sorgfältiger Prüfung übernehmen wir keine Haftung für die Richtigkeit 
                der Ergebnisse. Für wissenschaftliche oder kommerzielle Anwendungen empfehlen 
                wir eine Überprüfung der Werte.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
