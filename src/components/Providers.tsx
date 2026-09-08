'use client'

import { useState, useCallback, useMemo, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import AppContext from '../AppContext'
import Header from './Header'
import Footer from './Footer'
import Chat from './Chat'

const MENU_OPTIONS = [
  { label: 'Home',       path: '/' },
  { label: 'Services',   path: '/services' },
  { label: 'Showcase',   path: '/showcase' },
  { label: 'Apps',       path: '/apps' },
  { label: 'About Us',   path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

const LS_KEY = 'devConUser'

function readUser() {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => readUser())
  const [appFullscreen, setAppFullscreen] = useState(false)
  const pathname = usePathname()

  const isConsole = pathname.startsWith('/console')
  const isMarkour = pathname.startsWith('/markour')
  const isMarksman = pathname.startsWith('/marksman')
  const themeClass = isMarkour ? ' markour-theme' : isMarksman ? ' marksman-theme' : ''

  const saveUser = useCallback((_user: unknown) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(_user))
    } catch {
      /* ignore */
    }
    setUser(_user as Record<string, unknown>)
  }, [])

  const delay = useCallback(
    (ms: number) => new Promise<void>((res) => setTimeout(res, ms)),
    []
  )

  const ctx = useMemo(
    () => ({
      user,
      saveUser,
      menuOptions: MENU_OPTIONS,
      delay,
      appFullscreen,
      setAppFullscreen,
    }),
    [user, saveUser, delay, appFullscreen]
  )

  return (
    <AppContext.Provider value={ctx}>
      <div className={`app-wrapper${themeClass}`}>
        {!isConsole && (
          <div className={`animated-bg${themeClass}`} aria-hidden="true">
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />
            <div className="bg-orb bg-orb-4" />
          </div>
        )}
        {!isConsole && <Header />}
        <main
          className="page-content"
          style={appFullscreen ? { overflow: 'hidden' } : {}}
        >
          {children}
        </main>
        {!isConsole && <Chat />}
        {!isConsole && <Footer />}
      </div>
    </AppContext.Provider>
  )
}
