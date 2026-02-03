"use client"

import React from "react"

interface WaveDividerProps {
  position?: "top" | "bottom"
  color?: string
  className?: string
}

export default function WaveDivider({
  position = "top",
  color = "fill-[#113a6d]",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`absolute left-0 w-full overflow-hidden leading-none ${
        position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full"
      } ${className} h-[80px] md:h-[150px]`}
      style={{ zIndex: 1 }}
    >
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-wave-slow {
          animation: wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        }
        .animate-wave-mid {
          animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) -2s infinite;
        }
        .animate-wave-fast {
          animation: wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) -4s infinite;
        }
      `}</style>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
        style={{ minWidth: '200%' }} // Allow room for horizontal movement
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep background layer for depth */}
        <path
          className={`${color} opacity-30 animate-wave-slow`}
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        {/* Middle layer */}
        <path
          className={`${color} opacity-50 animate-wave-mid`}
          d="M0,160L48,149.3C96,139,192,117,288,138.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        {/* Front layer - Solid color */}
        <path
          className={`${color} animate-wave-fast`}
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,117.3C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
}
