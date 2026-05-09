import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import FaceChatSVG from "./componentassets/FaceChatSVG"

export default function Chat() {
  const [alive, setAlive] = useState(false)
  const [wink, setWink] = useState(false)
  const [hideBeacon, setHideBeacon] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const t1 = setTimeout(() => {
      setHideBeacon(false)
      setTimeout(() => {
        setWink(true)
        setTimeout(() => setAlive(true), 2000)
      }, 2000)
    }, 5000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/home') {
      setHideBeacon(true)
    }
  }, [location.pathname])

  return (
    <div
      onClick={() => setHideBeacon(true)}
      style={{
        transform: hideBeacon ? 'translateX(-100%)' : 'translateX(0)',
      }}
      className="fixed z-[1000] bottom-4 left-0 overflow-hidden transition-transform duration-700 ease-out"
    >
      <div className="glass-card !rounded-none !rounded-tr-2xl !rounded-br-2xl p-4 pr-6 !bg-pink-500/10 !border-pink-500/20">
        <FaceChatSVG w={40} h={40} alive={alive} wink={wink} />
        <p className="text-white/70 text-xs mt-1">Got a project?</p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate('/contact')
          }}
          className="text-xs font-bold text-white underline cursor-pointer whitespace-nowrap hover:text-pink-300 transition-colors"
        >
          Let's Talk!
        </button>
      </div>
    </div>
  )
}
