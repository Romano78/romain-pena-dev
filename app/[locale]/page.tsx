import type { Metadata } from 'next';
import MainHero from '@/components/MainHero';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Steps from '@/components/snippets/Steps';
import Contact from '@/components/Contact';
import BackToTopButton from '@/components/snippets/BackToTopButton';
import { getProjectImages, getMarqueeImages, getPortraitImages } from '@/lib/cloudinary';

const SECTION_SPACING = 'pt-3 lg:pt-32';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'ProfessionalService'],
    name: 'Romain Pena Ruiz',
    alternateName: 'Romain Pena',
    jobTitle: ['Frontend Developer', 'Shopify Developer'],
    url: 'https://romainpena.com',
    email: 'rprdigital.dev@gmail.com',
    sameAs: [
      'https://github.com/Romano78',
      'https://www.linkedin.com/in/romainpenaruiz',
      'https://www.instagram.com/romainpena.dev/',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Montreal',
      areaServed: 'Canada',
    },
    description: locale === 'en'
      ? 'Frontend and Shopify developer specializing in custom storefronts and web experiences'
      : 'Développeur frontend et Shopify spécialisé dans les vitrines personnalisées et les expériences web',
    knowsAbout: [
      'Shopify Development',
      'Frontend Development',
      'React',
      'TypeScript',
      'Next.js',
      'E-commerce',
    ],
  };

  return {
    other: {
      'json-ld': JSON.stringify(jsonLd),
    },
  };
}


export default async function Home() {
  const [{ left: leftCol, right: rightCol }, projectImages, portraits] = await Promise.all([
    getMarqueeImages(),
    getProjectImages(),
    getPortraitImages(),
  ]);

  return (
    <main id='main-content' className='container py-0 m-auto mt-[calc(var(--menu-height))]'>
      <MainHero leftCol={leftCol} rightCol={rightCol} />
      <About className={SECTION_SPACING} portraits={portraits} />
      <Work className={SECTION_SPACING} projectImages={projectImages} />
      <Services className={SECTION_SPACING} />
      <Steps className={SECTION_SPACING} />
<Contact className={`${SECTION_SPACING} pb-12 lg:pb-32`} />
      <BackToTopButton position='center' />
    </main>
  );
}
