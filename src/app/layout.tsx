import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { site } from '@/lib/config/site';
import { absoluteUrl } from '@/lib/config/links';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Schmale Mono-Schrift für Fahrplan- und Anzeigetafel-Elemente. */
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: absoluteUrl('/'),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
