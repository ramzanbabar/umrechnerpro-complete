import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, categoryList, CategorySlug } from '@/lib/categories';
import { getToolsByCategory, toolList } from '@/lib/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categoryList.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = categories[category as CategorySlug];
  
  if (!cat) {
    return {
      title: 'Kategorie nicht gefunden',
    };
  }

  return {
    title: `${cat.name} – Alle Umrechner | UmrechnerPro.de`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} – Alle Umrechner`,
      description: cat.description,
      url: `https://umrechnerpro.de/kategorie/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = categories[category as CategorySlug];

  if (!cat) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category as CategorySlug);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} – Alle Umrechner`,
    description: cat.description,
    url: `https://umrechnerpro.de/kategorie/${category}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Startseite</Link>
          {' / '}
          <Link href="/kategorien" className="hover:text-foreground">Kategorien</Link>
          {' / '}
          <span className="text-foreground">{cat.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {cat.name} – Alle Umrechner im Überblick
              </h1>
              <p className="text-muted-foreground mt-1">{cat.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge>{categoryTools.length} Umrechner</Badge>
            {cat.featured && <Badge variant="secondary">Beliebt</Badge>}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tool.icon}</span>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.shortDescription}
                  </p>
                  {tool.popularConversions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tool.popularConversions.slice(0, 3).map((conv) => (
                        <Badge key={conv.slug} variant="secondary" className="text-xs">
                          {conv.fromLabel} → {conv.toLabel}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Content */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Über {cat.name}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              In der Kategorie {cat.name} finden Sie {categoryTools.length} spezialisierte Umrechner. 
              Jeder Umrechner bietet wissenschaftlich präzise Berechnungen basierend auf 
              NIST-Standards und zeigt Ergebnisse im deutschen Zahlenformat an.
            </p>
            <p>
              Die Umrechner sind ideal für Schule, Studium, Beruf und den Alltag. 
              Alle Berechnungen erfolgen in Echtzeit ohne Seitenreload.
            </p>
          </CardContent>
        </Card>

        {/* Other Categories */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Andere Kategorien</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categoryList
              .filter(c => c.slug !== category)
              .slice(0, 8)
              .map((otherCat) => (
                <Link
                  key={otherCat.slug}
                  href={`/kategorie/${otherCat.slug}`}
                  className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50"
                >
                  <span>{otherCat.icon}</span>
                  <span className="text-sm font-medium">{otherCat.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
