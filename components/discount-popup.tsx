"use client"

import { useEffect, useState } from "react"
import { X, Sparkles, Bot, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

import { useRouter } from "next/navigation"

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const router = useRouter()

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    
    // Countdown timer for scarcity
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClaim = () => {
    setIsOpen(false)
    router.push("/ai-estimate")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md"
          />

          {/* Popup Container - Horizontal Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-61 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-20 bg-black/20 rounded-full hover:bg-black/40 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Visual / Graphic */}
              <div className="relative w-full md:w-2/5 bg-linear-to-br from-[#1e71cd] to-[#0a2e5c] p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden min-h-[250px] md:min-h-[400px]">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent" />
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative z-10 w-24 h-24 md:w-40 md:h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl mb-6"
                >
                  <img 
                    src="/logoremovebj.png" 
                    alt="Elite Surface Logo" 
                    className="w-40 h-40 md:w-40 md:h-40 object-contain drop-shadow-md"
                  />
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-black px-2 py-1 rounded-md shadow-lg rotate-12">
                    AI POWERED
                  </div>
                </motion.div>

                <div className="relative z-10 text-center">
                  <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">Exclusive Offer</div>
                  <div className="font-(family-name:--font-orbitron) text-4xl font-black text-white leading-none">
                    20% <span className="text-xs align-top">OFF</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Content & Action */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-card relative">
                {/* Urgent Timer Badge */}
                <div className="absolute top-6 right-16 md:right-auto md:left-10 flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  <Zap className="w-3 h-3 fill-current" />
                  Offer Expires in {formatTime(timeLeft)}
                </div>

                <div className="mt-6 md:mt-2">
                  <h2 className="font-(family-name:--font-orbitron) text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight">
                    Unlock Your <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1e71cd] to-purple-500">Instant AI Estimate</span>
                  </h2>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                    Stop guessing. Our AI technology analyzes your property instantly to give you the most accurate price. <strong className="text-foreground">Book 2+ services today and save big.</strong>
                  </p>

                  <div className="space-y-4">
                    <Button
                      onClick={handleClaim}
                      className="w-full h-14 bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white rounded-xl text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all group overflow-hidden relative"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Claim AI Offer Now
                      </span>
                      {/* Button shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    </Button>
                    
                    <button 
                      onClick={handleClose}
                      className="w-full text-center text-xs text-muted-foreground hover:text-foreground underline decoration-dotted transition-colors"
                    >
                      No thanks, I prefer paying full price
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
