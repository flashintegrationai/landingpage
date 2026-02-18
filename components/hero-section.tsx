"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Droplets, Shield, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { triggerSingleConfetti } from "@/lib/confetti"
import { useQuoteModal } from "./quote-modal"
import { useLanguage } from "@/context/language-context"

const BackgroundEffects = dynamic(
  () => import("@/components/background-effects"),
  { ssr: false }
)

export default function HeroSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const { openModal } = useQuoteModal()

  const stats = [
    { icon: Droplets, value: "500+", label: t("stats.projects") },
    { icon: Shield, value: "100%", label: t("stats.satisfaction") },
    { icon: Zap, value: "24/7", label: t("stats.service") },
  ]

  const handleQuoteClick = () => {
    triggerSingleConfetti()
    setTimeout(() => {
      openModal()
    }, 1500)
  }

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
            {/* Badge - AI Estimate Link */}
            <Link href="/ai-estimate">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-8 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 cursor-pointer group ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {t("nav.aiEstimate")}
                </span>
              </div>
            </Link>

            {/* Heading */}
            <h1
              className={`font-(family-name:--font-orbitron) text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 transition-all duration-1000 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block text-balance">{t("hero.revitalize")}</span>
              <span className="block mt-2 bg-linear-to-r from-[#1e71cd] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
                {t("hero.propertyToday")}
              </span>
            </h1>

            {/* Subtitle - MORE RELEVANT COPY */}
            <p
              className={`max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 transition-all duration-1000 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("hero.description")}
              <span className="text-foreground font-bold">{t("hero.industrialSoftWash")}</span>
            </p>

            {/* COMMERCIAL BADGES */}
            <div className="flex flex-wrap gap-4 mb-10">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                 <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                 </div>
                 <span className="text-[10px] font-bold text-foreground uppercase tracking-tight">{t("hero.googleRating")}</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                 <Shield className="w-3 h-3 text-green-500" />
                 <span className="text-[10px] font-bold text-foreground uppercase tracking-tight">{t("hero.guaranteed")}</span>
               </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                onClick={handleQuoteClick}
                size="lg"
                className="group bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white font-black px-10 py-8 text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(30,113,205,0.3)] animate-pulse hover:animate-none"
              >
                <div className="flex flex-col items-center leading-tight">
                  <span className="flex items-center gap-2 uppercase tracking-wide">
                    {t("hero.bookEstimate")}
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[10px] font-normal opacity-80 mt-1 uppercase tracking-[0.2em]">{t("hero.noCommitment")}</span>
                </div>
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
                 src="image.png"
                 alt=""
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
                 priority
               />
               
               {/* Overlay Content */}
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">{t("hero.industrialGrade")}</span>
                  </div>
                  <p className="text-sm text-white/80">{t("hero.expertCleaning")}</p>
               </div>
            </div>

            {/* THE "OFFER" TRIGGER - POSITIVE RIGHT POSITION */}
            <div className="absolute top-20 -right-12 z-40 animate-float">
               <div className="group relative">
                 <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-orange-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative flex flex-col items-center bg-red-600 text-white rounded-lg px-8 py-6 shadow-2xl">
                     <span className="font-black text-4xl italic tracking-tighter animate-bounce block">{t("hero.offer")}</span>
                     <div className="w-full h-px bg-white/30 my-2" />
                     <span className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">{t("hero.offToday")}</span>
                     {/* Decorative corner tag */}
                     <div className="absolute -top-4 -right-4 bg-white text-red-600 text-[12px] font-black px-3 py-1.5 rounded shadow-xl transform rotate-12 group-hover:rotate-0 transition-all">
                       {t("hero.limited")}
                     </div>
                 </div>
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
