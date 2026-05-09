

export default function SpinnerSVG({h, w , color="black"}) {

    return (
            <svg className="animate-spin"  width={w} height={h} viewBox="0 0 24 24" fill="none">
                <path d="M4.97498 12H7.89998" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11.8 5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18.625 12H15.7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11.8 19V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6.97374 16.95L9.04203 14.8287" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6.97374 7.05001L9.04203 9.17133" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16.6262 7.05001L14.5579 9.17133" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16.6262 16.95L14.5579 14.8287" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
    )
}