import { useEffect, useRef, useState } from "react"
import ComputerEmojiSVG from "../components/componentassets/ComputerEmojiSVG"
import PhoneEmojiSVG from "../components/componentassets/PhoneEmojiSVG"
import Confetti from "react-confetti"

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", onResize, { passive: true })
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return size
}

export default function Services() {
  const [celebrate, setCelebrate] = useState(false)
  const [recycle, setRecycle] = useState(false)
  const dispatchID = useRef(null)
  const confettiTimer = useRef(null)
  const { width, height } = useWindowSize()

  const services = [
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
    "https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg",
    "https://www.vectorlogo.zone/logos/lua/lua-icon.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
    "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
    "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    "https://cdn.worldvectorlogo.com/logos/arduino-1.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png",
    "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg",
    "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
    "https://www.vectorlogo.zone/logos/firebase/firebase-ar21.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
    "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
  ]

  const order = [5, 12, 3, 19, 0, 7, 22, 1, 14, 9, 18, 6, 21, 4, 11, 8, 23, 2, 15, 10, 13, 17, 20, 16]
  let i = 0
  const nextI = () => {
    i++
    if (i > services.length - 1) i = 0
    return order[i]
  }

  const dispatchPopup = (idx) => {
    const element = document.getElementById(`svc-${idx}`)
    if (!element) return
    element.style.opacity = '0.5'
    setTimeout(() => { element.style.opacity = '0.12' }, 2000)
  }

  useEffect(() => {
    dispatchID.current = setInterval(() => {
      if (celebrate) return
      dispatchPopup(nextI())
      dispatchPopup(nextI())
    }, 1000)
    return () => clearInterval(dispatchID.current)
  }, [celebrate])

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6">
      {celebrate && (
        <Confetti
          width={width}
          height={height}
          recycle={recycle}
          numberOfPieces={180}
          gravity={0.18}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 99998, pointerEvents: "none" }}
          onConfettiComplete={() => setCelebrate(false)}
        />
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 fade-in-up font-medium">
            What We Do
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 fade-in-up fade-in-up-delay-1 gradient-text">
            Truly Full Stack Development
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto fade-in-up fade-in-up-delay-2">
            We are your one stop shop for all things software!
          </p>
        </div>

        {/* Tech Grid */}
        <div className="glass-card p-6 md:p-10 mb-12 fade-in-up fade-in-up-delay-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-8 gap-6 sm:gap-8 place-items-center">
            {services.map((src, idx) => (
              <div
                key={idx}
                id={`svc-${idx}`}
                className="flex items-center justify-center opacity-[0.12] transition-opacity duration-1000"
              >
                <img src={src} alt="" className="w-10 sm:w-14 h-10 sm:h-14 object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 fade-in-up fade-in-up-delay-3">
            <p className="text-white/70 text-base md:text-lg leading-relaxed flex-1">
              We tailor software to your needs. Working with web, mobile, and embedded platforms.
              We tailor and design your system from idea to production.
            </p>
            <div className="flex-shrink-0 opacity-80">
              <PhoneEmojiSVG w={100} h={100} color1="#22bb22" />
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row-reverse justify-between items-center gap-6 fade-in-up fade-in-up-delay-4">
            <p className="text-white/70 text-base md:text-lg leading-relaxed flex-1 md:text-end">
              We work with all major infrastructures like Azure, GCP, and AWS, and are able to
              implement available solutions or build them from the ground up.
            </p>
            <div className="flex-shrink-0 opacity-80">
              <ComputerEmojiSVG w={100} h={100} color5="#22bb22" />
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 text-center fade-in-up">
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-4">
              We take your project from start to finish... and that's something to
              <button
                onClick={() => {
                  clearTimeout(confettiTimer.current)
                  if (celebrate) {
                    setCelebrate(false)
                    setRecycle(false)
                  } else {
                    setRecycle(true)
                    setCelebrate(true)
                    // stop spawning new pieces after 3s, let existing ones fall off
                    confettiTimer.current = setTimeout(() => setRecycle(false), 3000)
                  }
                }}
                style={{
                  backgroundColor: celebrate ? '#33ff33' : '',
                  boxShadow: celebrate ? '0px 0px 52px 5px #33ff33' : '',
                }}
                className="default-btn text-black text-sm mx-2"
              >
                👉🏼 celebrate
              </button>
              about!
            </p>
            <p className="text-white/50 text-base md:text-lg">
              Reach out to us through our contact page and happy programming!
            </p>
            <p className="text-white/70 text-base md:text-lg mt-4 font-medium">
              Let us help you make your idea come alive today!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
