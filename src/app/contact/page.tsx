import Contact from '../../scenes/Contact'

export const metadata = {
  title: 'Contact Us — Get In Touch',
  description:
    'Get in touch with DevCon1 Solutions. Call, text or leave a message — we respond fast. Start your custom software project today.',
  alternates: { canonical: 'https://devcon1solutions.com/contact/' },
  openGraph: {
    title: 'Contact DevCon1 Solutions',
    description:
      'Ready to start a project? Call, text or send a message — we respond fast.',
    url: 'https://devcon1solutions.com/contact/',
    images: [{ url: '/devcon1-full-logo.png', width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  return <Contact />
}
