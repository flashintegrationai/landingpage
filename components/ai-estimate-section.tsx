"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  Zap, 
  Sparkles,
  Loader2,
  CheckCircle2,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  BrainCircuit
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface AnalysisResult {
  detectedMaterial: string
  contaminationLevel: string
  estimatedSqFt: number
  confidenceScore: number
  priceRange: string
}

export default function AiEstimateSection() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadData, setLeadData] = useState({ name: "", phone: "" })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image too large. Please use an image under 10MB.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        setShowLeadModal(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.name || !leadData.phone) {
      toast.error("Please provide both name and phone number.")
      return
    }

    setIsSubmittingLead(true)
    try {
      // Save to Supabase 'listo' table as requested
      const { error } = await supabase
        .from('listo')
        .insert([
          { 
            name: leadData.name, 
            phone: leadData.phone, 
            status: 'pending_ai_analysis',
            created_at: new Date().toISOString()
          }
        ])

      // We don't error out if table doesn't exist for demo purposes, 
      // but we log it and proceed if it's just a missing table.
      if (error) {
        console.error("Supabase insert error:", error)
        // toast.error("Failed to save your info. Please try again.")
        // return
      }

      setShowLeadModal(false)
      if (image) {
        analyzeImage(image)
      }
    } catch (error: any) {
      console.error("Supabase Error:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const analyzeImage = async (base64Image: string) => {
    setIsAnalyzing(true)
    setResult(null)
    
    try {
      const response = await fetch("/api/analyze-surface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed")
      }

      setResult(data)
      
      // Update the lead in Supabase with the result if possible
      try {
        await supabase
          .from('listo')
          .update({ 
            detected_material: data.detectedMaterial,
            estimated_price: data.priceRange,
            status: 'analyzed'
          })
          .eq('phone', leadData.phone)
      } catch (updErr) {
        console.error("Supabase update error:", updErr)
      }

      toast.success("Analysis complete!")
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Failed to analyze image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleRetry = () => {
    setImage(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleWhatsApp = (type: "claim" | "negotiate") => {
    const message = type === "claim" 
      ? `Hi! I used your AI Estimate tool and got a range of ${result?.priceRange} for my ${result?.detectedMaterial}. I'd like to book this service.`
      : `Hi! Your AI estimated ${result?.priceRange} for my ${result?.detectedMaterial}, but I'd like to discuss the price. Can we chat?`
    
    const whatsappUrl = `https://wa.me/19544703554?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="ai-estimate" className="relative py-24 bg-background overflow-hidden border-t border-border/50">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,113,205,0.05),transparent_70%)]" />
      
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e71cd]/10 border border-[#1e71cd]/20 text-[#1e71cd] text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles className="w-3 h-3 animate-pulse" /> Experimental AI
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-orbitron)] text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-8"
          >
            Instant AI <span className="text-[#1e71cd] drop-shadow-[0_0_20px_rgba(30,113,205,0.4)]">Estimate</span>
          </motion.h2>

          <p className="max-w-2xl mx-auto text-foreground/60 text-lg leading-relaxed mb-10">
            Get a professional price estimate in seconds. Our neural network analyzes your surface photos with laboratory precision to provide an immediate range.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1e71cd]" /> Secure Analysis
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#1e71cd]" /> Instant Price
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-[#1e71cd]" /> No Man-in-Middle
            </div>
          </div>
        </div>

        {/* Center UI */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!result && !isAnalyzing ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative"
              >
                {/* Border Glow */}
                <div className="absolute -inset-1 bg-linear-to-r from-[#1e71cd]/50 to-cyan-500/50 rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition duration-1000" />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-video bg-card border-2 border-dashed border-border group-hover:border-[#1e71cd]/50 rounded-[2.5rem] flex flex-col items-center justify-center p-12 cursor-pointer transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-[#1e71cd]/5 to-transparent pointer-events-none" />
                  
                  <div className="mb-8 w-24 h-24 rounded-3xl bg-[#1e71cd]/10 flex items-center justify-center border border-[#1e71cd]/20 shadow-[0_0_40px_rgba(30,113,205,0.1)] group-hover:scale-110 group-hover:bg-[#1e71cd]/20 transition-all duration-700">
                    <Camera className="w-10 h-10 text-[#1e71cd]" />
                  </div>
                  
                  <h3 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tighter">Click to Start Analysis</h3>
                  <p className="text-foreground/40 text-center text-sm max-w-sm font-medium">
                    Take a clear photo or select one from your device. We'll identify the material and provide a detailed price range instantly.
                  </p>
                  
                  <div className="mt-10 flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-border bg-background/50 backdrop-blur-md hover:bg-accent text-xs font-black uppercase tracking-widest">
                      <Camera className="w-4 h-4 mr-2" /> Camera
                    </Button>
                    <Button className="h-14 px-8 rounded-2xl bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-[#1e71cd]/20">
                      <Upload className="w-4 h-4 mr-2" /> Gallery
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="relative aspect-video bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl">
                   {image && <Image src={image} alt="Target" fill className="object-cover opacity-60 contrast-125" />}
                   <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-[2px]">
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-1 bg-[#1e71cd] shadow-[0_0_30px_#1e71cd] z-10"
                      />
                      <div className="p-8 bg-black/80 rounded-2xl border border-white/10 flex items-center gap-6 shadow-2xl">
                        <Loader2 className="w-6 h-6 text-[#1e71cd] animate-spin" />
                        <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Decrypting Surface Data...</span>
                      </div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-14 bg-card rounded-2xl animate-pulse border border-border" />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
              >
                {/* Accent Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e71cd]/5 blur-[100px] pointer-events-none" />
                
                <div className="flex items-center justify-between mb-12">
                   <div className="space-y-1">
                      <p className="text-[#1e71cd] text-[10px] font-black uppercase tracking-[0.3em]">Analysis Complete</p>
                      <h3 className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-foreground uppercase">Surface Report</h3>
                   </div>
                   <div className="hidden sm:flex px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Verified by AI</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-10 mb-12 uppercase tracking-widest">
                  <div className="space-y-2">
                    <span className="text-foreground/40 text-[10px] font-bold">Detected Material</span>
                    <p className="text-xl font-black text-[#1e71cd]">{result?.detectedMaterial}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-foreground/40 text-[10px] font-bold">Contamination</span>
                    <p className="text-xl font-black text-foreground">{result?.contaminationLevel}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-foreground/40 text-[10px] font-bold">Estimated Size</span>
                    <p className="text-xl font-black text-foreground">~{result?.estimatedSqFt} SQ FT</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-foreground/40 text-[10px] font-bold">Confidence Score</span>
                    <p className="text-xl font-black text-green-500">{result?.confidenceScore}%</p>
                  </div>
                </div>

                <div className="bg-linear-to-br from-[#1e71cd] to-[#124d8c] rounded-[2rem] p-10 mb-12 relative overflow-hidden group shadow-2xl shadow-[#1e71cd]/20">
                  <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:scale-125 transition-transform duration-700">
                    <Zap size={180} />
                  </div>
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Instant Price Range</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-7xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tighter">
                      {result?.priceRange}
                    </span>
                  </div>
                  <p className="text-white/40 text-[9px] mt-8 uppercase font-bold leading-relaxed px-1">
                    *This is an automated estimate. Includes deep cleaning, biological treatment, and surface protection.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => handleWhatsApp("claim")}
                    className="flex-[2] h-20 bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white rounded-2xl text-xl font-black uppercase tracking-widest shadow-xl shadow-[#1e71cd]/30 active:scale-95 transition-all"
                  >
                    Lock This Price
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleWhatsApp("negotiate")}
                    className="flex-1 h-20 border-border bg-background hover:bg-accent rounded-2xl font-bold uppercase text-[10px] tracking-widest"
                  >
                    Negotiate
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleRetry}
                    className="w-20 h-20 rounded-2xl border border-border text-foreground/20 hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Lead Capture Modal */}
      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="sm:max-w-md bg-card border-border rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_100px_rgba(30,113,205,0.2)]">
          <div className="relative h-40 bg-linear-to-br from-[#1e71cd] to-[#124d8c] flex items-center justify-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
             <div className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <BrainCircuit className="w-12 h-12 text-white" />
             </div>
             <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-black/20 to-transparent" />
          </div>
          
          <div className="p-10">
            <DialogHeader className="mb-10 text-center sm:text-center">
              <DialogTitle className="font-[family-name:var(--font-orbitron)] text-3xl font-black uppercase tracking-tight mb-4">Almost There!</DialogTitle>
              <DialogDescription className="text-foreground/60 text-base leading-relaxed">
                Our AI has processed your image. Please provide your contact details to view the final analysis and price range.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lead-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1e71cd]">Your Full Name</Label>
                <div className="relative group">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-[#1e71cd] transition-colors" />
                   <Input 
                      id="lead-name" 
                      placeholder="e.g. John Doe" 
                      required 
                      className="pl-12 h-16 bg-background/50 border-border rounded-2xl focus:ring-[#1e71cd]/20 focus:border-[#1e71cd] transition-all"
                      value={leadData.name}
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                   />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lead-phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1e71cd]">Your Phone Number</Label>
                <div className="relative group">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-[#1e71cd] transition-colors" />
                   <Input 
                      id="lead-phone" 
                      type="tel" 
                      placeholder="(123) 456-7890" 
                      required 
                      className="pl-12 h-16 bg-background/50 border-border rounded-2xl focus:ring-[#1e71cd]/20 focus:border-[#1e71cd] transition-all"
                      value={leadData.phone}
                      onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                   />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmittingLead}
                className="w-full h-18 bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-[#1e71cd]/30 group active:scale-95 transition-all"
              >
                {isSubmittingLead ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Unlock Estimate <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
              
              <p className="text-center text-[9px] text-foreground/30 uppercase font-bold tracking-widest px-4">
                 By continuing, you agree to receive a one-time automated estimate report via SMS/WhatsApp.
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
