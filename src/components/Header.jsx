import { useContext, useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import Logo from "./Logo"
import AppContext from "../AppContext"

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { menuOptions } = useContext(AppContext)
  const ref = useRef(null)
  const location = useLocation()

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(0, 0, 0, 0.7)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[60px]">
        <NavLink to="/" className="h-[40px] flex-shrink-0">
          <Logo h={40} />
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
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
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
            className="flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 origin-center ${showMenu ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 ${showMenu ? 'opacity-0 scale-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 origin-center ${showMenu ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>

          {showMenu && (
            <div className="absolute top-[60px] right-4 w-56 glass-card py-2 menu-enter">
              {menuOptions.map((opt, i) => (
                <NavLink
                  key={i}
                  to={opt.path}
                  end={opt.path === '/'}
                  className={({ isActive }) =>
                    `block px-5 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
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
