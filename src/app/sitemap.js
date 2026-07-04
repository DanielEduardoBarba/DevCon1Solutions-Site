export const dynamic = 'force-static'

const BASE_URL = 'https://devcon1solutions.com'

export default function sitemap() {
  return [
    { url: `${BASE_URL}/`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about/`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/apps/`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/markour/`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/marksman/`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/contact/`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/privacy/`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
