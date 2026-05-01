import MainHero from '@/components/MainHero';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Steps from '@/components/snippets/Steps';
import PricingTable from '@/components/PricingTable';
import Contact from '@/components/Contact';
import BackToTopButton from '@/components/snippets/BackToTopButton';
import { getProjectImages, getMarqueeImages, getPortraitImages } from '@/lib/cloudinary';

const SECTION_SPACING = 'pt-20 lg:pt-32';

export default async function Home() {
  const [{ left: leftCol, right: rightCol }, projectImages, portraits] = await Promise.all([
    getMarqueeImages(),
    getProjectImages(),
    getPortraitImages(),
  ]);

  return (
    <main id='main-content' className='container py-0 m-auto mt-(--menu-height)'>
      <MainHero leftCol={leftCol} rightCol={rightCol} />
      <About className={SECTION_SPACING} portraits={portraits} />
      <Work className={SECTION_SPACING} projectImages={projectImages} />
      <Services className={SECTION_SPACING} />
      <Steps className={SECTION_SPACING} />
      <PricingTable className={SECTION_SPACING} />
      <Contact className={`${SECTION_SPACING} pb-20 lg:pb-32`} />
      <BackToTopButton position='center' />
    </main>
  );
}
