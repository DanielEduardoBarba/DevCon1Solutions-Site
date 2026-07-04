'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { firebaseApp } from '../lib/firebase'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Dynamic import keeps firebase/analytics out of the SSR bundle entirely
    import('firebase/analytics')
      .then(({ getAnalytics, logEvent }) => {
        const analytics = getAnalytics(firebaseApp)
        logEvent(analytics, 'page_view', { page_path: pathname })
      })
      .catch(() => { /* analytics unavailable (ad-blocker, etc.) */ })
  }, [pathname])

  return null
}
