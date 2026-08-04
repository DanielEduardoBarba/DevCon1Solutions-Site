'use client'

import { useState, useCallback, useMemo } from 'react'
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
  } catch { return {} }
}

export default function Providers({ children }) {
  const [user, setUser]                     = useState({})
  const [appFullscreen, setAppFullscreen]   = useState(false)
  const pathname                            = usePathname()

  const isMarkour  = pathname.startsWith('/markour')
  const isMarksman = pathname.startsWith('/marksman')
  const themeClass = isMarkour ? ' markour-theme' : isMarksman ? ' marksman-theme' : ''

  const saveUser = useCallback((_user) => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(_user)) } catch { /* */ }
    setUser(_user)
  }, [])

  const delay = useCallback(
    (ms) => new Promise((res) => setTimeout(res, ms)),
    []
  )

  const ctx = useMemo(
    () => ({ user, saveUser, menuOptions: MENU_OPTIONS, delay, appFullscreen, setAppFullscreen }),
    [user, saveUser, delay, appFullscreen]
  )

  return (
    <AppContext.Provider value={ctx}>
      <div className={`app-wrapper${themeClass}`}>
        <div className={`animated-bg${themeClass}`} aria-hidden="true">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-orb bg-orb-4" />
        </div>
        <Header />
        <main
          className="page-content"
          style={appFullscreen ? { overflow: 'hidden' } : {}}
        >
          {children}
        </main>
        <Chat />
        <Footer />
      </div>
    </AppContext.Provider>
  )
}
