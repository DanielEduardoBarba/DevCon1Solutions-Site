import Apps from '../../scenes/Apps'

export const metadata = {
  title: 'Apps — Interactive Tools & Games',
  description:
    'Interactive tools, games and 3D demos built by DevCon1 Solutions. Play Tic Tac Toe, Connect 4, generate QR codes, or explore a 3D car demo — all in your browser.',
  alternates: { canonical: 'https://devcon1solutions.com/apps/' },
  openGraph: {
    title: 'Apps — DevCon1 Solutions',
    description:
      'Interactive tools, games, and 3D demos — play right in your browser, no download needed.',
    url: 'https://devcon1solutions.com/apps/',
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630 }],
  },
}

export default function AppsPage() {
  return <Apps />
}
