import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Impressum – Angaben gemäß § 5 TMG',
  description: 'Impressum von UmrechnerPro.de – Angaben gemäß § 5 Telemediengesetz (TMG)',
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Startseite</Link>
          {' / '}
          <span className="text-foreground">Impressum</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Impressum – Angaben gemäß § 5 TMG</h1>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Anbieter/Betreiber</h2>
              <div className="space-y-1 text-muted-foreground">
                <p><strong className="text-foreground">Name:</strong> [PLATZHALTER NAME]</p>
                <p><strong className="text-foreground">Adresse:</strong> [PLATZHALTER STRASSE]</p>
                <p>[PLATZHALTER PLZ] [PLATZHALTER ORT], Deutschland</p>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
              <div className="space-y-1 text-muted-foreground">
                <p><strong className="text-foreground">E-Mail:</strong> kontakt@umrechnerpro.de</p>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Haftungshinweise</h2>
            <p className="text-muted-foreground text-sm">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte verantwortlich. 
              Eine Haftung für fremde Inhalte besteht erst ab Kenntnis einer Rechtsverletzung.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
