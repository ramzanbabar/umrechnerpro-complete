import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Haftungsausschluss',
  description: 'Haftungsausschluss von UmrechnerPro.de',
};

export default function HaftungsausschlussPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Startseite</Link>
          {' / '}
          <span className="text-foreground">Haftungsausschluss</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Haftungsausschluss</h1>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Haftung für Inhalte</h2>
              <p className="text-muted-foreground">
                Alle Berechnungen auf UmrechnerPro.de dienen ausschließlich der Information. 
                Trotz sorgfältiger Prüfung übernehmen wir keine Haftung für die Richtigkeit 
                der Ergebnisse. Für wissenschaftliche oder kommerzielle Anwendungen empfehlen 
                wir eine Überprüfung der Werte durch qualifiziertes Personal.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Haftung für Links</h2>
              <p className="text-muted-foreground">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir 
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr 
                übernehmen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Urheberrecht</h2>
              <p className="text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte unterliegen dem deutschen Urheberrecht. 
                Die Vervielfältigung bedarf der schriftlichen Zustimmung.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Keine Finanzberatung</h2>
              <p className="text-muted-foreground">
                Die auf dieser Website bereitgestellten Informationen stellen keine Finanzberatung dar. 
                Bei finanziellen Entscheidungen wenden Sie sich bitte an qualifizierte Berater.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Affiliate-Hinweis</h2>
              <p className="text-muted-foreground">
                Diese Website enthält Werbelinks (Affiliate-Links). Bei Kauf über diese Links erhalten 
                wir eine Provision, ohne dass für Sie Mehrkosten entstehen. Dies wird durch den 
                Hinweis &quot;Anzeige&quot; oder &quot;Werbung&quot; gekennzeichnet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
