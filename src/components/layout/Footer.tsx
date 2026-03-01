import Link from 'next/link';
import { categories, categoryList } from '@/lib/categories';
import { featuredTools } from '@/lib/tools';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">📏</span>
              <span className="font-bold text-xl">
                UmrechnerPro<span className="text-primary">.de</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Kostenlose Einheitenumrechner auf Deutsch
            </p>
            <p className="text-sm text-muted-foreground">
              📏 Für Deutschland, Österreich & Schweiz
            </p>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="font-semibold mb-4">Kategorien</h3>
            <ul className="space-y-2 text-sm">
              {categoryList.slice(0, 10).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategorie/${cat.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Tools */}
          <div>
            <h3 className="font-semibold mb-4">Top Umrechner</h3>
            <ul className="space-y-2 text-sm">
              {featuredTools.slice(0, 8).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold mb-4">Rechtliches & Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/impressum"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Impressum (§5 TMG)
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Datenschutzerklärung (DSGVO)
                </Link>
              </li>
              <li>
                <Link
                  href="/haftungsausschluss"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Haftungsausschluss
                </Link>
              </li>
              <li>
                <Link
                  href="/nutzungsbedingungen"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nutzungsbedingungen
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t space-y-2 text-sm text-muted-foreground text-center">
          <p>© {currentYear} UmrechnerPro.de – Alle Rechte vorbehalten.</p>
          <p>
            Kein Ersatz für professionelle Beratung. Alle Angaben ohne Gewähr.
          </p>
          <p className="text-xs">
            Made with ❤️ für Deutschland
          </p>
        </div>
      </div>
    </footer>
  );
}
