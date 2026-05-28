import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/config/theme-provider';
import ProgressBar from '@/components/ProgressBar';
import Menu from '@/components/menu';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const metadataByLocale = {
  en: {
    title: 'Romain Pena — Web & Shopify Developer',
    description: 'Frontend and Shopify developer based in Montreal. I build custom storefronts, web apps, and integrations — fast, clean, and pixel-perfect.',
  },
  fr: {
    title: 'Romain Pena — Développeur Web & Shopify',
    description: 'Développeur frontend et Shopify basé à Montréal. Je crée des boutiques sur mesure, des apps web et des intégrations — rapides, propres et pixel-perfect.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[locale as keyof typeof metadataByLocale] || metadataByLocale.en;
  const canonicalUrl = locale === 'en' ? 'https://romainpena.com' : 'https://romainpena.com/fr';

  return {
    metadataBase: new URL('https://romainpena.com'),
    title: meta.title,
    description: meta.description,
    icons: {
      icon: [
        { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
        { url: '/favicon-96x96.png?v=2', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.ico?v=2' },
      ],
      apple: '/apple-touch-icon.png?v=2',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://romainpena.com',
        'fr': 'https://romainpena.com/fr',
        'x-default': 'https://romainpena.com',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'Romain Pena Ruiz',
      type: 'website',
      images: [
        {
          url: 'https://romainpena.com/og-image.svg',
          width: 1200,
          height: 630,
          alt: 'Romain Pena',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}

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
        <ProgressBar />
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
