"use client"

import SectionHeader from '@/components/snippets/SectionHeader';
import BackToTopButton from '@/components/snippets/BackToTopButton';1
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import TextReveal from '@/components/snippets/TextReveal';
import Services from '@/components/Services';
import ProjectCard from '@/components/snippets/ProjectCard';
import Steps from '@/components/snippets/Steps';
import PricingTable from '@/components/PricingTable';
import { Mail } from "lucide-react"

export default function Home() {
  return (
    <section className="container py-0 px-4 md:px-0 m-auto mt-[65.5px]">
      <div className="flex items-center gap-16 overflow-hidden py-0 max-lg:mt-24 max-lg:flex-col lg:h-[calc(100svh-65.5px)]
">
        <SectionHeader
          overline={'MONTREAL QC: 3:20'}
          title={`I build what your Shopify store can't do out of the box.`}
          body={'Custom features, design implementation, and integrations for growing e-commerce brands.'}
          headingType={'h1'}
          align={'left'}
          className="mb-8 flex-1"
          parentClassName={"flex-1"}
        />
        <div className="flex-1">
          <img src={"/profile.JPEG"} alt="Hero Image" width={500} height={500} className="w-full h-auto" />
        </div>
      </div>
      <section className="py-0  lg:mb-8">
        <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
          {"A bit about me."}
        </ScrambleTextAnimation1>
        <TextReveal
          body={"'When we engage with a client, we bring together our experience working across brand strategy, communications, policy and digital to offer a unified perspective. We work as an extension of your team to quickly identify what’s holding your business back, design a solution, and bring together the talent and tools to deliver results.',"}
          className="h3 pt-12 lg:pt-4"
          blockClassName="max-w-[1074px] "
          textClassName="text-primary"
        />
      </section>
      <section className="py-0 lg:py-24">
        <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
          {"What I do."}
        </ScrambleTextAnimation1>

        <Services />
      </section>

      <section className="py-0 lg:mb-8">
        <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
          {"Selected Work"}
        </ScrambleTextAnimation1>
        <ProjectCard
        />
      </section>

      <section className="py-0 lg:mb-8">
        <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
          {"How I Work"}
        </ScrambleTextAnimation1>
        <Steps />
      </section>
      <section className="py-0 lg:mb-8">
        <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
          {"Prices"}
        </ScrambleTextAnimation1>
        <PricingTable />
      </section>

      <section id="contact" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Let{"'"}s talk
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground">
            If you have a Shopify store and need reliable ongoing development, I
            {"'"}d love to hear about it. Send me a message and I{"'"}ll get back to
            you within 24 hours.
          </p>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:gap-16">
            {/* Email link */}
            <a
              href="mailto:hello@romainpena.dev"
              className="flex items-center gap-3 text-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5" />
              <span className="border-b border-foreground pb-0.5 text-sm font-medium transition-colors hover:border-accent">
                hello@romainpena.dev
              </span>
            </a>
          </div>

          {/* Contact form */}
          <form
            className="mt-10 max-w-md space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project"
                rows={4}
                className="w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-md border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:border-accent"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      <BackToTopButton position="center" />
    </section>
  );
}
