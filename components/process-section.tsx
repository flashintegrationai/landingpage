"use client"

import { useEffect, useRef, useState } from "react"
import { ClipboardList, CalendarCheck, Coffee, ArrowRight, Sparkles, Zap } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { triggerSingleConfetti } from "@/lib/confetti"
import { useLanguage } from "@/context/language-context"

const BackgroundEffects = dynamic(
  () => import("@/components/background-effects"),
  { ssr: false }
)
import WaveDivider from "./wave-divider"

export default function ProcessSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const steps = [
    {
      icon: Sparkles,
      number: "1",
      title: t("process.steps.step1.title"),
      description: t("process.steps.step1.description"),
    },
    {
      icon: CalendarCheck,
      number: "2",
      title: t("process.steps.step2.title"),
      description: t("process.steps.step2.description"),
    },
    {
      icon: Coffee,
      number: "3",
      title: t("process.steps.step3.title"),
      description: t("process.steps.step3.description"),
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 md:py-32 bg-secondary/20 overflow-hidden transition-colors duration-300"
    >
      {/* Wave at the top, pointing downwards from the previous section */}
      <WaveDivider 
        position="top" 
        color="fill-slate-50 dark:fill-[#0b0b0b]" 
        className="translate-y-0! scale-y-[-1]" 
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-(family-name:--font-orbitron) text-[#1e71cd] text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-4">
            {t("process.weMake")}
          </h2>
          <h3 className="font-(family-name:--font-orbitron) text-4xl sm:text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight">
            {t("process.title")}<br />
            <span className="text-[#1e71cd]">{t("process.fastAndEasy")}</span>
          </h3>
          
          <p className="max-w-3xl mx-auto text-xl text-foreground font-medium leading-relaxed mb-10">
            {t("process.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/ai-estimate">
              <div className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent/10 border border-accent/30 rounded-2xl hover:bg-accent/20 transition-all duration-300 cursor-pointer">
                <Sparkles className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black text-primary uppercase tracking-widest">{t("process.tryAI")}</span>
                <Zap className="w-4 h-4 text-primary fill-primary animate-pulse" />
              </div>
            </Link>
          </div>

          {/* Decorative Wavy Line */}
          <div className="flex justify-center mb-16">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10C10 10 10 2 20 2C30 2 30 18 40 18C50 18 50 2 60 2C70 2 70 18 80 18C90 18 90 2 100 2C110 2 110 10 120 10" stroke="#1e71cd" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Card */}
              <div className="relative p-10 rounded-4xl bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 z-10 flex flex-col items-center text-center shadow-lg">
                {/* Large Decorative Number - Increased visibility */}
                <span className="absolute -top-12 left-6 font-(family-name:--font-orbitron) text-9xl font-black text-primary/20 select-none z-0">
                  {step.number}
                </span>

                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-3xl bg-primary text-white flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 transition-transform relative z-10">
                  <step.icon className="w-12 h-12" />
                </div>

                {/* Content */}
                <h4 className="font-(family-name:--font-orbitron) text-2xl font-bold text-foreground mb-4 relative z-10">
                  {step.title}
                </h4>
                <p className="text-foreground/80 font-medium leading-relaxed text-lg relative z-10">
                  {step.description}
                </p>
              </div>

              {/* Connecting Arrow for Desktop */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 hidden lg:block z-20">
                  <ArrowRight className="w-10 h-10 text-primary animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button - Aligned with Brand Schematics */}
        <div className={`text-center mt-24 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="#contact"
            onClick={triggerSingleConfetti}
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#1e71cd] text-white font-bold rounded-2xl shadow-[0_20px_40px_rgba(30,113,205,0.3)] hover:bg-[#1e71cd]/90 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-lg"
          >
            <ClipboardList className="w-6 h-6" />
            {t("process.getFastQuote")}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
