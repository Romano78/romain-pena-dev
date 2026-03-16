import MainHero from '@/components/MainHero';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Steps from '@/components/snippets/Steps';
import PricingTable from '@/components/PricingTable';
import Contact from '@/components/Contact';
import BackToTopButton from '@/components/snippets/BackToTopButton';

const SECTION_SPACING = 'pt-20 lg:pt-32';

export default function Home() {
  return (
    <main id='main-content' className='container py-0 px-4 md:px-0 m-auto mt-(--menu-height)'>
      <MainHero />
      <About />
      <Services className={SECTION_SPACING} />
      <Work className={SECTION_SPACING} />
      <Steps className={SECTION_SPACING} />
      <PricingTable className={SECTION_SPACING} />
      <Contact className={`${SECTION_SPACING} pb-20 lg:pb-32`} />
      <BackToTopButton position='center' />
    </main>
  );
}
