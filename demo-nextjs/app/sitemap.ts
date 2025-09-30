import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://countries-cities-ar.vercel.app';
  
  const routes = [
    '',
    '/docs',
    '/docs/why',
    '/docs/installation',
    '/docs/installation/nextjs',
    '/docs/installation/react',
    '/docs/api/types',
    '/docs/api/functions',
    '/docs/api/exports',
    '/docs/examples/react',
    '/docs/examples/nextjs',
    '/docs/examples/advanced',
    '/docs/guides/multilang',
    '/docs/guides/search',
    '/docs/guides/performance',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/docs') ? 0.8 : 0.5,
  }));
}
