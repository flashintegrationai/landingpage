"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Leaf, 
  Zap, 
  Award, 
  ChevronRight, 
  Droplets,
  CheckCircle2,
  Sparkles,
  Shield,
  Target,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"

const BackgroundEffects = dynamic(
  () => import("@/components/background-effects"),
  { ssr: false }
)

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Navbar />
      
      {/* Background Layer */}
      <div
        className="fixed inset-0 z-0 opacity-100 dark:opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, var(--background) 40%, #1e71cd 100%)",
        }}
      />
      <div className="fixed inset-0 z-5 pointer-events-none">
        <BackgroundEffects showWaves={false} />
      </div>

      <div className="relative z-10 pt-32">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">About Our Mission</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-hidden px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">The Elite Standard</span>
              </div>

              <h1 className="font-(family-name:--font-orbitron) text-4xl md:text-6xl lg:text-7xl font-bold text-foreground uppercase tracking-tighter mb-8 leading-tight">
                Not Just Cleaning.<br/>
                <span className="bg-linear-to-r from-primary via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent italic">Complete Restoration.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl italic font-medium">
                At Elite Surface Systems, we believe your property is an investment that deserves professional-grade preservation, not just a temporary wash.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/ai-estimate">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black px-8 py-7 rounded-2xl h-auto text-lg transition-all duration-300 shadow-[0_15px_30px_rgba(30,113,205,0.2)]">
                    TRY AI ESTIMATE <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/#services">
                  <Button variant="outline" className="h-auto py-7 px-8 rounded-2xl border-border hover:bg-accent text-lg font-bold uppercase tracking-widest bg-background/50 backdrop-blur-sm">
                    OUR CAPABILITIES
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square md:aspect-4/5 rounded-[2.5rem] overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-2xl group">
                <Image 
                  src="/Gemini_Generated_Image_u0iv5pu0iv5pu0iv.png" 
                  alt="Elite Industrial Equipment" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-black text-foreground uppercase tracking-tight text-lg">Industrial Precision</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Advanced Soft-Washing Tech</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 p-6 bg-card border border-border rounded-2xl shadow-2xl z-20">
                <div className="text-center">
                  <span className="font-(family-name:--font-orbitron) text-4xl font-black text-primary block">10+</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Years of Mastery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 bg-card/30 backdrop-blur-md border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The Elite Philosophy</span>
              <h2 className="font-(family-name:--font-orbitron) text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-6">
                Redefining <span className="text-primary italic">Clean</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                We combine commercial-grade technology with personalized attention. While others simply spray, we diagnose and treat every square inch of your property.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "Asset Protection", desc: "Our SoftWash chemical treatments kill organic growth at the root without damaging delicate surfaces." },
                { icon: Sparkles, title: "Visual Excellence", desc: "We don't just remove dirt—we bring back the showroom-ready finish your property had on day one." },
                { icon: Droplets, title: "Water Solutions", desc: "Eco-friendly, biodegradable detergents that are safe for your family, pets, and South Florida landscapes." }
              ].map((feature, i) => (
                <div key={i} className="bg-background/40 p-10 rounded-3xl border border-border hover:border-primary/40 hover:shadow-[0_20px_40px_rgba(30,113,205,0.05)] transition-all duration-500 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-(family-name:--font-orbitron) text-xl font-black text-foreground mb-4 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secondary Visual Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="lg:order-2">
                <h2 className="font-(family-name:--font-orbitron) text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-8 leading-tight">
                  High-Tech <span className="text-primary italic">Execution</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our team brings industrial standards to residential spaces. We use high-precision tools and custom-blended detergents designed specifically for Florida's unique environmental challenges.
                </p>
                <div className="space-y-4">
                  {[
                    "Deep Neural Pulse Cleaning",
                    "UV Surface Protection Layers",
                    "Advanced Structural Preservation",
                    "Biodegradable Deep-Treatment"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-card/50 rounded-xl border border-border">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-xs font-black uppercase tracking-widest text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:order-1">
                <div className="relative aspect-square md:aspect-4/3 rounded-4xl overflow-hidden border border-border shadow-2xl">
                  <Image 
                    src="/Gemini_Generated_Image_6ftzr16ftzr16ftz.png" 
                    alt="Elite Team in Action" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 relative overflow-hidden text-center px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest"
            >
              <Zap className="w-4 h-4 fill-primary" /> The Elite Experience Awaits
            </motion.div>
            
            <h2 className="font-(family-name:--font-orbitron) text-4xl md:text-7xl font-black text-foreground uppercase tracking-tighter mb-10 leading-none">
              Restore Your <br/><span className="bg-linear-to-r from-primary via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">Legacy Today.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/ai-estimate">
                <Button size="lg" className="h-auto py-8 px-12 bg-primary text-white font-black rounded-2xl text-xl shadow-[0_20px_40px_rgba(30,113,205,0.3)] hover:scale-105 transition-transform group">
                  BOOK FREE ESTIMATE <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
