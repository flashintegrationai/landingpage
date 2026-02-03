"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CheckCircle, Award, Clock, Users } from "lucide-react"

const features = [
  "State-of-the-art pressure washing equipment",
  "Eco-friendly cleaning solutions",
  "Fully licensed and insured",
  "100% satisfaction guarantee",
  "Competitive pricing",
  "Same-week availability",
]

const highlights = [
  {
    icon: Award,
    value: "5★",
    label: "Rating",
    description: "Consistently rated",
  },
  {
    icon: Clock,
    value: "10+",
    label: "Years",
    description: "Of experience",
  },
  {
    icon: Users,
    value: "2K+",
    label: "Clients",
    description: "Happy customers",
  },
]

export default function AboutSection() {
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
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-background overflow-hidden transition-colors duration-300"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-size-[50px_50px] bg-[linear-gradient(rgba(30,113,205,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,113,205,0.03)_1px,transparent_1px)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-linear-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <div className="absolute inset-0 border border-primary/20 rounded-3xl" />

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-linear-to-br from-primary/10 to-transparent p-1">
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-muted flex items-center justify-center">
                  <Image
                    src="/images/whatsapp-image-2026-01-28-at-11.png"
                    alt="Elite Surface Systems Equipment"
                    width={400}
                    height={400}
                    className="object-contain drop-shadow-[0_0_60px_rgba(30,113,205,0.3)] animate-[pulse_4s_ease-in-out_infinite]"
                  />
                </div>
              </div>

              {/* Floating Stats Cards */}
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className={`absolute ${
                    index === 0
                      ? "-top-4 -right-4"
                      : index === 1
                      ? "-bottom-4 -left-4"
                      : "bottom-1/4 -right-8"
                  } bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-4 transition-all duration-500 hover:scale-105 hover:border-primary/50 shadow-lg`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-(family-name:--font-orbitron) text-xl font-bold text-foreground">
                        {item.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              About Us
            </span>

            <h2 className="font-(family-name:--font-orbitron) text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="text-balance">
                The Future of{" "}
                <span className="text-primary">Surface Cleaning</span>
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Elite Surface Systems, we combine cutting-edge technology with
              years of expertise to deliver unmatched pressure washing results.
              Our team is committed to transforming your property while protecting
              the environment.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="px-6 py-4 rounded-2xl bg-linear-to-br from-primary/20 to-transparent border border-primary/30">
                <div className="text-sm text-foreground/60 mb-1">Ready to start?</div>
                <div className="font-(family-name:--font-orbitron) text-xl font-bold text-foreground">
                  Call (123) 456-7890
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
