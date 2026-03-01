'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubConversion, Tool, getToolBySlug } from '@/lib/tools';
import { Category } from '@/lib/categories';
import { UnitConverter } from '@/components/tools/UnitConverter';
import { getConversionFunction } from '@/lib/converters';
import { smartFormat } from '@/lib/formatters';

interface SubConversionPageClientProps {
  subConversion: SubConversion;
  tool: Tool;
  category: Category;
}

export function SubConversionPageClient({ subConversion, tool, category }: SubConversionPageClientProps) {
  const convertFn = getConversionFunction(tool.slug);

  // Generate conversion table values
  const generateTableValues = (): Array<{ from: number; to: number }> => {
    const values: Array<{ from: number; to: number }> = [];
    for (let i = 1; i <= 20; i++) {
      const fromValue = i;
      const toValue = convertFn(fromValue, subConversion.fromUnit, subConversion.toUnit);
      values.push({ from: fromValue, to: toValue });
    }
    return values;
  };

  const tableValues = generateTableValues();
  const conversionFactor = convertFn(1, subConversion.fromUnit, subConversion.toUnit);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Startseite</Link>
        {' / '}
        <Link href={`/tools/${tool.slug}`} className="hover:text-foreground">
          {tool.name}
        </Link>
        {' / '}
        <span className="text-foreground">{subConversion.fromLabel} → {subConversion.toLabel}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* H1 */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{subConversion.h1}</h1>
            <p className="mt-2 text-muted-foreground">{subConversion.metaDescription}</p>
          </div>

          {/* Converter */}
          <UnitConverter
            units={tool.units}
            convertFn={convertFn}
            defaultFrom={subConversion.fromUnit}
            defaultTo={subConversion.toUnit}
            defaultValue={1}
            toolSlug={tool.slug}
          />

          {/* Conversion Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Umrechnungstabelle – {subConversion.fromLabel} in {subConversion.toLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">{subConversion.fromLabel}</th>
                      <th className="text-left py-2 px-3 font-medium">{subConversion.toLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableValues.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-muted/30' : ''}>
                        <td className="py-2 px-3">{row.from} {subConversion.fromUnit}</td>
                        <td className="py-2 px-3 font-medium">
                          {smartFormat(row.to)} {subConversion.toUnit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Formula */}
          <Card>
            <CardHeader>
              <CardTitle>Umrechnungsformel</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                <strong>1 {subConversion.fromLabel} = {smartFormat(conversionFactor)} {subConversion.toLabel}</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Diese Formel basiert auf den offiziellen NIST-Standards (National Institute 
                of Standards and Technology) und ist wissenschaftlich präzise.
              </p>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>
                {subConversion.fromLabel} in {subConversion.toLabel} umrechnen
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Die Umrechnung von {subConversion.fromLabel} in {subConversion.toLabel} ist eine 
                der häufigsten Konvertierungen im Alltag und in der Wissenschaft. Auf dieser Seite 
                finden Sie einen kostenlosen Online-Umrechner sowie eine detaillierte Umrechnungstabelle.
              </p>
              <h3 className="text-lg font-semibold mt-4">Anwendungsbeispiele</h3>
              <p>
                Diese Umrechnung ist besonders nützlich für Schüler, Studenten, Ingenieure und alle, 
                die im internationalen Kontext arbeiten. Sowohl im Alltag als auch in technischen 
                Berufen wird diese Konvertierung häufig benötigt.
              </p>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">
                  Wie viele {subConversion.toLabel} sind 1 {subConversion.fromLabel}?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  1 {subConversion.fromLabel} entspricht{' '}
                  <strong>{smartFormat(conversionFactor)} {subConversion.toLabel}</strong>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Wie viele {subConversion.fromLabel} sind 1 {subConversion.toLabel}?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  1 {subConversion.toLabel} entspricht{' '}
                  <strong>{smartFormat(convertFn(1, subConversion.toUnit, subConversion.fromUnit))} {subConversion.fromLabel}</strong>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Wo wird diese Umrechnung verwendet?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Diese Umrechnung wird häufig in Schule, Studium, Technik, Handel und im Alltag 
                  verwendet. Sie ist besonders relevant für internationale Projekte und Dokumentationen.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Back to tool */}
          <Card>
            <CardContent className="p-4">
              <Link
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                ← Zurück zum {tool.name}
              </Link>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Suchanfragen/Monat:</span>
                <span className="font-medium">{subConversion.searchVolume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priorität:</span>
                <Badge variant="secondary">{subConversion.priority}/10</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Related conversions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ähnliche Umrechnungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tool.popularConversions
                .filter(c => c.slug !== subConversion.slug)
                .slice(0, 5)
                .map((conv) => (
                  <Link
                    key={conv.slug}
                    href={`/umrechnung/${conv.slug}`}
                    className="block p-2 rounded hover:bg-muted/50 text-sm"
                  >
                    {conv.fromLabel} → {conv.toLabel}
                  </Link>
                ))}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-xs text-muted-foreground">
              <p>
                Alle Berechnungen dienen ausschließlich der Information. 
                Trotz sorgfältiger Prüfung übernehmen wir keine Haftung für die Richtigkeit.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
