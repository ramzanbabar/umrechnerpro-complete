import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug } from '@/lib/tools';
import { categories } from '@/lib/categories';
import { ToolPageClient } from './ToolPageClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    value?: string;
    from?: string;
    to?: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(tools).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    return {
      title: 'Umrechner nicht gefunden',
    };
  }

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `https://umrechnerpro.de/tools/${slug}`,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const category = categories[tool.category];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `https://umrechnerpro.de/tools/${slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    inLanguage: 'de-DE',
    description: tool.metaDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageClient 
        tool={tool} 
        category={category}
        initialParams={resolvedSearchParams}
      />
    </>
  );
}
