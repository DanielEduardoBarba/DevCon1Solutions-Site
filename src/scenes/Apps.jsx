import { useState, Suspense, lazy } from "react"
import QRApp from "./QRApp"
import SpinnerSVG from "../components/componentassets/SpinnerSVG"

const EmulatedControls = lazy(() => import("./EmulatedControls"))

export default function Apps() {
  const [activeApp, setActiveApp] = useState(null)

  const apps = [
    {
      id: "qr",
      title: "QR Code Generator",
      description: "Generate QR codes from any text, URL, or data. Download as PNG instantly.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="3" height="3" />
          <rect x="18" y="18" width="3" height="3" />
          <rect x="14" y="18" width="3" height="3" />
          <rect x="18" y="14" width="3" height="3" />
        </svg>
      ),
      gradient: "from-emerald-500/20 to-cyan-500/20",
      borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
      accentColor: "text-emerald-400",
    },
    {
      id: "demo",
      title: "3D Car Demo",
      description: "Interactive 3D driving experience built with Spline. Use controls to drive around.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17l-1 2h2m12-2l1 2h-2" />
          <circle cx="8" cy="17" r="1" />
          <circle cx="16" cy="17" r="1" />
        </svg>
      ),
      gradient: "from-violet-500/20 to-fuchsia-500/20",
      borderColor: "border-violet-500/20 hover:border-violet-500/40",
      accentColor: "text-violet-400",
    },
  ]

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 fade-in-up font-medium">
            Showcase
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 fade-in-up fade-in-up-delay-1 gradient-text">
            Our Apps
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto fade-in-up fade-in-up-delay-2">
            Interactive tools and demos — try them right here.
          </p>
        </div>

        {/* App Cards - when nothing is active */}
        {!activeApp && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto fade-in-up fade-in-up-delay-3">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className={`group glass-card !rounded-2xl p-8 text-left transition-all duration-500 border ${app.borderColor} hover:scale-[1.02] cursor-pointer`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={app.accentColor}>{app.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{app.description}</p>
                <span className={`text-sm font-medium ${app.accentColor} flex items-center gap-1.5`}>
                  Launch App
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Active App View */}
        {activeApp && (
          <div className="fade-in-up">
            {/* Back Button */}
            <button
              onClick={() => setActiveApp(null)}
              className="mb-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Apps
            </button>

            {/* App Container */}
            <div className="glass-card !rounded-2xl overflow-hidden border border-white/10">
              {/* App Title Bar */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveApp(null)}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <p className="text-white/40 text-xs font-medium flex-1 text-center">
                  {apps.find((a) => a.id === activeApp)?.title}
                </p>
              </div>

              {/* App Content */}
              <div className="relative">
                {activeApp === "qr" && (
                  <div className="py-8 px-4 flex justify-center">
                    <div className="w-full max-w-sm">
                      <QRApp embedded />
                    </div>
                  </div>
                )}
                {activeApp === "demo" && (
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-32">
                        <SpinnerSVG w={40} h={40} color="white" />
                      </div>
                    }
                  >
                    <EmulatedControls />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
