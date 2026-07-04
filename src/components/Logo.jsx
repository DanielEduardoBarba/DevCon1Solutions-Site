'use client'

import devCon1 from "../assets/devcon1-logo.png"

export default function Logo({ w, h }) {
    return (
        <img
            src={devCon1.src}
            alt="DevCon1 Solutions"
            style={{
                width: w ? w : "",
                height: h ? h : ""
            }}
            className="z-0 rounded-[5px] lg:rounded-[10px] object-contain"
        />
    )
}