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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { triggerSingleConfetti } from "@/lib/confetti"

const services = [
  {
    icon: Home,
    title: "House Washing",
    image: "/images/services/house-washing.png",
    description:
      "Restore your home's exterior to its original beauty with our gentle yet effective soft wash technology. We remove dirt, mold, mildew, and algae safely.",
    features: ["Safe for all siding types", "Increases curb appeal", "Eco-friendly solutions", "Long-lasting results"],
    detailedDescription: "Our house washing service utilizes a soft washing technique that is safe for all types of siding, including vinyl, stucco, brick, and wood. Unlike high-pressure washing which can damage surfaces, our low-pressure method combined with specialized cleaning solutions effectively kills organic growth like mold and algae at the root."
  },
  {
    icon: Building2,
    title: "Commercial",
    image: "/images/services/commercial.jpg",
    description:
      "Keep your business looking professional with our commercial-grade pressure washing services. We handle storefronts, office buildings, and industrial spaces.",
    features: ["Storefronts & Entrances", "Graffiti Removal", "Parking Areas", "Flexible Scheduling"],
    detailedDescription: "First impressions matter. Our commercial pressure washing services ensure your business property looks its best for clients and customers. We offer flexible scheduling to minimize disruption to your operations and have the capacity to handle large-scale projects including multi-story buildings and expansive parking lots."
  },
  {
    icon: Car,
    title: "Driveway Cleaning",
    image: "/images/services/driveway.jpg",
    description:
      "Remove oil stains, dirt, and grime from your driveway for a fresh, clean appearance. We clean concrete, pavers, and asphalt.",
    features: ["Oil stain removal", "Tire mark removal", "Weed prevention", "Sealing options"],
    detailedDescription: "Your driveway is often the first thing people see. Our deep cleaning process removes years of accumulated dirt, oil stains, and tire marks. We use commercial-grade surface cleaners that provide a uniform clean without the 'zebra stripes' often left by consumer pressure washers."
  },
  {
    icon: Fence,
    title: "Fence Restoration",
    image: "/images/services/fence-restoration.png",
    description:
      "Bring your fence back to life with our specialized cleaning and restoration techniques. We clean wood, vinyl, and metal fencing.",
    features: ["Wood restoration", "Vinyl cleaning", "Mold removal", "Stain prevetion"],
    detailedDescription: "Don't replace your gray, weathered fence—restore it! Our fence cleaning services can strip away years of weathering, gray wood fibers, and organic growth, revealing the beautiful wood underneath. We also specialized in safely cleaning vinyl and metal fences without causing damage."
  },
  {
    icon: Droplets,
    title: "Roof Cleaning",
    image: "/images/services/house-washing.png", // Reusing image as placeholder/best fit
    description:
      "Safely remove algae, moss, and debris from your roof without damaging shingles. Extends the life of your roof.",
    features: ["Soft wash method", "Moss removal", "Black streak removal", "Shingle protection"],
    detailedDescription: "Those black streaks on your roof aren't just dirt—they're algae feeding on your shingles. Our specialized roof soft washing service safely neutralizes and removes these organisms without using high pressure that could void your warranty or damage your roof's granular coating."
  },
  {
    icon: Trees,
    title: "Patio & Deck",
    image: "/images/services/driveway.jpg", // Reusing image as placeholder/best fit
    description:
      "Transform your outdoor living spaces into pristine entertaining areas. We clean wood decks, pool decks, and stone patios.",
    features: ["Slip hazard removal", "Pool deck cleaning", "Stone restoration", "Wood brightening"],
    detailedDescription: "Make your outdoor living space inviting again. Our patio and deck cleaning services remove slippery algae, dirt, and food stains. Whether you have a delicate wood deck, composite material, or natural stone patio, we adjust our pressure and cleaning agents to safe, effective levels."
  },
]

export default function ServicesSection() {
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
            Our Services
          </span>
          <h2 className="font-(family-name:--font-orbitron) text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">
            <span className="text-balance">Premium Cleaning Solutions</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
            We offer a comprehensive range of pressure washing services designed
            to meet all your exterior cleaning needs.
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
                      Most Popular
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-4 right-4 z-20 bg-[#1e71cd] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      Commercial Grade
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
                       <div className="text-white/60 text-xs font-semibold mb-3 tracking-widest uppercase"> Professional Restoration</div>

                       {/* Reveal on hover */}
                       <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                         <div className="overflow-hidden">
                           <p className="text-white/80 leading-relaxed text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                             {service.description}
                           </p>
                           <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                             GET FREE ESTIMATE <ArrowRight className="w-4 h-4 ml-1" />
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border sm:rounded-3xl">
                <div className="grid md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                   {/* Large Image Side */}
                   <div className="relative h-[300px] md:h-full min-h-[400px]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/60 to-transparent" />
                      
                      {/* Close button on mobile image */}
                      <DialogClose className="absolute top-4 right-4 md:hidden w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm">
                        <X className="w-4 h-4" />
                      </DialogClose>
                   </div>

                   {/* Content Side */}
                   <div className="p-8 md:p-10 flex flex-col justify-center bg-card">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      
                      <DialogHeader className="mb-4">
                        <DialogTitle className="font-(family-name:--font-orbitron) text-3xl font-bold text-foreground text-left">
                          {service.title}
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {service.detailedDescription}
                      </p>

                      <div className="space-y-6">
                        <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm">Key Features</h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-10 pt-6 border-t border-border">
                        <DialogClose asChild>
                           <Button 
                             onClick={triggerSingleConfetti}
                             className="w-full bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white rounded-xl py-6 text-lg"
                           >
                             Book This Service
                           </Button>
                        </DialogClose>
                      </div>
                   </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
