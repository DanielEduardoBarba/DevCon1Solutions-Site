'use client'

import Link from "next/link"

const BLUE = "#2d9cf0"
const RED = "#ff4d3d"
const GOLD = "#ffb347"

/* ---------- Inline icons (mirrors Markour.jsx / Marksman.jsx icon language) ---------- */
const Icon = {
  Pen: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
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
  Layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17l9 5 9-5" />
    </svg>
  ),
  Save: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  ),
  Bullet: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.5 20.5 V10 C9.5 6 10.6 3 12 2.2 C13.4 3 14.5 6 14.5 10 V20.5 Z" />
      <line x1="9.5" y1="10" x2="14.5" y2="10" />
      <line x1="9.5" y1="17.5" x2="14.5" y2="17.5" />
    </svg>
  ),
  Wind: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" /><path d="M12.59 19.41A2 2 0 1 0 14 16H2" /><path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  Zap: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Target: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Volume: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
}

/* ---------- Row content: alternating device tiles + feature cards ---------- */
const MARKOUR_ITEMS = [
  { type: "tile", kind: "phone", src: "/markour/phone-01.png", alt: "Markour whiteboard on iPhone" },
  { type: "feature", icon: Icon.Pen, title: "Natural Brushes", caption: "Pen, pencil & brush — each with its own feel.", color: BLUE },
  { type: "feature", icon: Icon.Palette, title: "Full Color Picker", caption: "Any color, four brush sizes.", color: "#a855f7" },
  { type: "tile", kind: "pad", src: "/markour/ipad-01.png", alt: "Markour whiteboard on iPad" },
  { type: "feature", icon: Icon.Grid, title: "Smart Grid Canvas", caption: "Precision grid for clean layouts.", color: "#06b6d4" },
  { type: "feature", icon: Icon.Layers, title: "Multi-Tab Boards", caption: "Several whiteboards, one tap away.", color: "#6366f1" },
  { type: "tile", kind: "phone", src: "/markour/phone-02.png", alt: "Markour collaborative sketch" },
  { type: "feature", icon: Icon.Save, title: "Save to Gallery", caption: "Full-resolution export, instantly.", color: "#14b8a6" },
]

const MARKSMAN_ITEMS = [
  { type: "tile", kind: "range" },
  { type: "feature", icon: Icon.Bullet, title: "Real Ballistics", caption: "Drop & drift, modeled per caliber.", color: RED },
  { type: "feature", icon: Icon.Wind, title: "Wind & Range", caption: "Dial your turrets, 50 to 3000 m.", color: GOLD },
  { type: "tile", kind: "plot" },
  { type: "feature", icon: Icon.Zap, title: "Recoil & Flash", caption: "Muzzle flash, smoke, procedural kick.", color: "#ff7a6e" },
  { type: "feature", icon: Icon.Target, title: "Impact Tracking", caption: "Every round plotted and graded.", color: "#ff9147" },
  { type: "tile", kind: "dope" },
  { type: "feature", icon: Icon.Volume, title: "Positional Audio", caption: "Distance-delayed hits, downrange.", color: GOLD },
]

function bobStyle(i, base, spread) {
  return {
    animationDuration: `${base + (i % 5) * 0.6}s`,
    animationDelay: `${-(i * 0.7) % spread}s`,
  }
}

function FeatureCard({ icon: IconCmp, title, caption, color, i }) {
  return (
    <div className="sc-bob" style={bobStyle(i, 4.4, 5)}>
      <div className="sc-card">
        <span className="sc-card-icon" style={{ color, borderColor: `${color}55`, background: `${color}14` }}>
          <IconCmp className="w-5 h-5" />
        </span>
        <span className="sc-card-title">{title}</span>
        <span className="sc-card-caption">{caption}</span>
      </div>
    </div>
  )
}

function DeviceTile({ kind, src, alt, i }) {
  return (
    <div className="sc-bob sc-pop" style={bobStyle(i, 5.6, 6)}>
      {kind === "phone" && (
        <div className="sc-tile sc-tile-phone">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      )}
      {kind === "pad" && (
        <div className="sc-tile sc-tile-pad">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      )}
      {kind === "range" && (
        <div className="sc-tile sc-tile-hud" aria-label="Marksman range readout">
          <span className="sc-hud-label">Target</span>
          <span className="sc-hud-value">1,250<em>m</em></span>
          <div className="sc-hud-row">
            <span>Wind</span><b>4.2 m/s →</b>
          </div>
          <div className="sc-hud-row">
            <span>Elev</span><b>+8.4 MIL</b>
          </div>
          <div className="sc-hud-row">
            <span>Lead</span><b>0.6 MIL</b>
          </div>
          <span className="sc-hud-foot sc-hud-hit">● HIT — ring steel</span>
        </div>
      )}
      {kind === "plot" && (
        <div className="sc-tile sc-tile-hud" aria-label="Marksman impact plot">
          <span className="sc-hud-label">Impact Plot</span>
          <div className="sc-hud-plot">
            <span className="sc-hud-ring sc-hud-ring-1" />
            <span className="sc-hud-ring sc-hud-ring-2" />
            <span className="sc-hud-cross-h" /><span className="sc-hud-cross-v" />
            <span className="sc-hud-dot" style={{ left: "46%", top: "38%" }} />
            <span className="sc-hud-dot" style={{ left: "58%", top: "52%" }} />
            <span className="sc-hud-dot" style={{ left: "41%", top: "57%" }} />
            <span className="sc-hud-dot sc-hud-dot-gold" style={{ left: "51%", top: "47%" }} />
            <span className="sc-hud-dot" style={{ left: "63%", top: "41%" }} />
          </div>
          <span className="sc-hud-foot">5 rds — 0.8 MOA</span>
        </div>
      )}
      {kind === "dope" && (
        <div className="sc-tile sc-tile-hud" aria-label="Marksman dope card">
          <span className="sc-hud-label">Dope Card — .338</span>
          <div className="sc-hud-table">
            <div className="sc-hud-row"><span>600 m</span><b>3.1 MIL</b></div>
            <div className="sc-hud-row"><span>900 m</span><b>6.0 MIL</b></div>
            <div className="sc-hud-row sc-hud-row-hot"><span>1200 m</span><b>9.4 MIL</b></div>
            <div className="sc-hud-row"><span>1500 m</span><b>13.6 MIL</b></div>
            <div className="sc-hud-row"><span>1800 m</span><b>18.9 MIL</b></div>
          </div>
          <span className="sc-hud-foot">G7 · 2.5°C · 1013 hPa</span>
        </div>
      )}
    </div>
  )
}

/* Pinned hero — stays put while the marquee slides behind it */
function HeroDevice({ theme, side, href }) {
  return (
    <Link
      href={href}
      className={`sc-hero ${side === "right" ? "sc-hero-right" : "sc-hero-left"}`}
      aria-label={theme === "mk" ? "Open Markour" : "Open Marksman"}
    >
      {theme === "mk" ? (
        <div className="sc-hero-phone">
          <span className="sc-hero-island" aria-hidden="true" />
          <img src="/markour/phone-07.png" alt="Markour running on iPhone" loading="lazy" />
          <span className="sc-hero-sheen" aria-hidden="true" />
        </div>
      ) : (
        <div className="sc-hero-lens">
          <img src="/marksman/scope.svg" alt="Marksman scope reticle" loading="lazy" />
          <span className="sc-hero-lens-ring" aria-hidden="true" />
        </div>
      )}
      <span className="sc-hero-shadow" aria-hidden="true" />
    </Link>
  )
}

function Ribbon({ theme, direction, appName, tagline, href, items, heroSide }) {
  const doubled = [...items, ...items]
  const trackClass = direction === "right" ? "sc-track sc-track-right" : "sc-track sc-track-left"
  const accent = theme === "mk" ? BLUE : RED
  const labelSide = heroSide === "right" ? "left" : "right"

  return (
    <div className={`sc-ribbon sc-ribbon-${theme}`}>
      <div className="sc-ribbon-bg" aria-hidden="true" />
      <div className="sc-ribbon-halo" aria-hidden="true" />

      <div className="sc-ribbon-inner">
        <Link
          href={href}
          className={`sc-row-label ${labelSide === "right" ? "sc-row-label-r" : ""}`}
          style={{ borderColor: `${accent}55`, boxShadow: `0 10px 30px -14px ${accent}90` }}
        >
          <span className="sc-row-label-dot" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span className="sc-row-label-name">{appName}</span>
          <span className="sc-row-label-tag">{tagline}</span>
        </Link>

        <div className={`sc-marquee ${heroSide === "right" ? "sc-marquee-hero-r" : "sc-marquee-hero-l"}`}>
          <div className={trackClass}>
            {doubled.map((item, i) =>
              item.type === "feature" ? (
                <FeatureCard key={`${theme}-${i}`} icon={item.icon} title={item.title} caption={item.caption} color={item.color} i={i} />
              ) : (
                <DeviceTile key={`${theme}-${i}`} kind={item.kind} src={item.src} alt={item.alt} i={i} />
              )
            )}
          </div>
        </div>

        <HeroDevice theme={theme} side={heroSide} href={href} />
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <div className="sc w-full overflow-hidden">
      <section className="relative pt-[110px] pb-20">
        <div className="max-w-6xl mx-auto text-center mb-10 px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white/70 bg-white/5 border border-white/10 fade-in-up">
            <span className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(90deg,#2d9cf0,#ff4d3d)" }} />
            Showcase
          </span>
          <h1 className="mt-6 text-[32px] leading-[1.12] sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 fade-in-up fade-in-up-delay-1 gradient-text">
            What we&rsquo;re building, in motion
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto fade-in-up fade-in-up-delay-2">
            A living pulse of our growing lineup — software today, hardware next.
            Each product breathing in its own rhythm.
          </p>
        </div>

        <div className="sc-ribbons fade-in-up fade-in-up-delay-3">
          <Ribbon
            theme="mk"
            direction="right"
            appName="Markour"
            tagline="Draw. Collaborate. Create."
            href="/markour"
            items={MARKOUR_ITEMS}
            heroSide="right"
          />
          <div className="sc-seam" aria-hidden="true" />
          <Ribbon
            theme="ms"
            direction="left"
            appName="Marksman"
            tagline="Master the long shot."
            href="/marksman"
            items={MARKSMAN_ITEMS}
            heroSide="left"
          />
        </div>

        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-6 fade-in-up fade-in-up-delay-4">
          <Link href="/markour" className="mk-cta justify-center">
            Explore Markour
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link href="/marksman" className="ms-cta justify-center">
            Enter the Range
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <span className="sc-more-pill justify-center">More products in the works</span>
        </div>
      </section>
    </div>
  )
}
