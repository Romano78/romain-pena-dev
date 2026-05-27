import type { Metadata } from 'next';
import Resume from '@/components/Resume';

const metadataByLocale = {
  en: {
    title: 'Resume — Romain Pena',
    description: 'Download or view my resume. Frontend developer and Shopify specialist based in Montreal.',
  },
  fr: {
    title: 'CV — Romain Pena',
    description: 'Téléchargez ou consultez mon CV. Développeur frontend et spécialiste Shopify basé à Montréal.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[locale as keyof typeof metadataByLocale] || metadataByLocale.en;

  const canonicalUrl = locale === 'en' ? 'https://romainpena.com/resume' : 'https://romainpena.com/fr/resume';

  return {
    metadataBase: new URL('https://romainpena.com'),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://romainpena.com/resume',
        'fr': 'https://romainpena.com/fr/resume',
        'x-default': 'https://romainpena.com/resume',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'Romain Pena Ruiz',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function ResumePage() {
  return (
    <main className='container m-auto mt-[var(--menu-height)] py-16'>
      <Resume />
    </main>
  );
}
