import { useEffect, useRef, useState } from "react"


export default function FaceChatSVG({ h, w, eyeSize = 7, eyeWidth = 5, color = "white", wink = false, alive = false, mood = "neutral" }) {
    const [winkRight, setWinkRight] = useState(false)
    const [winkLeft, setWinkLeft] = useState(false)
    const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
    const blinking = useRef(null)

    useEffect(() => {
        if (wink) {
            setWinkRight(true)
            setTimeout(() => setWinkRight(false), 300)
        }
    }, [wink])

    useEffect(() => {
        if (alive) {
            blinking.current = setInterval(() => {
                setWinkLeft(true)
                setWinkRight(true)
                setTimeout(() => {
                    setWinkLeft(false)
                    setWinkRight(false)
                }, alive ? 150 : 300)
            }, 3000)

            // Subtle random eye movement
            const lookAround = setInterval(() => {
                setPupilOffset({
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 1.5,
                })
            }, 2000)

            return () => {
                clearInterval(blinking.current)
                clearInterval(lookAround)
            }
        } else {
            clearInterval(blinking.current)
        }
    }, [alive])

    const moodColor = mood === "happy" ? "#4ade80" : mood === "thinking" ? "#facc15" : mood === "sad" ? "#f87171" : mood === "excited" ? "#818cf8" : color
    const pupilSize = eyeSize * 0.45

    return (
        <div style={{ width: w, height: h }} className="relative">
            <svg xmlns="http://www.w3.org/2000/svg"
                width={w} height={h}
                viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M18.3121 23.3511C17.4463 23.0228 16.7081 22.5979 16.1266 22.1995C14.8513 22.7159 13.4578 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 14.2788 22.306 16.3983 21.1179 18.1551C21.0425 19.6077 21.8054 20.9202 22.5972 22.0816C23.2907 23.0987 23.1167 23.9184 21.8236 23.9917C21.244 24.0245 19.9903 23.9874 18.3121 23.3511ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.9503 20.3808 15.7531 19.328 17.2262C18.8622 17.8782 19.1018 19.0998 19.2616 19.8011C19.4167 20.4818 19.7532 21.2051 20.0856 21.8123C19.7674 21.7356 19.4111 21.6288 19.0212 21.481C18.1239 21.1407 17.3824 20.6624 16.8594 20.261C16.5626 20.0332 16.1635 19.9902 15.825 20.1494C14.6654 20.6947 13.3697 21 12 21C7.02944 21 3 16.9706 3 12ZM8.03001 15.2425C7.87428 14.6196 8.36619 14.0002 9.00016 13.9998H15.0002C15.6333 14.0002 16.126 14.6172 15.9703 15.24C15.4525 16.9881 13.7854 18 12.0002 18C10.2834 18 8.46902 16.9986 8.03001 15.2425Z"
                    fill={moodColor} />
            </svg>
            {/* Eyes with pupils */}
            <div style={{
                paddingTop: (h * 0.4) - (eyeSize / 2)
            }} className="absolute w-full top-0 flex flex-row items-end justify-center">
                {/* Left eye */}
                <div style={{
                    height: eyeSize * (winkLeft ? 0.3 : 1),
                    width: eyeSize,
                    backgroundColor: moodColor,
                    position: 'relative',
                    overflow: 'hidden',
                }} className="z-[10] rounded-full transition-all duration-150">
                    {!winkLeft && (
                        <div style={{
                            width: pupilSize,
                            height: pupilSize,
                            backgroundColor: mood === "neutral" ? '#1a1a2e' : '#000',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: `calc(50% + ${pupilOffset.y}px)`,
                            left: `calc(50% + ${pupilOffset.x}px)`,
                            transform: 'translate(-50%, -50%)',
                            transition: 'all 0.4s ease',
                        }} />
                    )}
                </div>
                <div style={{ height: eyeSize, width: eyeWidth / 2 }} className="z-[10]" />
                {/* Right eye */}
                <div style={{
                    height: eyeSize * (winkRight ? 0.3 : 1),
                    width: eyeSize,
                    backgroundColor: moodColor,
                    position: 'relative',
                    overflow: 'hidden',
                }} className="z-[10] rounded-full transition-all duration-150">
                    {!winkRight && (
                        <div style={{
                            width: pupilSize,
                            height: pupilSize,
                            backgroundColor: mood === "neutral" ? '#1a1a2e' : '#000',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: `calc(50% + ${pupilOffset.y}px)`,
                            left: `calc(50% + ${pupilOffset.x}px)`,
                            transform: 'translate(-50%, -50%)',
                            transition: 'all 0.4s ease',
                        }} />
                    )}
                </div>
            </div>
        </div>
    )
}