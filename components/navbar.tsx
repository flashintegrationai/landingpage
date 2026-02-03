"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { triggerSingleConfetti } from "@/lib/confetti"

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-transform duration-300 group-hover:scale-105">
              {/* Light Mode Logo */}
              <Image
                src="/images/navlogo.png"
                alt="Elite Surface Systems Logo"
                fill
                className="object-contain dark:hidden"
                priority
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/navlogodark.png"
                alt="Elite Surface Systems Logo"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
            <span className="hidden sm:block font-(family-name:--font-orbitron) text-lg md:text-xl lg:text-2xl font-black tracking-widest text-foreground uppercase">
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

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              onClick={triggerSingleConfetti}
              className="bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(30,113,205,0.5)]"
            >
              <Link href="tel:+1234567890" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Free Quote</span>
              </Link>
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
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
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
            <div className="pt-4 px-4 flex items-center gap-3">
              <ThemeToggle />
              <Button
                asChild
                onClick={triggerSingleConfetti}
                className="flex-1 bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white font-semibold py-3 rounded-full"
              >
                <Link href="tel:+1234567890" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Get Free Quote</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
