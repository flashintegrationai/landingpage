"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star, Home, ChevronRight, Award, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import QuoteModal from "@/components/quote-modal"
import LegalModals from "@/components/legal-modals"
import { useLanguage } from "@/context/language-context"

const testimonialsData = [
  {
    name: "Roxanne Mix",
    dateKey: "jan30",
    contentKey: "roxanne",
    rating: 5,
  },
  {
    name: "Marianne Molleur",
    dateKey: "jan29",
    contentKey: "marianne",
    rating: 5,
  },
  {
    name: "Blanca Blanco",
    dateKey: "jan28",
    contentKey: "blanca",
    rating: 5,
  },
  {
    name: "G. D.",
    dateKey: "jan20",
    contentKey: "gd",
    rating: 5,
  },
  {
    name: "Maria Pravato",
    dateKey: "jan15",
    contentKey: "maria",
    rating: 5,
  },
  {
    name: "Chris Matinides",
    dateKey: "jan7",
    contentKey: "chris",
    rating: 5,
  },
]

export default function TestimonialsPage() {
  const { t } = useLanguage()
  
  // Mapping the local testimonials data with translated content
  const translatedTestimonials = testimonialsData.map((item, index) => {
    // We already have testimonials in the common section of translations.ts
    // Let's reuse them or use the same indices
    const commonItems = t("testimonials.items")
    return {
      ...item,
      content: commonItems[index]?.content || "",
      date: commonItems[index]?.date || ""
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <FloatingContact />
      <QuoteModal />
      <LegalModals />

      {/* Elegant Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image src="/logoremovebj.png" width={100} height={100} alt="Elite Surface Systems" className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-(family-name:--font-orbitron) text-xl font-black text-foreground uppercase tracking-tight">Elite Surface</span>
                <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em]">{t("testimonialsPage.header.successStories")}</span>
              </div>
            </Link>

            <Link href="/">
              <Button variant="ghost" className="gap-2 font-bold uppercase tracking-widest text-xs">
                <Home className="w-4 h-4" /> {t("testimonialsPage.header.backHome")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-border/30 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">{t("testimonialsPage.breadcrumbs.home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-bold">{t("testimonialsPage.breadcrumbs.testimonials")}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,113,205,0.08),transparent_70%)]" />
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20 mb-8"
          >
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">{t("testimonialsPage.hero.badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-(family-name:--font-orbitron) text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter mb-8"
          >
            {t("testimonialsPage.hero.title")} <span className="text-primary italic">{t("testimonialsPage.hero.titleItalic")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
          >
            {t("testimonialsPage.hero.description")}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            <div className="p-8 bg-card border border-border rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary fill-primary" />
              </div>
              <div className="font-(family-name:--font-orbitron) text-4xl font-black text-foreground mb-2">5.0</div>
              <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{t("testimonialsPage.stats.avgRating")}</div>
            </div>

            <div className="p-8 bg-card border border-border rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <div className="font-(family-name:--font-orbitron) text-4xl font-black text-foreground mb-2">150+</div>
              <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{t("testimonialsPage.stats.happyClients")}</div>
            </div>

            <div className="p-8 bg-card border border-border rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="font-(family-name:--font-orbitron) text-4xl font-black text-foreground mb-2">98%</div>
              <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{t("testimonialsPage.stats.satisfaction")}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="relative py-16 pb-64">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20"
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
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="max-w-3xl mx-auto p-12 md:p-16 bg-card border-2 border-primary/20 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 text-primary/5">
                <Award size={180} />
              </div>
              
              <div className="relative z-10">
                <h3 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-6">
                  {t("testimonialsPage.cta.ready")} <span className="text-primary italic">{t("testimonialsPage.cta.successStories")}</span>?
                </h3>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  {t("testimonialsPage.cta.description")}
                </p>
                <Link href="/">
                  <Button className="h-20 px-12 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30 text-balance">
                    {t("testimonialsPage.cta.getEstimate")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
