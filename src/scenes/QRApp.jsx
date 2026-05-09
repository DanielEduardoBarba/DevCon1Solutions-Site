import { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import html2canvas from "html2canvas"
import DownloadSVG from "../components/componentassets/DownloadSVG"
import SpinnerSVG from "../components/componentassets/SpinnerSVG"

export default function QRApp({ embedded = false }) {
  const [text, setText] = useState("")
  const [qr, setQr] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (qr) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 2000)
    }
  }, [qr])

  const snapShotQR = async () => {
    const div = document.getElementById('qrdiv')
    const canvas = await html2canvas(div)
    const imgData = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = imgData
    link.download = 'myQRcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const content = (
    <div className={`w-full max-w-sm ${embedded ? '' : 'fade-in-up'}`}>
      {!embedded && (
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">
            Tool
          </p>
          <h1 className="text-3xl font-bold text-white mb-2 gradient-text">
            QR Code Generator
          </h1>
        </div>
      )}

      <div className={embedded ? '' : 'glass-card p-6 md:p-8'}>
          <div className="w-full flex flex-col justify-center mb-6">
            {qr ? (
              isLoading ? (
                <div className="flex justify-center py-8">
                  <SpinnerSVG w={40} h={40} color="white" />
                </div>
              ) : (
                <>
                  <div id="qrdiv" className="bg-white p-4 rounded-xl">
                    <QRCode
                      size={256}
                      value={qr}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox="0 0 256 256"
                    />
                  </div>
                  <button
                    onClick={snapShotQR}
                    className="cta-button mt-4 flex items-center justify-center gap-2 !bg-green-600 hover:!shadow-green-600/40"
                  >
                    <DownloadSVG w={20} h={20} color="white" />
                    Download QR
                  </button>
                </>
              )
            ) : (
              <p className="text-white/50 text-center py-8">
                Start typing to generate your QR code!
              </p>
            )}
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter url, text, etc..."
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <button
              onClick={() => setQr(text)}
              disabled={!text}
              className={`cta-button w-full ${
                !text
                  ? '!bg-gray-700 opacity-50 cursor-not-allowed'
                  : text === qr
                  ? '!bg-gray-500'
                  : ''
              }`}
            >
              {isLoading ? '...' : text === qr && text ? 'Ready!' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
  )

  if (embedded) return content

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6 flex justify-center items-start">
      {content}
    </div>
  )
}
