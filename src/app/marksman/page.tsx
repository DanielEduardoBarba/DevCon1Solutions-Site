import Marksman from '../../scenes/Marksman'

export const metadata = {
  title: 'Marksman — Interactive Gun Range | Free Web Shooting Simulator',
  description:
    'Marksman is a free, browser-based long-range shooting simulator. Pick a caliber, read the wind, dial your turrets in mils and put rounds on steel from 50 to 3000 m — no download required.',
  alternates: { canonical: 'https://devcon1solutions.com/marksman/' },
  openGraph: {
    type: 'website',
    title: 'Marksman — Interactive Gun Range',
    description:
      'Free web-based long-range shooting simulator. Real ballistics, 8 calibers, 50–3000 m — play in your browser.',
    url: 'https://devcon1solutions.com/marksman/',
    images: [{ url: '/marksman/marksman-logo.svg', width: 1200, height: 630, alt: 'Marksman shooting simulator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marksman — Interactive Gun Range',
    description: 'Free web-based long-range shooting simulator. Real ballistics. No download needed.',
    images: ['/marksman/marksman-logo.svg'],
  },
}

export default function MarksmanPage() {
  return <Marksman />
}
