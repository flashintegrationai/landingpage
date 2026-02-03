"use client"

import { useState, useEffect } from "react"
import { Phone, MessageSquare, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { triggerSingleConfetti } from "@/lib/confetti"

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false)

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
      className={`fixed bottom-8 right-6 z-50 flex flex-col gap-3 transition-all duration-500 transform ${
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
          asChild
          onClick={triggerSingleConfetti}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-110 transition-all duration-300 p-0"
        >
          <Link href="tel:+1234567890" title="Call Now">
            <Phone className="w-6 h-6" />
          </Link>
        </Button>

        <Button
          asChild
          onClick={triggerSingleConfetti}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-6 h-14 rounded-2xl shadow-[0_10px_30px_rgba(30,113,205,0.4)] flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <Link href="#contact">
            <Quote className="w-5 h-5" />
            <span className="hidden sm:inline">GET FREE QUOTE</span>
            <span className="sm:hidden">QUOTE</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
