import { useEffect, useRef } from "react"

const APP_NAME = "Markour"
const TAGLINE = "Draw. Collaborate. Create."
const MARKETING_URL = "https://devcon1solutions.com/markour"
const BLUE = "#2d9cf0"

/* ---------- Inline icons ---------- */
const Icon = {
  Pen: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  Brush: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  ),
  Palette: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="13.5" cy="6.5" r="1.2" /><circle cx="17.5" cy="10.5" r="1.2" /><circle cx="8.5" cy="7.5" r="1.2" /><circle cx="6.5" cy="12.5" r="1.2" />
      <path d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.65-.25-1.24-.66-1.68a2.5 2.5 0 0 1 1.84-4.18H18a4 4 0 0 0 4-4 8 8 0 0 0-10-7.64" />
    </svg>
  ),
  Grid: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  ),
  Text: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7V5h16v2M9 19h6M12 5v14" />
    </svg>
  ),
  Image: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M21 16l-5-5L5 20" />
    </svg>
  ),
  Undo: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7v6h6" /><path d="M3.5 13a9 9 0 1 0 2.6-8.5L3 7" />
    </svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17l9 5 9-5" />
    </svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" />
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Save: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  ),
  Apple: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.98-.74.86-1.96 1.53-3.04 1.45-.13-1.1.42-2.27 1.07-3 .74-.83 2.05-1.45 3.09-1.43zM20.5 17.04c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.93-1-4.02-.99-2.08.01-2.52 1.01-4.06.99-1.73-.02-3.05-1.78-4.04-3.34C.32 17.4-.32 13.4 1.13 10.7c1.03-1.93 2.66-3.05 4.2-3.05 1.56 0 2.55 1.03 4.02 1.03 1.43 0 2.3-1.04 4.1-1.04 1.37 0 2.82.74 3.86 2.03-3.39 1.86-2.84 6.7.19 7.37z" />
    </svg>
  ),
}

const FEATURES = [
  { icon: Icon.Pen, title: "Three Natural Brushes", desc: "Switch between Pen, Pencil, and Brush — each with its own feel for sketching, writing, or painting.", color: "#2d9cf0" },
  { icon: Icon.Palette, title: "Full Color Picker", desc: "Pick any color and choose from four brush sizes — Small, Medium, Large, and XLarge.", color: "#a855f7" },
  { icon: Icon.Grid, title: "Smart Grid Canvas", desc: "Toggle a precision grid for neat diagrams, handwriting, and pixel-perfect layouts.", color: "#06b6d4" },
  { icon: Icon.Text, title: "Text & Typography", desc: "Drop crisp text anywhere on the board to label, annotate, and explain your ideas.", color: "#f59e0b" },
  { icon: Icon.Image, title: "Insert Images", desc: "Bring in photos and reference images, then draw and mark up right on top of them.", color: "#ec4899" },
  { icon: Icon.Undo, title: "Unlimited Undo & Redo", desc: "Experiment freely — full history lets you step back and forward without fear.", color: "#22c55e" },
  { icon: Icon.Layers, title: "Multi-Tab Boards", desc: "Keep several whiteboards open at once and jump between projects in a tap.", color: "#6366f1" },
  { icon: Icon.Save, title: "Save to Gallery", desc: "Export your artwork to your photo library in full resolution, instantly.", color: "#14b8a6" },
]

const USE_CASES = [
  { emoji: "🎓", title: "School & Study", desc: "Solve problems, take visual notes, and study together in real time." },
  { emoji: "💡", title: "Brainstorming", desc: "Sketch ideas with your team on an infinite shared canvas." },
  { emoji: "🎨", title: "Art & Design", desc: "From quick doodles to detailed illustrations with natural brushes." },
  { emoji: "👩‍🏫", title: "Teaching", desc: "Explain concepts live while students watch every stroke appear." },
]

export default function Markour() {
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

    const title = "Markour — Draw, Collaborate & Create | Real-Time Whiteboard App"
    const desc = "Markour is a beautiful real-time collaborative whiteboard for iPhone and iPad. Draw with natural brushes, add text and images, chat live, and create together — anywhere."
    const image = `${MARKETING_URL.replace("/markour", "")}/markour/markour-logo.png`

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
    ld.id = "markour-jsonld"
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Markour",
      applicationCategory: "GraphicsApplication",
      operatingSystem: "iOS, iPadOS",
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
      document.getElementById("markour-jsonld")?.remove()
    }
  }, [])

  /* ---------- Scroll reveal ---------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-in")
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
    document.getElementById("mk-features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="mk w-full overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-[120px] pb-20 px-4 sm:px-6">
        <div className="mk-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white/70 bg-white/5 border border-white/10 fade-in-up">
              <span className="w-2 h-2 rounded-full" style={{ background: BLUE, boxShadow: `0 0 10px ${BLUE}` }} />
              Coming soon to the App Store
            </span>

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] fade-in-up fade-in-up-delay-1">
              <span className="text-white">Mark</span>
              <span className="mk-gradient-text">our</span>
            </h1>

            <p className="mt-4 text-2xl sm:text-3xl font-bold text-white/90 fade-in-up fade-in-up-delay-2">
              {TAGLINE}
            </p>

            <p className="mt-5 text-lg text-white/55 max-w-xl mx-auto lg:mx-0 leading-relaxed fade-in-up fade-in-up-delay-3">
              A beautiful real-time whiteboard for iPhone and iPad. Sketch with natural
              brushes, add text and images, and create together with friends — every
              stroke appears live, the moment it happens.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 fade-in-up fade-in-up-delay-4">
              <a href="#" className="mk-badge" aria-label="Coming soon to the App Store">
                <Icon.Apple className="w-7 h-7" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider text-white/60">Coming soon on the</span>
                  <span className="block text-lg font-semibold -mt-0.5">App Store</span>
                </span>
              </a>
              <button onClick={scrollToFeatures} className="mk-cta">
                Explore Features
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-white/40 text-sm fade-in-up fade-in-up-delay-4">
              <span className="flex items-center gap-1.5"><Icon.Users className="w-4 h-4" /> Real-time</span>
              <span className="flex items-center gap-1.5"><Icon.Shield className="w-4 h-4" /> Safe & moderated</span>
              <span className="flex items-center gap-1.5"><Icon.Save className="w-4 h-4" /> Free to start</span>
            </div>
          </div>

          {/* Device */}
          <div className="relative flex justify-center fade-in-up fade-in-up-delay-3">
            <div className="mk-halo" />
            <div className="relative mk-float w-[270px] sm:w-[300px]">
              <div className="mk-phone">
                <img src="/markour/phone-01.png" alt="Markour app splash screen on iPhone" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "3", v: "Brush types" },
            { k: "4", v: "Brush sizes" },
            { k: "∞", v: "Undo history" },
            { k: "Live", v: "Collaboration" },
          ].map((s, i) => (
            <div key={i} ref={addReveal} className="mk-reveal glass-card !rounded-2xl text-center py-6" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl font-extrabold mk-gradient-text">{s.k}</div>
              <div className="text-white/45 text-xs uppercase tracking-wider mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="mk-features" className="pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={addReveal} className="mk-reveal text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">Everything you need</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 mk-gradient-text">A complete creative toolkit</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Powerful tools wrapped in a clean, intuitive canvas — built to feel effortless on every device.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Ic = f.icon
              return (
                <div key={i} ref={addReveal} className="mk-reveal mk-feature" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                  <div className="mk-feature-icon" style={{ color: f.color }}>
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

      {/* ================= REAL-TIME COLLABORATION ================= */}
      <section className="py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div ref={addReveal} className="mk-reveal order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: BLUE }}>Better together</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Create with friends,<br />in real time
            </h2>
            <p className="text-lg text-white/55 leading-relaxed mb-8">
              Invite anyone to your board and watch ideas come alive together. See live
              cursors as people draw, chat in the built-in messenger, and keep everyone
              on the same page — literally.
            </p>

            <ul className="space-y-4">
              {[
                { i: Icon.Users, t: "Live cursors", d: "See exactly where everyone is drawing as it happens." },
                { i: Icon.Chat, t: "Built-in chat", d: "Talk through ideas without ever leaving the canvas." },
                { i: Icon.Layers, t: "Shared tabs", d: "Organize work across multiple synced boards." },
              ].map((row, i) => {
                const Ic = row.i
                return (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mk-feature-icon !w-11 !h-11 shrink-0"><Ic className="w-5 h-5" /></span>
                    <div>
                      <p className="font-semibold text-white">{row.t}</p>
                      <p className="text-sm text-white/45">{row.d}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-center gap-2">
              <span className="mk-cursor-dot mk-float-slow" style={{ background: "#22c1a5" }}>DB</span>
              <span className="mk-cursor-dot" style={{ background: "#2d9cf0" }}>JB</span>
              <span className="mk-cursor-dot mk-float" style={{ background: "#a855f7" }}>MK</span>
              <span className="text-white/40 text-sm ml-2">3 people drawing now</span>
            </div>
          </div>

          <div ref={addReveal} className="mk-reveal order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="mk-halo" />
              <div className="relative mk-float w-[260px] sm:w-[290px]">
                <div className="mk-phone">
                  <img src="/markour/phone-04.png" alt="Live chat and collaboration in Markour" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TOOLS / IPAD ================= */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div ref={addReveal} className="mk-reveal flex justify-center">
            <div className="relative w-full max-w-[640px]">
              <div className="mk-halo" />
              <div className="relative mk-float-slow mk-pad">
                <img src="/markour/ipad-01.png" alt="Markour collaborative whiteboard on iPad" loading="lazy" />
              </div>
            </div>
          </div>

          <div ref={addReveal} className="mk-reveal">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: BLUE }}>Made for iPad</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              An infinite canvas at your fingertips
            </h2>
            <p className="text-lg text-white/55 leading-relaxed mb-8">
              Markour shines on the big screen. Spread out, sketch precisely, and use
              every tool with room to breathe — perfect for Apple Pencil, classrooms,
              and design sessions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { i: Icon.Pen, t: "Pen, Pencil & Brush" },
                { i: Icon.Palette, t: "Color & sizes" },
                { i: Icon.Grid, t: "Grid guides" },
                { i: Icon.Text, t: "Text tool" },
                { i: Icon.Image, t: "Image insert" },
                { i: Icon.Save, t: "Save to Photos" },
              ].map((row, i) => {
                const Ic = row.i
                return (
                  <div key={i} className="flex items-center gap-3 glass-card !rounded-xl px-4 py-3">
                    <Ic className="w-5 h-5" style={{ color: BLUE }} />
                    <span className="text-sm font-medium text-white/80">{row.t}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCREENSHOT MARQUEE ================= */}
      <section className="py-16">
        <div ref={addReveal} className="mk-reveal text-center mb-12 px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">A closer look</p>
          <h2 className="text-3xl md:text-5xl font-bold mk-gradient-text">Beautiful on every screen</h2>
        </div>
        <div className="mk-marquee">
          <div className="mk-marquee-track">
            {["phone-01", "phone-02", "phone-03", "phone-04", "phone-05", "phone-06", "phone-07"]
              .concat(["phone-01", "phone-02", "phone-03", "phone-04", "phone-05", "phone-06", "phone-07"])
              .map((name, i) => (
                <div key={i} className="w-[190px] shrink-0">
                  <div className="mk-phone" style={{ borderRadius: 34, padding: 8 }}>
                    <img src={`/markour/${name}.png`} alt="Markour app screenshot" loading="lazy" style={{ borderRadius: 26 }} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ================= SAFETY ================= */}
      <section className="py-24 px-4 sm:px-6">
        <div ref={addReveal} className="mk-reveal max-w-4xl mx-auto glass-card !rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%)" }} />
          <div className="relative">
            <div className="mk-feature-icon mx-auto !w-16 !h-16" style={{ color: "#22c55e", borderColor: "rgba(34,197,94,0.3)", background: "linear-gradient(145deg, rgba(34,197,94,0.22), rgba(34,197,94,0.08))" }}>
              <Icon.Shield className="w-8 h-8" />
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">Safe, respectful spaces</h2>
            <p className="mt-4 text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              Collaboration should feel welcoming. Markour includes built-in moderation,
              easy in-app reporting, and clear community standards so everyone can create
              with confidence.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["In-app reporting", "Content moderation", "Block & mute", "Clear guidelines"].map((t, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 bg-white/5 border border-white/10">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={addReveal} className="mk-reveal text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">Made for the way you work</p>
            <h2 className="text-3xl md:text-5xl font-bold mk-gradient-text">One canvas, endless uses</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((u, i) => (
              <div key={i} ref={addReveal} className="mk-reveal mk-feature text-center" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
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
        <div ref={addReveal} className="mk-reveal relative max-w-5xl mx-auto rounded-[32px] overflow-hidden text-center px-6 py-20"
          style={{ background: "linear-gradient(135deg, rgba(45,156,240,0.18), rgba(24,119,242,0.08))", border: "1px solid rgba(45,156,240,0.25)" }}>
          <div className="mk-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative">
            <img src="/markour/markour-logo.png" alt="Markour logo" className="w-20 h-20 mx-auto mb-6 mk-float" style={{ filter: "drop-shadow(0 12px 30px rgba(45,156,240,0.45))" }} />
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Ready to <span className="mk-gradient-text">create together?</span>
            </h2>
            <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto">
              Markour is launching soon on the App Store for iPhone and iPad. Draw,
              collaborate, and create — wherever inspiration strikes.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="mk-badge" aria-label="Coming soon to the App Store">
                <Icon.Apple className="w-7 h-7" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider text-white/60">Coming soon on the</span>
                  <span className="block text-lg font-semibold -mt-0.5">App Store</span>
                </span>
              </a>
              <a href="/contact" className="mk-cta">Get notified</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
