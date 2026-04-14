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
    <main className='container px-4 md:px-0 m-auto mt-(--menu-height)'>
      <div className='lg:grid lg:grid-cols-[5fr_7fr] lg:gap-20 lg:items-start'>

        {/* LEFT — sticky sidebar */}
        <aside className='lg:sticky lg:top-(--menu-height) lg:self-start lg:h-[calc(100dvh-var(--menu-height))] lg:flex lg:flex-col py-16 lg:py-20'>
          <Link
            href='/#work'
            className='inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-12'
          >
            <ArrowLeft size={14} />
            Work
          </Link>

          <div className='mt-auto'>
            <p className='text-foreground/70 text-lg leading-relaxed'>
              {project.description}
            </p>

            {project.url && (
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-8 inline-flex items-center gap-2 text-foreground hover:text-muted transition-colors'
              >
                Visit site
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          {/* Metadata */}
          <dl className='pt-8 border-t border-border space-y-2'>
            <div className='flex gap-6'>
              <dt className='text-overline text-muted-foreground w-16 shrink-0'>Client</dt>
              <dd className='text-overline text-foreground'>{project.client}</dd>
            </div>
            <div className='flex gap-6'>
              <dt className='text-overline text-muted-foreground w-16 shrink-0'>Type</dt>
              <dd className='text-overline text-foreground'>{project.type}</dd>
            </div>
          </dl>
        </aside>

        {/* RIGHT — images */}
        <div className='py-16 lg:py-20 space-y-3'>
          {/* Hero */}
          {project.image && (
            <div className='relative w-full aspect-[4/3] bg-card-deep overflow-hidden'>
              <Image
                src={project.image}
                alt={project.client}
                fill
                className='object-contain'
                priority
              />
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className='columns-2 gap-3'>
              {project.gallery.map((img, i) => (
                <div key={i} className='break-inside-avoid mb-3'>
                  <Image
                    src={img}
                    alt={`${project.client} — ${i + 1}`}
                    width={i % 3 === 1 ? 1100 : 800}
                    height={i % 3 === 1 ? 700 : 1100}
                    className='w-full h-auto'
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
