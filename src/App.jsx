import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Chat from "./components/Chat"
import Footer from "./components/Footer"
import AppContext from './AppContext'
import { analytics } from './firebase.js'
import { logEvent } from 'firebase/analytics'
import './App.css'

const defaultUser = {}

export default function App() {
  const [user, setUser] = useState(defaultUser)
  const location = useLocation()
  const lsAppName = "devConUser"

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
    })
    window.scrollTo(0, 0)
  }, [location.pathname])

  function saveUser(_user) {
    localStorage.setItem(lsAppName, JSON.stringify(_user))
    setUser(_user)
  }

  function getUser() {
    const _u = localStorage.getItem(lsAppName)
    try {
      if (_u) setUser(JSON.parse(_u))
    } catch (err) {
      console.error("Error occurred getUser()", err)
    }
  }

  async function delay(ts) {
    return new Promise((resolve) => setTimeout(() => resolve(), ts))
  }

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About Us", path: "/about" },
    { label: "Apps", path: "/apps" },
    { label: "Contact Us", path: "/contact" },
  ]

  return (
    <AppContext.Provider value={{
      user, saveUser,
      menuOptions,
      delay,
    }}>
      <div className="app-wrapper">
        <div className="animated-bg" aria-hidden="true">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-orb bg-orb-4" />
        </div>
        <Header />
        <main className="page-content" key={location.pathname}>
          <Outlet />
        </main>
        <Chat />
        <Footer />
      </div>
    </AppContext.Provider>
  )
}
