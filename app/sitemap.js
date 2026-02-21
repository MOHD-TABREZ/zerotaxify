export default function sitemap() {
  const base = 'https://zerotaxify.com';
  return ['/', '/tax-calculator', '/services', '/about', '/testimonials', '/resources', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8
  }));
}
