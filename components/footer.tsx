"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from "lucide-react"
import WaveDivider from "./wave-divider"

const footerLinks = {
  services: [
    { label: "House Washing", href: "/#services" },
    { label: "Driveway Cleaning", href: "/#services" },
    { label: "Roof Cleaning", href: "/#services" },
    { label: "Commercial", href: "/#services" },
    { label: "Fence Restoration", href: "/#services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/#gallery" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "Contact", href: "/#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-slate-50 dark:bg-[#0b0b0b] text-foreground dark:text-white pt-24 md:pt-32 transition-colors duration-300">
      {/* Wave Divider at the Top */}
      <WaveDivider position="top" color="fill-slate-50 dark:fill-[#0b0b0b]" className="-translate-y-full h-[120px] md:h-[180px]" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center group mb-8">
              <div className="relative w-32 h-32 md:w-48 md:h-48 transition-transform duration-300 group-hover:scale-105">
                {/* Light Mode Logo */}
                <Image
                  src="/images/navlogo.png"
                  alt="Elite Surface Systems Logo"
                  fill
                  className="object-contain dark:hidden"
                />
                {/* Dark Mode Logo */}
                <Image
                  src="/images/navlogodark.png"
                  alt="Elite Surface Systems Logo"
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
            </Link>
            <p className="text-muted-foreground dark:text-white/70 leading-relaxed mb-8 text-lg">
              Cutting-edge pressure washing technology for residential and
              commercial properties. Experience the future of surface cleaning.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground dark:text-white/70 hover:text-[#1e71cd] hover:border-[#1e71cd] hover:bg-white dark:hover:bg-white transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-(family-name:--font-orbitron) text-base font-bold text-foreground dark:text-white uppercase tracking-[0.2em] mb-8">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground dark:text-white/60 hover:text-primary dark:hover:text-white hover:translate-x-2 inline-block transition-all duration-300 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-(family-name:--font-orbitron) text-base font-bold text-foreground dark:text-white uppercase tracking-[0.2em] mb-8">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground dark:text-white/60 hover:text-primary dark:hover:text-white hover:translate-x-2 inline-block transition-all duration-300 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="font-(family-name:--font-orbitron) text-base font-bold text-foreground dark:text-white uppercase tracking-[0.2em] mb-8">
              Get In Touch
            </h3>
            <div className="p-6 rounded-3xl bg-foreground/5 dark:bg-white/5 border border-border dark:border-white/10 mb-6 group hover:border-[#1e71cd]/50 transition-colors">
              <div className="font-(family-name:--font-orbitron) text-2xl font-black text-[#1e71cd] mb-1 group-hover:scale-105 transition-transform">
                (123) 456-7890
              </div>
              <div className="text-sm text-muted-foreground dark:text-white/50 font-medium uppercase tracking-widest">Call for free quote</div>
            </div>
            <div className="text-muted-foreground dark:text-white/60 font-medium">
              <p className="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">info@elitesurface.com</p>
              <p className="mt-2 text-muted-foreground dark:text-white/60">South Florida Service Area</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground dark:text-white/40 font-medium tracking-wide">
              © {new Date().getFullYear()} Elite Surface Systems. All rights
              reserved.
            </div>
            <div className="flex items-center gap-8">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-[#1e71cd] text-white shadow-2xl hover:shadow-[#1e71cd]/50 transition-all duration-300 hover:scale-110 flex items-center justify-center z-40 group overflow-hidden"
        aria-label="Back to top"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <ArrowUp className="w-6 h-6 relative z-10" />
      </button>
    </footer>
  )
}
