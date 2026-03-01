import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GdprBanner } from '@/components/layout/GdprBanner';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://umrechnerpro.de'),
  title: {
    default: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
    template: '%s | UmrechnerPro.de',
  },
  description: '50+ professionelle Umrechner für Länge, Gewicht, Temperatur, Volumen und mehr – kostenlos, sofort und auf Deutsch. Für Deutschland, Österreich & Schweiz.',
  keywords: ['Umrechner', 'Einheitenumrechner', 'cm in Zoll', 'kg in Pfund', 'Celsius Fahrenheit', 'Deutsch'],
  authors: [{ name: 'UmrechnerPro Team' }],
  creator: 'UmrechnerPro',
  publisher: 'UmrechnerPro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://umrechnerpro.de',
    siteName: 'UmrechnerPro.de',
    title: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
    description: '50+ professionelle Umrechner für Länge, Gewicht, Temperatur, Volumen und mehr – kostenlos, sofort und auf Deutsch.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
    description: '50+ professionelle Umrechner für Länge, Gewicht, Temperatur, Volumen und mehr.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <GdprBanner />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
