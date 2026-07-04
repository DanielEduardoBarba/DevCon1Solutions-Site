import Home from '../scenes/Home'

export const metadata = {
  title: 'DevCon1 Solutions — Software, IT, and Custom Solutions',
  description:
    'DevCon1 Solutions delivers custom software development, IT consulting, and embedded solutions. Web, mobile, and cloud — from idea to production.',
  alternates: { canonical: 'https://devcon1solutions.com/' },
  openGraph: {
    title: 'DevCon1 Solutions — Software, IT, and Custom Solutions',
    description:
      'Take control of your next big web, mobile, or cloud based product.',
    url: 'https://devcon1solutions.com/',
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return <Home />
}
