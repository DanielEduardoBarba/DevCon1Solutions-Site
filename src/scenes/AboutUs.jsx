import { useEffect, useState } from "react"
import DAN from "../assets/daniel.jpg"
import LINKEDIN from "../assets/linkedinLogo.png"
import GITHUB from "../assets/github-mark-white.png"

export default function AboutUs() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 fade-in-up font-medium">
            Our Team
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 fade-in-up fade-in-up-delay-1 gradient-text">
            Meet the Team
          </h1>
          <p className="text-white/50 text-center fade-in-up fade-in-up-delay-2">
            The people behind DevCon1 Solutions
          </p>
        </div>

        {/* Daniel Card */}
        <div
          className="glass-card p-6 md:p-10"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img
              src={DAN}
              alt="Daniel Barba - Founder & Lead Engineer at DevCon1 Solutions"
              className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-2xl border border-white/10 flex-shrink-0"
              loading="lazy"
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Daniel</h3>
              <p className="text-sm text-red-400/80 mb-6 font-medium">Founder & Lead Engineer</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                For Daniel, as a former machinist and product developer, building and design is both a trade and hobby.
                He loves to optimize and create new systems and solutions for clients of all types.
                A leader and entrepreneur at heart, but engineer in practice,
                he loves challenges and making ideas a reality.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/daniel-e-barba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card !rounded-xl !p-2.5 hover:!bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <img src={LINKEDIN} alt="LinkedIn" className="h-8 w-8 object-contain" />
                </a>
                <a
                  href="https://github.com/DanielEduardoBarba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card !rounded-xl !p-2.5 hover:!bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <img src={GITHUB} alt="GitHub" className="h-8 w-8 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
