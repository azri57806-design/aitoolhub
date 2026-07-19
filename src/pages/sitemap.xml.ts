import type { APIRoute } from 'astro';

// 动态生成 sitemap.xml，自动包含所有静态页面
// 注意：site 配置不含 base 路径，必须用 import.meta.env.BASE_URL 拼上
const staticPages = [
  '',
  'ai-tools',
  'tools',
  'tools/word-counter',
  'tools/uuid',
  'tools/json',
  'tools/base64',
  'tools/timestamp',
  'tools/color',
  'about',
];

export const GET: APIRoute = ({ site }) => {
  // site = 'https://host' (不含 base)
  // import.meta.env.BASE_URL = '/aitoolhub/' 或 '/' (含尾部斜杠)
  const siteOrigin = site?.toString().replace(/\/$/, '') || 'https://example.com';
  const baseUrl = import.meta.env.BASE_URL || '/';
  // 拼出完整前缀并去掉尾部多余斜杠
  const fullBase = `${siteOrigin}${baseUrl}`.replace(/\/+$/, '');
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = staticPages
    .map((path) => {
      const loc = path === '' ? `${fullBase}/` : `${fullBase}/${path}/`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
