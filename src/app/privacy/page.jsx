import Privacy from '../../scenes/Privacy'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for DevCon1 Solutions LLC — how we collect, use, store, and protect your information across our website, apps, and services.',
  alternates: { canonical: 'https://devcon1solutions.com/privacy/' },
  robots: { index: true, follow: false },
}

export default function PrivacyPage() {
  return <Privacy />
}
