import MainHero from '@/components/MainHero';
import About from '@/components/About';
import Services from '@/components/Services';
import ProjectCard from '@/components/snippets/ProjectCard';
import Steps from '@/components/snippets/Steps';
import PricingTable from '@/components/PricingTable';
import Contact from '@/components/Contact';
import BackToTopButton from '@/components/snippets/BackToTopButton';

export default function Home() {
  return (
    <main className="container py-0 px-4 md:px-0 m-auto mt-[65.5px]">
      <MainHero />
      <About />
      <Services />
      <ProjectCard />
      <Steps />
      <PricingTable />
      <Contact />
      <BackToTopButton position="center" />
    </main>
  );
}
