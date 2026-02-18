"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/context/language-context"
import { triggerSingleConfetti } from "@/lib/confetti"
import { useQuoteModal } from "./quote-modal"

export default function Navbar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { openModal } = useQuoteModal()

  const navLinks = [
    { href: "/#services", label: t("nav.services") },
    { href: "/about", label: t("nav.about") },
    { href: "/#gallery", label: t("nav.gallery") },
    { href: "/testimonials", label: t("nav.reviews") },
    { href: "/#contact", label: t("nav.contact") },
  ]

  const handleQuoteClick = () => {
    triggerSingleConfetti()
    setTimeout(() => {
      openModal()
    }, 1500)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top Promo Bar */}
      <div className="bg-[#1e71cd] text-white py-2 px-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest overflow-hidden border-b border-white/10">
        <div className="animate-pulse">
          {t("hero.promo")}
        </div>
      </div>

      <nav
        className={`transition-all duration-500 w-full ${
          scrolled || isOpen
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-20 h-20 md:w-28 md:h-28 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logoremovebj.png"
                  alt="Elite Surface Systems Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden sm:block font-(family-name:--font-orbitron) text-lg md:text-xl font-black tracking-widest text-foreground uppercase">
                ELITE SURFACE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#1e71cd] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons & Toggles */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              
              <Link href="/ai-estimate">
                <Button className="relative bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] overflow-hidden group">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 animate-pulse bg-emerald-400/20 rounded-full" />
                  <div className="relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="uppercase tracking-widest text-xs">{t("nav.aiEstimate")}</span>
                  </div>
                </Button>
              </Link>

              <Button
                onClick={handleQuoteClick}
                className="bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(30,113,205,0.4)]"
              >
                <Phone className="w-4 h-4" />
                <span>{t("nav.freeQuote")}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-foreground"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Toggle menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-1 border-t border-border">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 px-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                
                <Link href="/ai-estimate" onClick={() => setIsOpen(false)}>
                  <Button className="w-full relative bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] overflow-hidden group">
                    <div className="absolute inset-0 animate-pulse bg-emerald-400/20 rounded-full" />
                    <Sparkles className="w-5 h-5 relative animate-pulse" />
                    <span className="relative uppercase tracking-widest text-sm">{t("nav.aiEstimate")}</span>
                  </Button>
                </Link>

                <Button
                  onClick={handleQuoteClick}
                  className="flex-1 bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>{t("nav.freeQuote")}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
