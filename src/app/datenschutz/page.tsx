import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung gemäß DSGVO',
  description: 'Datenschutzerklärung von UmrechnerPro.de – Informationen zur Datenverarbeitung nach DSGVO',
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Startseite</Link>
          {' / '}
          <span className="text-foreground">Datenschutzerklärung</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung gemäß DSGVO</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">1. Verantwortlicher</h2>
              <p className="text-muted-foreground">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist der im 
                <Link href="/impressum" className="text-primary hover:underline"> Impressum</Link> genannte Betreiber.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="text-muted-foreground">
                Beim Besuch unserer Website werden automatisch Informationen an unseren Webserver gesendet. 
                Diese Daten umfassen: Browsertyp und Version, verwendetes Betriebssystem, Referrer URL, 
                Uhrzeit der Serveranfrage. Diese Daten werden ausschließlich zur Sicherstellung eines 
                störungsfreien Betriebs der Website ausgewertet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">3. Cookies</h2>
              <p className="text-muted-foreground">
                Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem 
                Endgerät gespeichert werden. Wir nutzen folgende Cookie-Kategorien:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li><strong>Notwendige Cookies:</strong> Für den Betrieb der Website erforderlich</li>
                <li><strong>Statistik-Cookies:</strong> Google Analytics (mit IP-Anonymisierung)</li>
                <li><strong>Marketing-Cookies:</strong> Google AdSense</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">4. Ihre Rechte</h2>
              <p className="text-muted-foreground">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, 
                Datenübertragbarkeit und Widerspruch. Bei Verstößen können Sie sich bei der zuständigen 
                Aufsichtsbehörde beschweren.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">5. Google Analytics</h2>
              <p className="text-muted-foreground">
                Diese Website nutzt Google Analytics mit aktivierter IP-Anonymisierung. 
                Die IP-Adresse wird gekürzt übermittelt. Die Verarbeitung erfolgt auf Grundlage 
                von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">6. Google AdSense</h2>
              <p className="text-muted-foreground">
                Diese Website nutzt Google AdSense zur Einblendung von Werbung. 
                Die Nutzung erfolgt nur nach Ihrer ausdrücklichen Einwilligung (Opt-in).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">7. Kontakt</h2>
              <p className="text-muted-foreground">
                Bei Fragen zum Datenschutz erreichen Sie uns unter: kontakt@umrechnerpro.de
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
