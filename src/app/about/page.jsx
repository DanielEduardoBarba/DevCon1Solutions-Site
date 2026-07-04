import AboutUs from '../../scenes/AboutUs'

export const metadata = {
  title: 'About Us — Meet the Team',
  description:
    'Meet the DevCon1 Solutions team — experienced engineers and professionals delivering custom software from idea to production.',
  alternates: { canonical: 'https://devcon1solutions.com/about/' },
  openGraph: {
    title: 'About Us — DevCon1 Solutions',
    description:
      'Meet the people behind DevCon1 Solutions — engineers and professionals who love building great software.',
    url: 'https://devcon1solutions.com/about/',
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return <AboutUs />
}
