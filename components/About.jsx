import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import TextReveal from '@/components/snippets/TextReveal';

export default function About() {
  return (
    <section className="py-0 lg:mb-8">
      <ScrambleTextAnimation1 className="text-overline mb-6 text-muted">
        {'A bit about me.'}
      </ScrambleTextAnimation1>
      <TextReveal
        body={
          "I've spent the last few years working on Shopify stores for brands that care about the details — the ones where off-the-shelf solutions aren't good enough. I work as an extension of your team: I move fast, communicate clearly, and build things that actually last."
        }
        className="h3 pt-12 lg:pt-4"
        blockClassName="max-w-[1074px]"
        textClassName="text-primary"
      />
    </section>
  );
}
