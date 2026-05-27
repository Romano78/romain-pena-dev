import { MetadataRoute } from 'next';
import { projects } from '@/config/projects';

const BASE_URL = 'https://romainpena.com';
const LOCALES = ['en', 'fr'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  const DEFAULT_LOCALE = 'en';

  // Home pages
  LOCALES.forEach((locale) => {
    const url = locale === DEFAULT_LOCALE ? BASE_URL : `${BASE_URL}/${locale}`;
    routes.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    });
  });

  // Resume pages
  LOCALES.forEach((locale) => {
    const url = locale === DEFAULT_LOCALE ? `${BASE_URL}/resume` : `${BASE_URL}/${locale}/resume`;
    routes.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Work case study pages
  projects.forEach((project) => {
    LOCALES.forEach((locale) => {
      const url = locale === DEFAULT_LOCALE
        ? `${BASE_URL}/work/${project.slug}`
        : `${BASE_URL}/${locale}/work/${project.slug}`;
      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return routes;
}
