export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://devcon1solutions.com/sitemap.xml',
    host: 'https://devcon1solutions.com',
  }
}
