export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-extrabold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-white/50 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="cta-button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
