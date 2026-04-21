import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { unstable_cache } from 'next/cache';
import { cldImage } from './cloudinary-url';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUD) throw new Error('Missing env var: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');

cloudinary.config({
  cloud_name: CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResource {
  public_id: string;
  format: string;
}

const toPath = (r: CloudinaryResource) => `${r.public_id}.${r.format}`;

function search(expression: string, max = 50) {
  return cloudinary.search.expression(expression).max_results(max).execute();
}

// ─── Marquee gallery ──────────────────────────────────────────────────────

async function _getAllGalleryImages(): Promise<string[]> {
  if (process.env.NODE_ENV === 'development') return [];
  try {
    const res = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix: 'Projects/',
      max_results: 200,
    });
    return (res.resources as CloudinaryResource[])
      .filter(r => r.public_id.includes('/gallery/'))
      .map(r => cldImage(toPath(r), 800));
  } catch (err) {
    console.error('[cloudinary] getAllGalleryImages failed:', err);
    return [];
  }
}

export const getAllGalleryImages = unstable_cache(
  _getAllGalleryImages,
  ['cloudinary-all-gallery-images'],
  { revalidate: 3600 },
);

// ─── Project thumbnails ───────────────────────────────────────────────────

async function _getProjectImages(): Promise<Record<string, string>> {
  if (process.env.NODE_ENV === 'development') return {};
  try {
    const slugs = ['atari', 'philippe-tullio', 'togethxr', 'andor-collective', 'animoetc', 'jaysonhome', 'ccollections'];

    const results = await Promise.allSettled(
      slugs.map((slug) =>
        search(`asset_folder="Projects/${slug}/cover" AND resource_type=image`, 1),
      ),
    );

    return slugs.reduce<Record<string, string>>((acc, slug, i) => {
      const res = results[i];
      if (res.status === 'fulfilled' && res.value.resources.length > 0) {
        acc[slug] = cldImage(toPath(res.value.resources[0]), 1200);
      }
      return acc;
    }, {});
  } catch (err) {
    console.error('[cloudinary] getProjectImages failed:', err);
    return {};
  }
}

export const getProjectImages = unstable_cache(
  _getProjectImages,
  ['cloudinary-project-images'],
  { revalidate: 3600 },
);

export const getProjectCover = unstable_cache(
  async (slug: string): Promise<string | null> => {
    if (process.env.NODE_ENV === 'development') return null;
    try {
      const res = await search(
        `asset_folder="Projects/${slug}/cover" AND resource_type=image`,
        1,
      );
      if (res.resources.length === 0) return null;
      return cldImage(toPath(res.resources[0]), 1200);
    } catch (err) {
      console.error('[cloudinary] getProjectCover failed:', err);
      return null;
    }
  },
  ['cloudinary-project-cover'],
  { revalidate: 3600 },
);

// ─── Project gallery ──────────────────────────────────────────────────────

export const getProjectGallery = unstable_cache(
  async (slug: string): Promise<string[]> => {
    if (process.env.NODE_ENV === 'development') return [];
    try {
      const res = await search(
        `asset_folder="Projects/${slug}/gallery" AND resource_type=image`,
        20,
      );
      return res.resources.map((r: CloudinaryResource) => cldImage(toPath(r)));
    } catch (err) {
      console.error('[cloudinary] getProjectGallery failed:', err);
      return [];
    }
  },
  ['cloudinary-project-gallery'],
  { revalidate: 3600 },
);
