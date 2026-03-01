import { MetadataRoute } from 'next';
import { toolList, getAllSubConversions } from '@/lib/tools';
import { categoryList } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umrechnerpro.de';
  
  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = toolList.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Sub-conversion pages
  const subConversionPages: MetadataRoute.Sitemap = getAllSubConversions().map((conv) => ({
    url: `${baseUrl}/umrechnung/${conv.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categoryList.map((cat) => ({
    url: `${baseUrl}/kategorie/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/impressum`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/haftungsausschluss`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/nutzungsbedingungen`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/ueber-uns`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return [
    ...homepage,
    ...toolPages,
    ...subConversionPages,
    ...categoryPages,
    ...legalPages,
  ];
}
