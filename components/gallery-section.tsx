"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import WaterBlastEffect from "./water-blast-effect"
import { useLanguage } from "@/context/language-context"

function BeforeAfterCard({
  item,
  isVisible,
  index,
}: {
  item: any
  isVisible: boolean
  index: number
}) {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden bg-card border border-border transition-all duration-700 shadow-sm hover:shadow-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Before/After Container */}
      <div
        ref={containerRef}
        className="relative aspect-3/2 cursor-ew-resize select-none overflow-hidden"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={item.after}
            alt={`${item.title} ${t("services.after")}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Before Image (Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={item.before}
            alt={`${item.title} ${t("services.before")}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <ArrowLeft className="w-3 h-3 text-black -ml-0.5" />
            <ArrowRight className="w-3 h-3 text-black -mr-0.5" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-wider z-20">
          {t("services.before")}
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-wider z-20">
          {t("services.after")}
        </div>
      </div>

      {/* Info */}
      <div className="p-8">
        <h3 className="font-(family-name:--font-orbitron) text-2xl font-bold text-foreground mb-2">
          {item.title}
        </h3>
        <p className="text-base text-muted-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {item.location}
        </p>
      </div>
    </div>
  )
}

export default function GallerySection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const galleryItems = t("gallery.items")
  const beforeAfterImages = [
    { 
      id: 1,
      title: galleryItems[0].title,
      location: "Miami, FL",
      before: "/images/gallery/driveway-before.jpg",
      after: "/images/gallery/driveway-after.jpg",
    },
    {
      id: 2,
      title: galleryItems[1].title,
      location: "Fort Lauderdale, FL",
      before: "/images/gallery/deck-before.jpg",
      after: "/images/gallery/deck-after.jpg",
    },
    {
      id: 3,
      title: galleryItems[2].title,
      location: "Palm Beach, FL",
      before: "/Pressure-Washing-Company-Service-Near-Me-in-Citrus-County-8.jpg",
      after: "/Pressure-Washing-Company-Service-Near-Me-in-Citrus-County-7.jpg",
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
      id="gallery"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-secondary/20 overflow-hidden transition-colors duration-300"
    >
      <div className="relative max-w-(--breakpoint-2xl) mx-auto px-4 sm:px-6 lg:px-8">
        <WaterBlastEffect />
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {t("gallery.title")}
          </span>
          <h2 className="font-(family-name:--font-orbitron) text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            <span className="text-balance">{t("gallery.subtitle")}</span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed mb-8">
            {t("gallery.description")}
          </p>

          {/* Decorative Wavy Line */}
          <div className="flex justify-center mb-16">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10C10 10 10 2 20 2C30 2 30 18 40 18C50 18 50 2 60 2C70 2 70 18 80 18C90 18 90 2 100 2C110 2 110 10 120 10" stroke="#1e71cd" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {beforeAfterImages.map((item, index) => (
            <BeforeAfterCard
              key={item.id}
              item={item}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground mb-4">
            {t("gallery.ready")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300 group"
          >
            {t("gallery.cta")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
