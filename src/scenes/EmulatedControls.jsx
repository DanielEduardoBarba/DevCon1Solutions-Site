import { Suspense, lazy, useEffect, useRef, useState } from "react"
import Pedals from "../components/Pedals"
import ArrowSVG from "../components/componentassets/ArrowSVG"

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function EmulatedControls() {
  const [steer, setSteer] = useState(0)
  const intervalID = useRef(null)
  const timeGap = 30
  const smallestGap = 2

  useEffect(() => {
    clearInterval(intervalID.current)
    const delay = timeGap - Math.abs(steer) * timeGap

    if (steer === 0) return
    else if (steer < 0) {
      intervalID.current = setInterval(() => {
        holdKey("ArrowLeft")
        setTimeout(() => {
          releaseKey("ArrowLeft")
          releaseKey("ArrowRight")
        }, smallestGap + 2)
      }, delay > smallestGap ? delay : smallestGap)
    } else if (steer > 0) {
      intervalID.current = setInterval(() => {
        holdKey("ArrowRight")
        setTimeout(() => {
          releaseKey("ArrowLeft")
          releaseKey("ArrowRight")
        }, smallestGap + 2)
      }, delay > smallestGap ? delay : smallestGap)
    }

    return () => clearInterval(intervalID.current)
  }, [steer])

  function holdKey(key) {
    document.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }
  function releaseKey(key) {
    document.dispatchEvent(new KeyboardEvent('keyup', { key }))
  }

  return (
    <div className="relative h-full min-h-[400px] w-full flex flex-col">
      {/* Spline 3D Scene - lazy loaded */}
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/50 text-sm">Loading 3D scene...</p>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/A1i-MMZ2Ie1NTvif/scene.splinecode"
          className="absolute inset-0 w-full h-full z-0"
        />
      </Suspense>

      {/* Controls */}
      <div className="absolute bottom-0 w-full flex flex-col-reverse lg:flex-row justify-between z-10">
        <div className="flex flex-row justify-start -translate-x-5">
          <Pedals
            h={125}
            brakeFx={() => releaseKey("ArrowUp")}
            accelFx={() => holdKey("ArrowUp")}
          />
        </div>
        <div
          onClick={() => setSteer(0)}
          className="absolute bottom-0 right-0 bg-black/60 backdrop-blur-sm m-2 rounded-xl border border-white/10"
        >
          {/* Mobile: up above, left+right below */}
          <div className="flex flex-col lg:hidden">
            <div className="flex justify-center">
              <button
                onTouchStart={() => holdKey(" ")}
                onTouchEnd={() => releaseKey(" ")}
                onMouseDown={() => holdKey(" ")}
                onMouseUp={() => releaseKey(" ")}
                className="default-btn !bg-black/80"
              >
                <ArrowSVG w={50} h={50} deg={270} />
              </button>
            </div>
            <div className="flex flex-row">
              <button
                onTouchStart={() => holdKey("ArrowLeft")}
                onTouchEnd={() => releaseKey("ArrowLeft")}
                onMouseDown={() => holdKey("ArrowLeft")}
                onMouseUp={() => releaseKey("ArrowLeft")}
                className="default-btn !bg-black/80"
              >
                <ArrowSVG w={50} h={50} deg={180} />
              </button>
              <button
                onTouchStart={() => holdKey("ArrowRight")}
                onTouchEnd={() => releaseKey("ArrowRight")}
                onMouseDown={() => holdKey("ArrowRight")}
                onMouseUp={() => releaseKey("ArrowRight")}
                className="default-btn !bg-black/80"
              >
                <ArrowSVG w={50} h={50} deg={0} />
              </button>
            </div>
          </div>
          {/* Desktop: left, up, right in a row */}
          <div className="hidden lg:flex flex-row">
            <button
              onTouchStart={() => holdKey("ArrowLeft")}
              onTouchEnd={() => releaseKey("ArrowLeft")}
              onMouseDown={() => holdKey("ArrowLeft")}
              onMouseUp={() => releaseKey("ArrowLeft")}
              className="default-btn !bg-black/80"
            >
              <ArrowSVG w={50} h={50} deg={180} />
            </button>
            <button
              onTouchStart={() => holdKey(" ")}
              onTouchEnd={() => releaseKey(" ")}
              onMouseDown={() => holdKey(" ")}
              onMouseUp={() => releaseKey(" ")}
              className="default-btn !bg-black/80"
            >
              <ArrowSVG w={50} h={50} deg={270} />
            </button>
            <button
              onTouchStart={() => holdKey("ArrowRight")}
              onTouchEnd={() => releaseKey("ArrowRight")}
              onMouseDown={() => holdKey("ArrowRight")}
              onMouseUp={() => releaseKey("ArrowRight")}
              className="default-btn !bg-black/80"
            >
              <ArrowSVG w={50} h={50} deg={0} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
