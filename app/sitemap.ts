import { MetadataRoute } from 'next';
import { projects } from '@/config/projects';

const BASE_URL = 'https://romainpena.com';
const LOCALES = ['en', 'fr'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    });
  });

  // Resume pages
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Work case study pages
  projects.forEach((project) => {
    LOCALES.forEach((locale) => {
      routes.push({
        url: `${BASE_URL}/${locale}/work/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return routes;
}
