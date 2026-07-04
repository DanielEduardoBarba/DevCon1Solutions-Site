import '../index.css'
import '../App.css'
import Providers from '../components/Providers'
import Analytics from '../components/Analytics'

const BASE_URL = 'https://devcon1solutions.com'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DevCon1 Solutions — Software, IT, and Custom Solutions',
    template: '%s | DevCon1 Solutions',
  },
  description:
    'DevCon1 Solutions delivers custom software development, IT consulting, and embedded solutions. Web, mobile, and cloud — from idea to production.',
  keywords: [
    'software development', 'IT solutions', 'custom software', 'web development',
    'mobile development', 'cloud solutions', 'embedded systems', 'DevCon1',
    'full stack development', 'AWS', 'GCP', 'React', 'Node.js',
  ],
  authors: [{ name: 'DevCon1 Solutions LLC', url: BASE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'DevCon1 Solutions',
    title: 'DevCon1 Solutions — Software, IT, and Custom Solutions',
    description:
      'Custom software development, IT consulting, and embedded solutions. Take control of your next big web, mobile, or cloud based product.',
    url: BASE_URL,
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630, alt: 'DevCon1 Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCon1 Solutions — Software, IT, and Custom Solutions',
    description: 'Custom software development, IT consulting, and embedded solutions. From idea to production.',
    images: ['/devcon1-full-logo.png'],
  },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="darkreader-lock" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/devcon1-icon.ico" />
        <link rel="apple-touch-icon" href="/devcon1-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
