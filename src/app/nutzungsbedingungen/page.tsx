import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen – UmrechnerPro.de',
  description: 'Nutzungsbedingungen für die Nutzung von UmrechnerPro.de – Kostenlose Einheitenumrechner auf Deutsch',
  robots: { index: true, follow: true },
};

export default function NutzungsbedingungenPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Startseite</Link>
          {' / '}
          <span className="text-foreground">Nutzungsbedingungen</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Nutzungsbedingungen</h1>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">1. Geltungsbereich</h2>
              <p className="text-muted-foreground">
                Diese Nutzungsbedingungen gelten für die Website UmrechnerPro.de und alle damit verbundenen
                Dienste. Durch die Nutzung unserer Website stimmen Sie diesen Bedingungen zu. Die Website
                bietet kostenlose Einheitenumrechner für private und geschäftliche Zwecke an.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">2. Nutzung der Dienste</h2>
              <p className="text-muted-foreground mb-3">
                Die Nutzung der auf UmrechnerPro.de bereitgestellten Umrechner ist kostenlos. Wir gestatten:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Die private Nutzung aller Umrechner ohne Einschränkungen</li>
                <li>Die kommerzielle Nutzung in angemessenem Umfang</li>
                <li>Das Teilen von Links zu unseren Umrechnern</li>
                <li>Das Einbetten von Umrechnern in andere Websites mit Kennzeichnung</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">3. Haftungsausschluss</h2>
              <p className="text-muted-foreground">
                Obwohl wir uns bemühen, korrekte und aktuelle Informationen bereitzustellen, übernehmen wir
                keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der auf dieser Website
                bereitgestellten Inhalte. Die Nutzung der Umrechner erfolgt auf eigene Verantwortung.
                Für kritische Berechnungen sollten Sie professionelle Beratung einholen oder die Ergebnisse
                durch unabhängige Quellen verifizieren.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">4. Verfügbarkeit</h2>
              <p className="text-muted-foreground">
                Wir streben eine hohe Verfügbarkeit unserer Dienste an, können jedoch keine ununterbrochene
                Erreichbarkeit garantieren. Wartungsarbeiten, technische Probleme oder andere Umstände können
                zu vorübergehenden Einschränkungen führen. Ein Anspruch auf dauerhafte Verfügbarkeit besteht nicht.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">5. Urheberrecht</h2>
              <p className="text-muted-foreground">
                Alle Inhalte auf UmrechnerPro.de, einschließlich Texte, Grafiken, Logos und Software, sind
                urheberrechtlich geschützt. Die Vervielfältigung, Verbreitung oder Veränderung von Inhalten
                bedarf unserer schriftlichen Zustimmung, sofern nicht gesetzlich anderweitig geregelt.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">6. Externe Links</h2>
              <p className="text-muted-foreground">
                Unsere Website kann Links zu externen Websites enthalten. Für deren Inhalte sind die jeweiligen
                Betreiber verantwortlich. Wir haben keinen Einfluss auf die Inhalte externer Websites und
                übernehmen dafür keine Haftung.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">7. Änderungen</h2>
              <p className="text-muted-foreground">
                Wir behalten uns vor, diese Nutzungsbedingungen jederzeit zu ändern. Die aktuelle Version ist
                stets auf dieser Seite verfügbar. Bei wesentlichen Änderungen informieren wir Nutzer durch
                einen Hinweis auf der Startseite.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">8. Anwendbares Recht</h2>
              <p className="text-muted-foreground">
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der Sitz des Betreibers,
                soweit gesetzlich zulässig. Die Bestimmungen des UN-Kaufrechts finden keine Anwendung.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">9. Kontakt</h2>
              <p className="text-muted-foreground">
                Bei Fragen zu diesen Nutzungsbedingungen erreichen Sie uns unter:
                <br />
                <strong>E-Mail:</strong> kontakt@umrechnerpro.de
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Stand: Januar 2026</p>
        </div>
      </div>
    </div>
  );
}
