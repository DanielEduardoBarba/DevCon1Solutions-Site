import Markour from '../../scenes/Markour'

export const metadata = {
  title: 'Markour — Draw, Collaborate & Create | Real-Time Whiteboard App',
  description:
    'Markour is a beautiful real-time collaborative whiteboard for iPhone and iPad. Draw with natural brushes, add text and images, chat live, and create together — anywhere.',
  alternates: { canonical: 'https://devcon1solutions.com/markour/' },
  openGraph: {
    type: 'website',
    title: 'Markour — Draw, Collaborate & Create',
    description:
      'A beautiful real-time whiteboard for iPhone and iPad. Sketch, annotate, and create together — every stroke appears live.',
    url: 'https://devcon1solutions.com/markour/',
    images: [{ url: '/markour/markour-logo.png', width: 1200, height: 630, alt: 'Markour app' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markour — Draw, Collaborate & Create',
    description:
      'A beautiful real-time whiteboard for iPhone and iPad. Sketch, annotate, and create together.',
    images: ['/markour/markour-logo.png'],
  },
  other: {
    'application-name': 'Markour',
  },
}

export default function MarkourPage() {
  return <Markour />
}
