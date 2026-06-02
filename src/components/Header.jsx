import { useContext, useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import Logo from "./Logo"
import AppContext from "../AppContext"

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { menuOptions, appFullscreen } = useContext(AppContext)
  const ref = useRef(null)
  const location = useLocation()
  const isMarkour = location.pathname.startsWith('/markour')

  useEffect(() => {
    setShowMenu(false)
  }, [location.pathname])

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    document.addEventListener('mousedown', handleClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Hide entirely when an app is fullscreen (after all hooks)
  if (appFullscreen) return null

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? (isMarkour ? 'rgba(6, 18, 31, 0.62)' : 'rgba(10, 10, 26, 0.55)')
          : (isMarkour
            ? 'linear-gradient(to bottom, rgba(6,18,31,0.5) 0%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(10,10,26,0.4) 0%, transparent 100%)'),
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        borderBottom: scrolled
          ? (isMarkour ? '1px solid rgba(45,156,240,0.18)' : '1px solid rgba(255,255,255,0.06)')
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[60px]">
        <NavLink to="/" className="h-[40px] flex-shrink-0 flex items-center gap-2.5">
          <Logo h={40} />
          {isMarkour && <span className="mk-nav-badge hidden sm:inline-flex">Markour</span>}
        </NavLink>

        <nav className="hidden lg:flex items-center gap-1">
          {menuOptions.map((opt, i) => (
            <NavLink
              key={i}
              to={opt.path}
              end={opt.path === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? (isMarkour ? 'mk-nav-link-active' : 'bg-white/15 text-white')
                    : (isMarkour
                      ? 'mk-nav-link-idle text-white/60'
                      : 'text-white/60 hover:text-white hover:bg-white/10')
                }`
              }
            >
              {opt.label}
            </NavLink>
          ))}
        </nav>

        <div className="lg:hidden" ref={ref}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg hover:bg-white/10 transition-colors w-11 h-11"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 origin-center ${showMenu ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 ${showMenu ? 'opacity-0 scale-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 origin-center ${showMenu ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>

          {showMenu && (
            <div className="absolute top-[60px] right-4 w-56 py-2 menu-enter rounded-2xl border" style={{ background: isMarkour ? 'rgba(6,18,31,0.9)' : 'rgba(10,10,26,0.85)', borderColor: isMarkour ? 'rgba(45,156,240,0.2)' : 'rgba(255,255,255,0.1)', backdropFilter: 'blur(40px) saturate(1.5)', WebkitBackdropFilter: 'blur(40px) saturate(1.5)' }}>
              {menuOptions.map((opt, i) => (
                <NavLink
                  key={i}
                  to={opt.path}
                  end={opt.path === '/'}
                  className={({ isActive }) =>
                    `block px-5 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? (isMarkour ? 'text-white bg-[rgba(45,156,240,0.18)]' : 'text-white bg-white/10')
                        : (isMarkour ? 'text-white/60 hover:text-white hover:bg-[rgba(45,156,240,0.1)]' : 'text-white/60 hover:text-white hover:bg-white/5')
                    }`
                  }
                >
                  {opt.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
