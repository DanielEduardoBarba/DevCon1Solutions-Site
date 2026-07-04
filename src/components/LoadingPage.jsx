'use client'

import SpinnerSVG from "./componentassets/SpinnerSVG"

export default function LoadingPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <SpinnerSVG w={40} h={40} color="white" />
        <p className="text-white/40 text-sm">Loading...</p>
      </div>
    </div>
  )
}
