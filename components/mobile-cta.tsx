"use client"

import { useEffect, useState } from "react"
import { Phone, MessageCircle } from "lucide-react"

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent md:hidden">
      <div className="flex gap-3">
        <a
          href="tel:+1234567890"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1e71cd] text-white font-semibold rounded-2xl shadow-[0_0_30px_rgba(30,113,205,0.4)] active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          Get Quote
        </a>
      </div>
    </div>
  )
}
