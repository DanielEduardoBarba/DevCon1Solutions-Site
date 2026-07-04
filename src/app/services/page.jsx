import Services from '../../scenes/Services'

export const metadata = {
  title: 'Services — Full-Stack Software Development',
  description:
    'Full-stack software development, cloud infrastructure (AWS, GCP, Azure), mobile apps, embedded systems, and IT consulting from DevCon1 Solutions LLC.',
  alternates: { canonical: 'https://devcon1solutions.com/services/' },
  openGraph: {
    title: 'Services — DevCon1 Solutions',
    description:
      'Full-stack development, cloud infrastructure, mobile apps and IT consulting — everything from idea to production.',
    url: 'https://devcon1solutions.com/services/',
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630 }],
  },
}

export default function ServicesPage() {
  return <Services />
}
