import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSubConversions, getToolForSubConversion, getSubConversionBySlug, tools } from '@/lib/tools';
import { categories } from '@/lib/categories';
import { SubConversionPageClient } from './SubConversionPageClient';

interface PageProps {
  params: Promise<{
    conversion: string;
  }>;
}

export async function generateStaticParams() {
  const allConversions = getAllSubConversions();
  return allConversions.map((conv) => ({
    conversion: conv.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const subConv = getSubConversionBySlug(conversion);
  
  if (!subConv) {
    return {
      title: 'Umrechnung nicht gefunden',
    };
  }

  return {
    title: subConv.h1,
    description: subConv.metaDescription,
    openGraph: {
      title: subConv.h1,
      description: subConv.metaDescription,
      url: `https://umrechnerpro.de/umrechnung/${conversion}`,
      type: 'website',
    },
  };
}

export default async function SubConversionPage({ params }: PageProps) {
  const { conversion } = await params;
  const subConv = getSubConversionBySlug(conversion);

  if (!subConv) {
    notFound();
  }

  const tool = getToolForSubConversion(conversion);
  if (!tool) {
    notFound();
  }

  const category = categories[tool.category];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: subConv.h1,
    description: subConv.metaDescription,
    url: `https://umrechnerpro.de/umrechnung/${conversion}`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: `${subConv.fromLabel} in ${subConv.toLabel} Umrechner`,
      applicationCategory: 'UtilitiesApplication',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubConversionPageClient 
        subConversion={subConv}
        tool={tool}
        category={category}
      />
    </>
  );
}
