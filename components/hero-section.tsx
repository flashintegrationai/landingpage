"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Droplets, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { triggerSingleConfetti } from "@/lib/confetti"

const BackgroundEffects = dynamic(
  () => import("@/components/background-effects"),
  { ssr: false }
)

const stats = [
  { icon: Droplets, value: "500+", label: "Projects" },
  { icon: Shield, value: "100%", label: "Satisfaction" },
  { icon: Zap, value: "24/7", label: "Service" },
]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-background text-foreground transition-colors duration-300">
      {/* Radial Gradient Background - Bottom Layer */}
      <div
        className="absolute inset-0 z-0 opacity-100 dark:opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, var(--background) 40%, #1e71cd 100%)",
        }}
      />
      {/* Background Rain Effect - Middle Layer */}
      <div className="absolute inset-0 z-5">
        <BackgroundEffects showWaves={false} />
      </div>
      {/* Content - Top Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-8 transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">
                Next-Gen Surface Cleaning
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`font-(family-name:--font-orbitron) text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 transition-all duration-1000 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block text-balance">Transform Your</span>
              <span className="block mt-2 bg-linear-to-r from-[#1e71cd] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
                Commercial Space
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 transition-all duration-1000 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Elite Surface Systems delivers professional-grade pressure washing solutions. 
              We revitalize properties with advanced technology and eco-friendly machinery.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                asChild
                onClick={triggerSingleConfetti}
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  Get Free Estimate
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-input bg-background/50 hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <Link href="#services">Our Services</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
                  <span className="font-(family-name:--font-orbitron) text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div
             className={`relative h-[400px] md:h-[600px] w-full hidden lg:block transition-all duration-1000 delay-300 ${
               mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
             }`}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-4xl transform rotate-3" />
            <div className="absolute inset-0 bg-background rounded-4xl border border-border shadow-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
               <Image
                 src="/images/commercial-hero.png"
                 alt="Professional Pressure Washing Team"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
                 priority
               />
               
               {/* Overlay Content */}
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">Industrial Grade</span>
                  </div>
                  <p className="text-sm text-white/80">Expert cleaning for large-scale facilities</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade for Seamless Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-b from-transparent to-background z-20 pointer-events-none" />
    </section>
  )
}
