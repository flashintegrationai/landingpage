"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  X,
  Shield,
  Leaf,
  Clock,
  Award,
  Banknote,
  HeartHandshake,
} from "lucide-react"

import Image from "next/image"
import WaveDivider from "./wave-divider"

const comparisonData = [
  {
    feature: "Professional Soft Washing",
    independent: false,
    established: true,
    elite: true,
  },
  {
    feature: "Roof Cleaning Warranty",
    independent: false,
    established: true,
    elite: true,
  },
  {
    feature: "House Washing Warranty",
    independent: false,
    established: false,
    elite: true,
  },
  {
    feature: "Eco-Friendly Solutions",
    independent: false,
    established: false,
    elite: true,
  },
  {
    feature: "100% Satisfaction Guarantee",
    independent: false,
    established: false,
    elite: true,
  },
]

const featuresList = [
  {
    icon: Shield,
    title: "Fully Insured",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
  },
  {
    icon: Clock,
    title: "On-Time Service",
  },
  {
    icon: Award,
    title: "Certified Experts",
  },
  {
    icon: Banknote,
    title: "Fair Pricing",
  },
  {
    icon: HeartHandshake,
    title: "100% Guarantee",
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      className="relative py-20 md:py-32 bg-slate-50 dark:bg-[#0b0b0b] overflow-hidden transition-colors duration-300"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            Why Choose Us
          </span>
          <h2 className="font-(family-name:--font-orbitron) text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-8 tracking-tight uppercase">
            THE <span className="text-primary italic">ELITE</span> DIFFERENCE
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium">
            Not all pressure washing services are created equal. See how Elite Surface Systems sets the gold standard.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div 
          className={`mb-24 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="bg-card rounded-3xl md:rounded-[2.5rem] border border-border shadow-2xl overflow-hidden">
            {/* Table wrapper for mobile scroll if needed, but aimed at fitting */}
            <div className="w-full">
              {/* Header */}
              <div className="grid grid-cols-12 p-3 md:p-8 border-b border-border bg-muted/30 items-center gap-1">
                <div className="col-span-4 md:col-span-3" />
                <div className="col-span-2 md:col-span-3 text-center font-(family-name:--font-orbitron) text-[6px] md:text-xs font-bold text-muted-foreground uppercase tracking-tighter md:tracking-[0.2em] leading-tight">
                  Indep. Washers
                </div>
                <div className="col-span-3 md:col-span-3 text-center font-(family-name:--font-orbitron) text-[6px] md:text-xs font-bold text-muted-foreground uppercase tracking-tighter md:tracking-[0.2em] leading-tight">
                  Estab. Washers
                </div>
                <div className="col-span-3 md:col-span-3 flex flex-col items-center justify-center gap-0.5 md:gap-2">
                  <div className="relative w-6 h-6 md:w-20 md:h-20">
                    <Image
                      src="/images/navlogo.png"
                      alt="Elite Logo"
                      fill
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src="/images/navlogodark.png"
                      alt="Elite Logo"
                      fill
                      className="object-contain hidden dark:block"
                    />
                  </div>
                  <div className="text-center font-(family-name:--font-orbitron) text-[8px] md:text-base font-black text-primary uppercase tracking-tighter md:tracking-[0.2em]">
                    Elite
                  </div>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-border">
                {comparisonData.map((row) => (
                  <div key={row.feature} className="grid grid-cols-12 items-center group hover:bg-muted/50 transition-colors">
                    <div className="col-span-4 md:col-span-3 p-3 md:p-8 font-bold text-[10px] md:text-lg text-foreground leading-tight">
                      {row.feature}
                    </div>
                    <div className="col-span-2 md:col-span-3 p-2 md:p-8 flex justify-center">
                      {row.independent ? (
                        <Check className="w-4 h-4 md:w-8 md:h-8 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 md:w-8 md:h-8 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="col-span-3 md:col-span-3 p-2 md:p-8 flex justify-center">
                      {row.established ? (
                        <Check className="w-4 h-4 md:w-8 md:h-8 text-muted-foreground" />
                      ) : (
                        <X className="w-4 h-4 md:w-8 md:h-8 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="col-span-3 md:col-span-3 p-2 md:p-8 flex justify-center bg-primary/5">
                      {row.elite ? (
                        <Check className="w-5 h-5 md:w-10 md:h-10 text-primary drop-shadow-[0_0_10px_rgba(30,113,205,0.4)]" />
                      ) : (
                        <X className="w-4 h-4 md:w-8 md:h-8 text-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Row */}
              <div className="grid grid-cols-12 p-3 md:p-8 bg-primary/10 items-center">
                <div className="col-span-9 text-right pr-4 md:pr-12 font-bold text-foreground text-[10px] md:text-lg uppercase tracking-wide">
                  The best choice:
                </div>
                <div className="col-span-3 text-center font-(family-name:--font-orbitron) text-xs md:text-3xl font-black text-primary animate-pulse tracking-tighter">
                  ELITE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-16">
          {featuresList.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100 + 800}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 text-primary shadow-sm">
                 <feature.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-foreground text-[10px] md:text-xs uppercase tracking-widest">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
