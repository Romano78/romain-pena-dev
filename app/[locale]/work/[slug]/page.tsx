import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { projects, getProject } from '@/config/projects';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return projects.flatMap((p) =>
    routing.locales.map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.client} — Romain Pena`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className='container px-4 md:px-0 m-auto mt-[65.5px] pt-16 pb-32 max-w-3xl'>
      {/* Back */}
      <Link
        href='/#work'
        className='inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-12'
      >
        <ArrowLeft size={14} />
        Work
      </Link>

      {/* Header */}
      <span className='text-overline text-muted'>{project.type}</span>
      <h1 className='h1 mt-3 mb-10'>{project.client}</h1>

      {/* Hero image */}
      {project.image && (
        <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-10'>
          <Image
            src={project.image}
            alt={project.client}
            fill
            className='object-cover'
            priority
          />
        </div>
      )}

      {/* Description */}
      <p className='text-foreground/70 text-lg leading-relaxed mb-12'>
        {project.description}
      </p>

      {/* Deliverables */}
      <div className='border-t border-border pt-10'>
        <span className='text-overline text-muted mb-6 block'>Deliverables</span>
        <ul className='space-y-4'>
          {project.items.map((item) => (
            <li key={item} className='flex items-start gap-3 text-foreground/80'>
              <span className='text-muted mt-0.5 shrink-0'>→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Live URL */}
      {project.url && (
        <div className='mt-12 pt-10 border-t border-border'>
          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-muted hover:opacity-70 transition-opacity'
          >
            Visit brand
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </main>
  );
}
