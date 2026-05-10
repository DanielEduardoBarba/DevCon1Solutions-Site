import { Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import devCon1Full from "../assets/devcon1-logo-full.png"

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen pt-[60px] justify-center overflow-hidden">
      {/* Spline 3D Background - lazy loaded */}
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/RZzHVB2S0AGzU9bg/scene.splinecode"
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto text-center">
        {/* Logo image — adjust inset values to control how much each edge hides */}
        {/* <div style={{
            clipPath: "inset(4% 8% 12% 8% round 1.5rem)",
          }} className="w-56 md:w-72 lg:w-80 my-8 fade-in-up rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/20">
          <img
            src={devCon1Full}
            alt="DevCon1 Solutions - Software, IT, and Custom Solutions"
            className="w-full h-auto object-cover"
          />
        </div> */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up fade-in-up-delay-1 gradient-text leading-[1.1] tracking-tight">
          Software, IT, and
          <br />
          Custom Solutions
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mb-12 fade-in-up fade-in-up-delay-2 leading-relaxed">
          Take control of your next big web, mobile, or cloud based product.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 fade-in-up fade-in-up-delay-3">
          <button
            onClick={() => navigate('/contact')}
            className="cta-button"
          >
            Connect With Us
          </button>
          <button
            onClick={() => navigate('/services')}
            className="px-8 py-3.5 rounded-full font-semibold text-white/80 border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
          >
            Our Services
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in-up fade-in-up-delay-4">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div> */}
    </div>
  )
}
