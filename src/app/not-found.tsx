import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';
import { featuredTools, getAllSubConversions } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404)',
  description: 'Die angeforderte Seite konnte nicht gefunden werden.',
};

export default function NotFound() {
  const popularConversions = getAllSubConversions().slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Seite nicht gefunden</h1>
        <p className="text-muted-foreground mb-8">
          Die angeforderte Seite existiert leider nicht. Sie wurde möglicherweise verschoben 
          oder gelöscht.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Link href="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Zur Startseite
            </Button>
          </Link>
        </div>

        <Card className="text-left">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Beliebte Umrechner
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {featuredTools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-2 rounded hover:bg-muted/50 text-sm"
                >
                  {tool.icon} {tool.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="text-left mt-4">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Beliebte Umrechnungen</h2>
            <div className="grid grid-cols-2 gap-2">
              {popularConversions.map((conv) => (
                <Link
                  key={conv.slug}
                  href={`/umrechnung/${conv.slug}`}
                  className="p-2 rounded hover:bg-muted/50 text-sm"
                >
                  {conv.fromLabel} → {conv.toLabel}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
