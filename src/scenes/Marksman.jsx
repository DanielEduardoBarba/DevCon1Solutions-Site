import { useEffect, useRef } from "react"

const APP_NAME = "Marksman"
const TAGLINE = "Master the long shot."
const APP_URL = "https://marksman-shooting.web.app/"
const MARKETING_URL = "https://devcon1solutions.com/marksman"
const RED = "#ff4d3d"
const GOLD = "#ffb347"

/* ---------- Inline icons ---------- */
const Icon = {
  Crosshair: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Wind: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" /><path d="M12.59 19.41A2 2 0 1 0 14 16H2" /><path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  Target: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Scope: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" /><line x1="11" y1="4" x2="11" y2="18" /><line x1="4" y1="11" x2="18" y2="11" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  ),
  Bullet: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3h6a0 0 0 0 1 0 0v4a3 3 0 0 1-.88 2.12L12 11l-2.12-1.88A3 3 0 0 1 9 7V3z" /><rect x="9" y="11" width="6" height="10" rx="1" />
    </svg>
  ),
  Gauge: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21a9 9 0 1 0-9-9" /><path d="M12 12l4-2" /><circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  Volume: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  Zap: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  ),
  Save: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  ),
}

const FEATURES = [
  { icon: Icon.Bullet, title: "Real Per-Caliber Ballistics", desc: "Drop, drag and time-of-flight modeled for .223, 7.62×39, 6.5 Creedmoor, .308, .30-06, .300 Win Mag, .338 Lapua and .50 BMG.", color: "#ff4d3d" },
  { icon: Icon.Wind, title: "Wind & Range", desc: "Read a gently shifting wind and dial your turrets in mils to engage steel anywhere from 50 to 3000 m.", color: "#ffb347" },
  { icon: Icon.Scope, title: "Scope or Red Dot", desc: "FFP mil-dot reticle with a bullet-drop ladder, or a 1× red dot with a selectable dot color.", color: "#ff7a6e" },
  { icon: Icon.Gauge, title: "Angular Optics Model", desc: "1×–12× zoom with a holdover dot that matches exactly where your rounds actually land.", color: "#ff9147" },
  { icon: Icon.Zap, title: "Recoil, Flash & Smoke", desc: "Caliber-scaled recoil, muzzle flash, procedural smoke and a random muzzle jump that scatters rapid fire.", color: "#ff4d3d" },
  { icon: Icon.Volume, title: "Positional Audio", desc: "Distance-delayed hit and miss audio — a steel ping downrange or a dull thud in the dirt.", color: "#ffb347" },
  { icon: Icon.Target, title: "Impact Tracking", desc: "Every round is plotted, graded for accuracy and marked with a physical bullet hole on target.", color: "#ff7a6e" },
  { icon: Icon.Save, title: "Saved Loadouts", desc: "Your caliber, optic and turret preferences are remembered automatically between sessions.", color: "#ff9147" },
]

const CALIBERS = [
  ".223 Rem", "7.62×39", "6.5 Creedmoor", ".308 Win",
  ".30-06", ".300 Win Mag", ".338 Lapua", ".50 BMG",
]

const USE_CASES = [
  { emoji: "🎯", title: "Learn Ballistics", desc: "See drop and drift in action and build real intuition for reading a range card." },
  { emoji: "🎮", title: "Just for Fun", desc: "Ring steel at 2 km with a .50 BMG — no range fees, no cleanup, all browser." },
  { emoji: "🧠", title: "Dial Practice", desc: "Rehearse turret adjustments in mils until dialing a firing solution is second nature." },
  { emoji: "⚔️", title: "Combat Mode", desc: "Switch it up and take on a faster, reactive downrange challenge." },
]

export default function Marksman() {
  const revealRef = useRef([])
  revealRef.current = []
  const addReveal = (el) => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el) }

  /* ---------- SEO ---------- */
  useEffect(() => {
    const prevTitle = document.title
    const descTag = document.querySelector('meta[name="description"]')
    const prevDesc = descTag?.getAttribute("content")
    const canonical = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonical?.getAttribute("href")
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const prevOgTitle = ogTitle?.getAttribute("content")
    const ogDesc = document.querySelector('meta[property="og:description"]')
    const prevOgDesc = ogDesc?.getAttribute("content")
    const ogImage = document.querySelector('meta[property="og:image"]')
    const prevOgImage = ogImage?.getAttribute("content")
    const ogUrl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrl?.getAttribute("content")
    const twTitle = document.querySelector('meta[name="twitter:title"]')
    const prevTwTitle = twTitle?.getAttribute("content")
    const twImage = document.querySelector('meta[name="twitter:image"]')
    const prevTwImage = twImage?.getAttribute("content")

    const title = "Marksman — Interactive Gun Range | Free Web-Based Shooting Simulator"
    const desc = "Marksman is a free, browser-based long-range shooting simulator. Pick a caliber and optic, read the wind, dial your turrets in mils and put rounds on steel from 50 to 3000 m — no download required."
    const image = `${MARKETING_URL.replace("/marksman", "")}/marksman/marksman-logo.svg`

    document.title = title
    descTag?.setAttribute("content", desc)
    canonical?.setAttribute("href", MARKETING_URL)
    ogTitle?.setAttribute("content", title)
    ogDesc?.setAttribute("content", desc)
    ogImage?.setAttribute("content", image)
    ogUrl?.setAttribute("content", MARKETING_URL)
    twTitle?.setAttribute("content", title)
    twImage?.setAttribute("content", image)

    const ld = document.createElement("script")
    ld.type = "application/ld+json"
    ld.id = "marksman-jsonld"
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Marksman — Interactive Gun Range",
      applicationCategory: "GameApplication",
      operatingSystem: "Web browser",
      browserRequirements: "Requires a modern web browser. No download needed.",
      description: desc,
      url: MARKETING_URL,
      image,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Organization", name: "DevCon1 Solutions LLC", url: "https://devcon1solutions.com" },
    })
    document.head.appendChild(ld)

    return () => {
      document.title = prevTitle
      if (descTag && prevDesc) descTag.setAttribute("content", prevDesc)
      if (canonical && prevCanonical) canonical.setAttribute("href", prevCanonical)
      if (ogTitle && prevOgTitle) ogTitle.setAttribute("content", prevOgTitle)
      if (ogDesc && prevOgDesc) ogDesc.setAttribute("content", prevOgDesc)
      if (ogImage && prevOgImage) ogImage.setAttribute("content", prevOgImage)
      if (ogUrl && prevOgUrl) ogUrl.setAttribute("content", prevOgUrl)
      if (twTitle && prevTwTitle) twTitle.setAttribute("content", prevTwTitle)
      if (twImage && prevTwImage) twImage.setAttribute("content", prevTwImage)
      document.getElementById("marksman-jsonld")?.remove()
    }
  }, [])

  /* ---------- Scroll reveal ---------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ms-in")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    revealRef.current.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  })

  function scrollToFeatures() {
    document.getElementById("ms-features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="ms w-full overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-[120px] pb-20 px-4 sm:px-6">
        <div className="ms-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white/70 bg-white/5 border border-white/10 fade-in-up">
              <span className="w-2 h-2 rounded-full" style={{ background: RED, boxShadow: `0 0 10px ${RED}` }} />
              Free web app · Play in your browser
            </span>

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] fade-in-up fade-in-up-delay-1">
              <span className="text-white">Marks</span>
              <span className="ms-gradient-text">man</span>
            </h1>

            <p className="mt-4 text-2xl sm:text-3xl font-bold text-white/90 fade-in-up fade-in-up-delay-2">
              {TAGLINE}
            </p>

            <p className="mt-5 text-lg text-white/55 max-w-xl mx-auto lg:mx-0 leading-relaxed fade-in-up fade-in-up-delay-3">
              A scoped rifle, real wind and real drop. Pick your caliber, read the range,
              dial it in and put rounds on steel from 50 to 3000 m — with real-ish
              ballistics, procedural recoil and positional audio. All in your browser.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 fade-in-up fade-in-up-delay-4">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="ms-cta" aria-label="Launch the range in a new tab">
                Launch the Range
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <button onClick={scrollToFeatures} className="ms-cta-ghost">
                Explore Features
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/40 text-sm fade-in-up fade-in-up-delay-4">
              <span className="flex items-center gap-1.5"><Icon.Globe className="w-4 h-4" /> No download</span>
              <span className="flex items-center gap-1.5"><Icon.Crosshair className="w-4 h-4" /> Real ballistics</span>
              <span className="flex items-center gap-1.5"><Icon.Save className="w-4 h-4" /> 100% free</span>
            </div>
          </div>

          {/* Live browser preview */}
          <div className="relative flex justify-center fade-in-up fade-in-up-delay-3">
            <div className="ms-halo" />
            <div className="relative ms-float w-full max-w-[560px]">
              <div className="ms-browser">
                <div className="ms-browser-bar">
                  <span className="ms-browser-dot" style={{ background: "#ff6058" }} />
                  <span className="ms-browser-dot" style={{ background: "#ffc130" }} />
                  <span className="ms-browser-dot" style={{ background: "#2dd840" }} />
                  <span className="ms-browser-url">
                    <Icon.Globe className="w-3.5 h-3.5 opacity-60" />
                    marksman-shooting.web.app
                  </span>
                </div>
                <iframe
                  src={APP_URL}
                  title="Marksman Interactive Gun Range — live preview"
                  loading="lazy"
                  height="360"
                  allow="fullscreen; autoplay"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "8", v: "Calibers" },
            { k: "3000m", v: "Max range" },
            { k: "12×", v: "Optical zoom" },
            { k: "Free", v: "Forever" },
          ].map((s, i) => (
            <div key={i} ref={addReveal} className="ms-reveal glass-card !rounded-2xl text-center py-6" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl font-extrabold ms-gradient-text">{s.k}</div>
              <div className="text-white/45 text-xs uppercase tracking-wider mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="ms-features" className="pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={addReveal} className="ms-reveal text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">Built for precision</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 ms-gradient-text">Everything a long-range shooter loves</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              A ballistics playground wrapped in a clean, tactile interface — no range fees, no download, no cleanup.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Ic = f.icon
              return (
                <div key={i} ref={addReveal} className="ms-reveal ms-feature" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                  <div className="ms-feature-icon" style={{ color: f.color }}>
                    <Ic className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/45 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= THE ARMORY ================= */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div ref={addReveal} className="ms-reveal">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: GOLD }}>The armory</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Eight calibers,<br />one honest range
            </h2>
            <p className="text-lg text-white/55 leading-relaxed mb-8">
              From a flat, fast .223 to the thunder of a .50 BMG, every round carries its
              own drop, drag and recoil. Run a bolt gun that cycles between shots or a
              semi that fires as fast as you can click.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CALIBERS.map((c, i) => (
                <div key={i} className="flex items-center gap-3 glass-card !rounded-xl px-4 py-3">
                  <Icon.Bullet className="w-5 h-5 shrink-0" style={{ color: RED }} />
                  <span className="text-sm font-medium text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={addReveal} className="ms-reveal flex justify-center">
            <div className="relative w-full max-w-[560px]">
              <div className="ms-halo" />
              <div className="relative ms-float-slow ms-browser">
                <div className="ms-browser-bar">
                  <span className="ms-browser-dot" style={{ background: "#ff6058" }} />
                  <span className="ms-browser-dot" style={{ background: "#ffc130" }} />
                  <span className="ms-browser-dot" style={{ background: "#2dd840" }} />
                  <span className="ms-browser-url">
                    <Icon.Scope className="w-3.5 h-3.5 opacity-60" />
                    Downrange · live
                  </span>
                </div>
                <iframe
                  src={APP_URL}
                  title="Marksman range — live gameplay"
                  loading="lazy"
                  height="340"
                  allow="fullscreen; autoplay"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FREE & WEB-BASED ================= */}
      <section className="py-16 px-4 sm:px-6">
        <div ref={addReveal} className="ms-reveal max-w-4xl mx-auto glass-card !rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,179,71,0.18), transparent 70%)" }} />
          <div className="relative">
            <div className="ms-feature-icon mx-auto !w-16 !h-16" style={{ color: GOLD, borderColor: "rgba(255,179,71,0.3)", background: "linear-gradient(145deg, rgba(255,179,71,0.22), rgba(255,179,71,0.08))" }}>
              <Icon.Globe className="w-8 h-8" />
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
              Free to use, right in your browser
            </h2>
            <p className="mt-4 text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              Marksman is a free, web-based application — there's nothing to install and
              no account to create. Open it on desktop or mobile, and your loadout and
              optics settings are saved locally so they're ready next time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["No download", "No sign-up", "Runs in any modern browser", "Preferences saved locally"].map((t, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 bg-white/5 border border-white/10">{t}</span>
              ))}
            </div>
            <div className="mt-9">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="ms-cta">
                Open Marksman
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="pb-24 pt-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={addReveal} className="ms-reveal text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">However you like to shoot</p>
            <h2 className="text-3xl md:text-5xl font-bold ms-gradient-text">One range, many reasons</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((u, i) => (
              <div key={i} ref={addReveal} className="ms-reveal ms-feature text-center" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                <div className="text-4xl">{u.emoji}</div>
                <h3 className="mt-4 text-lg font-bold text-white">{u.title}</h3>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="pb-28 px-4 sm:px-6">
        <div ref={addReveal} className="ms-reveal relative max-w-5xl mx-auto rounded-[32px] overflow-hidden text-center px-6 py-20"
          style={{ background: "linear-gradient(135deg, rgba(255,77,61,0.18), rgba(255,122,110,0.08))", border: "1px solid rgba(255,77,61,0.25)" }}>
          <div className="ms-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative">
            <img src="/marksman/marksman-logo.svg" alt="Marksman logo" className="w-20 h-20 mx-auto mb-6 ms-float" style={{ filter: "drop-shadow(0 12px 30px rgba(255,77,61,0.45))" }} />
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Ready to <span className="ms-gradient-text">ring steel?</span>
            </h2>
            <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto">
              Marksman is free and playable right now — no download, no account. Load a
              caliber, read the wind, and take the long shot.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="ms-cta">
                Launch the Range
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/apps" className="ms-cta-ghost">Play it embedded</a>
            </div>
            <p className="mt-8 text-xs text-white/35 max-w-lg mx-auto">
              A free web experience by DevCon1 Solutions. Audio via Freesound (CC0 / CC BY).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
