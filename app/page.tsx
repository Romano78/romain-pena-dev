'use client';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import SectionHeader from '@/components/snippets/SectionHeader';
import BackToTopButton from '@/components/snippets/BackToTopButton';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import TextReveal from '@/components/snippets/TextReveal';
import Image from 'next/image'


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
      <section className="py-0 lg:py-24 lg:mb-8">
        <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
          {"What I do."}
        </ScrambleTextAnimation1>

      </section>
      <BackToTopButton position="center" />
    </section>
  );
}
