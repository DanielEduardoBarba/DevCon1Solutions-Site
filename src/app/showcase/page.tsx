import Showcase from '../../scenes/Showcase'

export const metadata = {
  title: 'Showcase — What We\u2019re Building, in Motion',
  description:
    'A living pulse of DevCon1 Solutions\u2019 growing lineup — Markour and Marksman today, more products in motion tomorrow.',
  alternates: { canonical: 'https://devcon1solutions.com/showcase/' },
  openGraph: {
    type: 'website',
    title: 'Showcase — What We\u2019re Building, in Motion',
    description:
      'A living pulse of our growing lineup — software today, hardware next. Each product breathing in its own rhythm.',
    url: 'https://devcon1solutions.com/showcase/',
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630 }],
  },
}

export default function ShowcasePage() {
  return <Showcase />
}
