import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/config/theme-provider';
import Menu from '@/components/menu';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  metadataBase: new URL('https://romainpena.com'),
  title: 'Romain Pena — Shopify Developer',
  description: 'I build what your Shopify store can\'t do out of the box.',
  openGraph: {
    title: 'Romain Pena — Shopify Developer',
    description: 'I build what your Shopify store can\'t do out of the box.',
    url: 'https://romainpena.com',
    siteName: 'Romain Pena Ruiz',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Romain Pena — Shopify Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romain Pena — Shopify Developer',
    description: 'I build what your Shopify store can\'t do out of the box.',
    images: ['/opengraph-image.png'],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function LocaleContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'fr')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <SmoothScroll>
          <Menu />
          {children}
          <Footer />
        </SmoothScroll>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <LocaleContent params={params}>{children}</LocaleContent>
    </Suspense>
  );
}
