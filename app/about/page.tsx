"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Leaf, 
  Zap, 
  Users, 
  Award, 
  Home, 
  ChevronRight, 
  Droplets,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import QuoteModal from "@/components/quote-modal"
import LegalModals from "@/components/legal-modals"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
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
                <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em]">Premium Care</span>
              </div>
            </Link>

            <Link href="/">
              <Button variant="ghost" className="gap-2 font-bold uppercase tracking-widest text-xs">
                <Home className="w-4 h-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-border/30 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-bold">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(30,113,205,0.08),transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20 mb-8">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">Est. 2014</span>
            </div>

            <h1 className="font-(family-name:--font-orbitron) text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter mb-8 leading-tight">
              We Don't Just Clean. <br/>
              <span className="text-primary italic">We Restore.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Elite Surface Systems was founded on a simple principle: your property is your most valuable asset, and it deserves 
              more than just a quick wash. It deserves <span className="text-foreground font-bold">preservation</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/#contact">
                 <Button className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/#services">
                <Button variant="outline" className="h-16 px-10 rounded-2xl border-border hover:bg-accent text-lg font-bold uppercase tracking-widest">
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
             <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Elite Team at Work" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Float Card */}
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-card/90 backdrop-blur-xl border border-white/10 rounded-3xl">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                         <Leaf className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-lg">Eco-Friendly Solutions</div>
                        <div className="text-xs text-muted-foreground">Safe for pets & plants</div>
                      </div>
                   </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div className="bg-green-500 h-full w-full" />
                      </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
             <div className="absolute -bottom-5 -right-5 p-6 bg-background rounded-2xl shadow-xl border border-border flex flex-col items-center">
                <span className="font-(family-name:--font-orbitron) text-4xl font-black text-primary">10+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Years Experience</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 bg-muted/30">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">The Elite Difference</span>
               <h2 className="font-(family-name:--font-orbitron) text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-6">
                 More Than Just <span className="text-primary">Cleaning</span>
               </h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 We provide a comprehensive surface care solution. While others just blast away dirt (often damaging surfaces), 
                 we analyze, treat, and protect your investment.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Solution 1 */}
               <div className="bg-card p-10 rounded-[2.5rem] border border-border relative group overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                     <ShieldCheck size={120} />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-(family-name:--font-orbitron) text-2xl font-bold text-foreground mb-4">Protection First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our SoftWash technology removes contaminants without the high pressure that cracks concrete and destroys siding. We extend the life of your surfaces.
                  </p>
               </div>

               {/* Solution 2 */}
               <div className="bg-card p-10 rounded-[2.5rem] border border-border relative group overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Sparkles size={120} />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                     <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-(family-name:--font-orbitron) text-2xl font-bold text-foreground mb-4">Curb Appeal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A clean property isn't just nice to look at—it's valuable. We instantly boost your property's visual appeal and market value with a showroom finish.
                  </p>
               </div>

               {/* Solution 3 */}
               <div className="bg-card p-10 rounded-[2.5rem] border border-border relative group overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Droplets size={120} />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                     <Droplets className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-(family-name:--font-orbitron) text-2xl font-bold text-foreground mb-4">Deep Sanitization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Mold, algae, and mildew aren't just ugly; they are health hazards. Our specialized solutions kill 99.9% of organic growth at the root.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-24 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
               <div>
                  <h2 className="font-(family-name:--font-orbitron) text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-8">
                    See The <span className="text-primary">Results</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                     From commercial complexes to residential driveways, our portfolio speaks for itself. 
                     We bring industrial-grade standards to every job.
                  </p>
                  <ul className="space-y-4">
                     {["Advanced Surface Analysis", "Custom Chemical Blends", "Industrial Grade Sealants", "Pattern-Perfect Cleaning"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                           <CheckCircle2 className="w-5 h-5 text-primary" />
                           <span className="font-bold text-foreground">{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                     <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
                        <Image src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=600" alt="Roof Cleaning" fill className="object-cover" />
                     </div>
                     <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 bg-primary/10 flex items-center justify-center p-6 text-center">
                        <div>
                           <div className="font-(family-name:--font-orbitron) text-4xl font-black text-primary mb-2">2K+</div>
                           <div className="text-xs uppercase font-bold text-muted-foreground">Properties Restored</div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 bg-primary flex items-center justify-center p-6 text-center">
                        <div className="text-white">
                           <Award className="w-12 h-12 mx-auto mb-4" />
                           <div className="font-bold uppercase tracking-widest text-sm">#1 Rated Service</div>
                        </div>
                     </div>
                     <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
                        <Image src="https://images.unsplash.com/photo-1574359611681-375dbca74843?auto=format&fit=crop&q=80&w=600" alt="Driveway Cleaning" fill className="object-cover" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="pt-24 pb-64 bg-card border-t border-primary/20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-8 animate-bounce">
            <Zap className="w-6 h-6 text-primary fill-primary" />
            <span className="font-bold text-primary uppercase tracking-widest">Ready for the Elite Standard?</span>
          </div>
          
          <h2 className="font-(family-name:--font-orbitron) text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-8">
            Transform Your <br/><span className="text-primary">Property Today</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of satisfied clients who have chosen Elite Surface Systems for their property care.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
               size="lg" 
               className="h-20 px-12 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group"
            >
              Get Free Quote <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Link href="/ai-estimate">
               <Button 
                  size="lg" 
                  variant="outline"
                  className="h-20 px-12 rounded-2xl border-2 border-primary/20 hover:bg-primary/5 text-lg font-bold uppercase tracking-widest group"
               >
                 <Sparkles className="mr-3 w-5 h-5 text-primary group-hover:animate-spin" /> Try AI Estimate
               </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
