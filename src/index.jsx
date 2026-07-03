import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import LoadingPage from './components/LoadingPage'

const Home = lazy(() => import('./scenes/Home'))
const Services = lazy(() => import('./scenes/Services'))
const AboutUs = lazy(() => import('./scenes/AboutUs'))
const Apps = lazy(() => import('./scenes/Apps'))
const Markour = lazy(() => import('./scenes/Markour'))
const Marksman = lazy(() => import('./scenes/Marksman'))
const Contact = lazy(() => import('./scenes/Contact'))
const Privacy = lazy(() => import('./scenes/Privacy'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Suspense fallback={<LoadingPage />}><Home /></Suspense>} />
          <Route path="home" element={<Suspense fallback={<LoadingPage />}><Home /></Suspense>} />
          <Route path="services" element={<Suspense fallback={<LoadingPage />}><Services /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<LoadingPage />}><AboutUs /></Suspense>} />
          <Route path="aboutus" element={<Navigate to="/about" replace />} />
          <Route path="apps" element={<Suspense fallback={<LoadingPage />}><Apps /></Suspense>} />
          <Route path="markour" element={<Suspense fallback={<LoadingPage />}><Markour /></Suspense>} />
          <Route path="markour-board" element={<Navigate to="/markour" replace />} />
          <Route path="marksman" element={<Suspense fallback={<LoadingPage />}><Marksman /></Suspense>} />
          <Route path="marksman-shooting" element={<Navigate to="/marksman" replace />} />
          <Route path="qr" element={<Navigate to="/apps" replace />} />
          <Route path="qrapp" element={<Navigate to="/apps" replace />} />
          <Route path="demo" element={<Navigate to="/apps" replace />} />
          <Route path="demoapp" element={<Navigate to="/apps" replace />} />
          <Route path="contact" element={<Suspense fallback={<LoadingPage />}><Contact /></Suspense>} />
          <Route path="contactus" element={<Navigate to="/contact" replace />} />
          <Route path="privacy" element={<Suspense fallback={<LoadingPage />}><Privacy /></Suspense>} />
          <Route path="privacy-policy" element={<Navigate to="/privacy" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
