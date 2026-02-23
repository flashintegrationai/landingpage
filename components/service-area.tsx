"use client"

import { useLanguage } from "@/context/language-context"
import { MapPin, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export default function ServiceArea() {
  const { t } = useLanguage()
  const cities = t("serviceArea.cities")

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
            <MapPin className="w-3 h-3" />
            {t("serviceArea.badge")}
          </div>
          <h2 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t("serviceArea.subtitle")}
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/60 leading-relaxed">
            {t("serviceArea.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {cities.map((city: string, idx: number) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                {city}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
