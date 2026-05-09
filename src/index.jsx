import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App routeScene={0} />} />
        <Route path="/home" element={<App routeScene={0} />} />
        <Route path="/services" element={<App routeScene={1} />} />
        <Route path="/aboutus" element={<App routeScene={2} />} />
        <Route path="/qrapp" element={<App routeScene={3} />} />
        <Route path="/demoapp" element={<App routeScene={4} />} />
        <Route path="/contactus" element={<App routeScene={5} />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
