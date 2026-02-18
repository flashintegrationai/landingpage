"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  Home,
  Building2,
  Car,
  Fence,
  Droplets,
  Trees,
  ArrowRight,
  CheckCircle2,
  X
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { triggerSingleConfetti } from "@/lib/confetti"
import { useQuoteModal } from "./quote-modal"
import { useLanguage } from "@/context/language-context"

export default function ServicesSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { openModal } = useQuoteModal()

  const services = [
    {
      icon: Home,
      title: t("services.items.houseWashing.title"),
      image: "/Gemini_Generated_Image_g2m4vcg2m4vcg2m4.png",
      description: t("services.items.houseWashing.description"),
      features: t("services.items.houseWashing.features"),
      detailedDescription: t("services.items.houseWashing.detailedDescription")
    },
    {
      icon: Building2,
      title: t("services.items.commercial.title"),
      image: "/Gemini_Generated_Image_2ep2e2ep2e2ep2e2.png",
      description: t("services.items.commercial.description"),
      features: t("services.items.commercial.features"),
      detailedDescription: t("services.items.commercial.detailedDescription")
    },
    {
      icon: Car,
      title: t("services.items.driveway.title"),
      image: "/Pressure-Washing-Company-Service-Near-Me-in-Citrus-County-7.jpg",
      beforeImage: "/Pressure-Washing-Company-Service-Near-Me-in-Citrus-County-8.jpg",
      afterImage: "/Pressure-Washing-Company-Service-Near-Me-in-Citrus-County-7.jpg",
      description: t("services.items.driveway.description"),
      features: t("services.items.driveway.features"),
      detailedDescription: t("services.items.driveway.detailedDescription")
    },
    {
      icon: Fence,
      title: t("services.items.fence.title"),
      image: "/images/services/fence-restoration.png",
      description: t("services.items.fence.description"),
      features: t("services.items.fence.features"),
      detailedDescription: t("services.items.fence.detailedDescription")
    },
    {
      icon: Droplets,
      title: t("services.items.roof.title"),
      image: "/Gemini_Generated_Image_31xr5g31xr5g31xr.png", 
      description: t("services.items.roof.description"),
      features: t("services.items.roof.features"),
      detailedDescription: t("services.items.roof.detailedDescription")
    },
    {
      icon: Trees,
      title: t("services.items.patio.title"),
      image: "/Gemini_Generated_Image_3fxd073fxd073fxd.png", 
      description: t("services.items.patio.description"),
      features: t("services.items.patio.features"),
      detailedDescription: t("services.items.patio.detailedDescription")
    },
  ]

  const handleQuoteClick = () => {
    triggerSingleConfetti()
    setTimeout(() => {
      openModal()
    }, 1500)
  }

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
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-background transition-colors duration-300"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {t("services.ourServices")}
          </span>
          <h2 className="font-(family-name:--font-orbitron) text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">
            <span className="text-balance">{t("services.premiumSolutions")}</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
            {t("services.comprehensiveRange")}
          </p>

          {/* Decorative Wavy Line */}
          <div className="flex justify-center mb-16">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10C10 10 10 2 20 2C30 2 30 18 40 18C50 18 50 2 60 2C70 2 70 18 80 18C90 18 90 2 100 2C110 2 110 10 120 10" stroke="#1e71cd" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Dialog key={service.title}>
              <DialogTrigger asChild>
                <div
                  className={`group relative h-[400px] w-full overflow-hidden rounded-3xl cursor-pointer bg-muted transition-all duration-500 shadow-md hover:shadow-2xl ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Badge for Commercial Appeal */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 z-20 bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-pulse uppercase tracking-wider">
                      {t("services.mostPopular")}
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-4 right-4 z-20 bg-[#1e71cd] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      {t("services.commercialGrade")}
                    </div>
                  )}

                  {/* Background Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-500 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/30" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/95 backdrop-blur-sm flex items-center justify-center mb-4 transform translate-y-0 transition-all duration-500 group-hover:-translate-y-2 border border-white/20">
                       <service.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Text Content */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <h3 className="font-(family-name:--font-orbitron) text-2xl font-bold mb-2 uppercase tracking-tight">
                         {service.title}
                       </h3>
                       
                       {/* Price teaser or Benefit */}
                       <div className="text-white/60 text-xs font-semibold mb-3 tracking-widest uppercase">{t("services.professionalRestoration")}</div>

                       {/* Reveal on hover */}
                       <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                         <div className="overflow-hidden">
                           <p className="text-white/80 leading-relaxed text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                             {service.description}
                           </p>
                           <div 
                             onClick={(e) => {
                               e.stopPropagation()
                               handleQuoteClick()
                             }}
                             className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"
                           >
                             {t("services.getFreeEstimate")} <ArrowRight className="w-4 h-4 ml-1" />
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-[100vw] sm:max-w-5xl w-full h-[80vh] p-0 overflow-hidden bg-black border-none sm:rounded-4xl shadow-2xl transition-all duration-500">
                <ServiceModalContent service={service} handleQuoteClick={handleQuoteClick} t={t} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceModalContent({ service, handleQuoteClick, t }: { service: any, handleQuoteClick: () => void, t: any }) {
  const [showInfo, setShowInfo] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isBeforeAfter = service.beforeImage && service.afterImage;

  return (
    <div className="relative w-full h-full bg-black select-none">
      {/* FULL SCREEN HERO IMAGE */}
      <div className="absolute inset-0 z-0">
        {isBeforeAfter ? (
          <div className="relative w-full h-full">
            {/* After Image (Background) */}
            <Image
              src={service.afterImage}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Tag for After */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 select-none z-10 pointer-events-none">
              {t("services.after")}
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <Image
                src={service.beforeImage}
                alt={`${service.title} before`}
                fill
                className="object-cover object-left"
                priority
              />
               {/* Tag for Before */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 select-none z-10 pointer-events-none">
                {t("services.before")}
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute inset-y-0"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -ml-0.5 w-1 bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-col-resize">
                 <div className="absolute top-1/2 left-1/2 -ml-5 -mt-5 w-10 h-10 rounded-full shadow-2xl border-4 border-black/10 flex items-center justify-center backdrop-blur-sm bg-white/90">
                    <div className="flex gap-1">
                      <ArrowRight className="w-3 h-3 text-black rotate-180" />
                      <ArrowRight className="w-3 h-3 text-black" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Range Input Trigger */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-20"
              aria-label="Compare before and after images"
            />
          </div>
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Dynamic Dark Gradient Protection */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* FLOATING BRANDING (Top Left) */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-4 translate-y-0 animate-in fade-in slide-in-from-left-4 duration-700">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-2xl">
          <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <div>
          <DialogTitle className="font-(family-name:--font-orbitron) text-xl md:text-3xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
            {service.title}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-8 h-1 bg-[#1e71cd] rounded-full" />
            <DialogDescription className="text-white/60 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
              Elite Surface Systems Professional Restoration
            </DialogDescription>
          </div>
        </div>
      </div>

      {/* CONTROLS (Top Right) */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
        <DialogClose className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/40 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-2xl border border-white/10 transition-all duration-300 group shadow-2xl">
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </DialogClose>
      </div>

      {/* FLOATING INFO PANEL (Bottom Left) */}
      <div className={`absolute bottom-8 left-8 right-8 md:right-auto md:w-[450px] z-30 transition-all duration-700 ease-out ${
        showInfo ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"
      }`}>
        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-4xl shadow-3xl">
          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="font-bold text-[#1e71cd] uppercase tracking-[0.3em] text-[10px]">{t("services.serviceIntelligence")}</h4>
              <p className="text-white/90 leading-relaxed text-sm md:text-base font-medium">
                {service.detailedDescription}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-[#1e71cd] uppercase tracking-[0.3em] text-[10px]">{t("services.technicalAdvantages")}</h4>
              <ul className="grid grid-cols-1 gap-3">
                {service.features.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3 text-white/80 text-sm font-medium">
                    <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1e71cd]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <DialogClose asChild>
              <Button 
                onClick={handleQuoteClick}
                className="w-full bg-[#1e71cd] hover:bg-primary/90 text-white rounded-2xl py-7 text-base font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#1e71cd]/30 active:scale-[0.98] transition-all"
              >
                {t("services.instantQuote")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>

      {/* INFO TOGGLE & CTA (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-40 flex flex-col items-end gap-4 md:flex-row md:items-center">
        {!showInfo && (
           <Button 
             onClick={handleQuoteClick}
             className="hidden md:flex bg-[#1e71cd] hover:bg-primary/90 text-white rounded-2xl px-8 py-7 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#1e71cd]/40 active:scale-[0.98] transition-all"
           >
             {t("services.bookServiceNow")}
           </Button>
        )}
        
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-3xl transition-all duration-500 group ${
            showInfo ? "bg-white text-black rotate-0" : "bg-[#1e71cd] text-white hover:scale-110"
          }`}
        >
          {showInfo ? <X className="w-8 h-8" /> : (
            <div className="flex flex-col items-center">
              <Droplets className="w-7 h-7 md:w-9 md:h-9 animate-pulse" />
              <span className="text-[8px] font-black mt-1 uppercase tracking-tighter">{t("services.details")}</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
