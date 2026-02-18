"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function TestimonialsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const testimonials = t("testimonials.items")

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
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-secondary/30 overflow-hidden transition-colors duration-300"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {t("testimonials.title")}
          </span>
          <h2 className="font-(family-name:--font-orbitron) text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-balance">{t("testimonials.subtitle")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {t("testimonials.description")}
          </p>

          {/* Aggregate Rating & Trust Indicators */}
          <div className="mt-10 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-lg shadow-black/5 transition-transform hover:scale-105 cursor-default">
               <img src="https://localimpact.com/assets/global/images/source-logos/google/h120w120.png" alt="Google" className="h-6 w-6" />
               <span className="font-medium text-gray-500 text-sm pl-2 border-l border-gray-300 left-2">{t("testimonials.reviews")}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 fill-yellow-400 text-yellow-500 drop-shadow-sm"
                  />
                ))}
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-start">
                <div className="font-(family-name:--font-orbitron) text-2xl font-black text-foreground">
                  5.0
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("testimonials.averageRating")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(testimonials) && testimonials.map((testimonial: any, index: number) => (
            <div
              key={testimonial.name}
              className={`group relative p-6 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card Header: Name & Google Logo */}
              <div className="flex justify-between items-start mb-3">
                <div className="font-bold text-lg text-foreground font-(family-name:--font-orbitron) tracking-wide">
                  {testimonial.name}
                </div>
                {/* Google G Logo */}
                <div className="shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-gray-100">
                  <img 
                    src="https://localimpact.com/assets/global/images/source-logos/google/h120w120.png" 
                    alt="Google" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Rating & Date */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" 
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-medium">{testimonial.date}</span>
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed text-sm">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
