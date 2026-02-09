"use client"

import { useState, useEffect } from "react"
import { Phone, MessageSquare, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { triggerSingleConfetti } from "@/lib/confetti"
import { useQuoteModal } from "./quote-modal"

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false)
  const { openModal } = useQuoteModal()

  const handleQuoteClick = () => {
    triggerSingleConfetti()
    setTimeout(() => {
      openModal()
    }, 1500)
  }

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className={`fixed bottom-24 right-6 z-50 flex flex-col gap-3 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      {/* Social Proof Teaser */}
      <div className="hidden sm:flex bg-background border border-border shadow-xl rounded-2xl p-3 items-center gap-3 animate-bounce shadow-primary/10">
        <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-tight text-foreground">
          3 People requested a quote today!
        </span>
      </div>

      {/* Main FABs */}
      <div className="flex flex-col gap-3 items-end">
        <Button
          onClick={handleQuoteClick}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Call or WhatsApp"
        >
          <Phone className="w-6 h-6" />
        </Button>

 
      </div>
    </div>
  )
}
