"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function CookieConsent() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-primary/20 p-6 rounded-3xl shadow-2xl shadow-primary/10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {t("cookieConsent.message")}{" "}
                <Link href="/privacy" className="text-primary font-bold hover:underline">
                  {t("cookieConsent.privacyPolicy")}
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecline}
                className="text-xs font-bold uppercase tracking-widest hover:bg-primary/5"
              >
                {t("cookieConsent.decline")}
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-widest px-6 shadow-lg shadow-primary/20"
              >
                {t("cookieConsent.accept")}
              </Button>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-foreground/20 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
