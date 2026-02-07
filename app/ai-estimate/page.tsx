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
  BrainCircuit,
  Target,
  Maximize2,
  ShieldAlert,
  Clock,
  DollarSign,
  Home,
  ChevronRight,
  Bot
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface AnalysisResult {
  detectedMaterial: string
  contaminationLevel: string
  estimatedSqFt: number
  confidenceScore: number
  priceRange: string
}

export default function AiEstimatePage() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [leadData, setLeadData] = useState({ name: "", phone: "" })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [activeStep, setActiveStep] = useState<"idle" | "form" | "analyzing" | "result">("idle")
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
        setActiveStep("form")
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
      const { data: leadRecord, error } = await supabase
        .from('leads')
        .insert([
          { 
            full_name: leadData.name, 
            phone_number: leadData.phone, 
            source: 'ai_estimator',
            status: 'new',
            notes: `AI Analysis started for image.`
          }
        ])
        .select()

      if (error) console.error("Supabase insert error:", error)

      setActiveStep("analyzing")
      if (image) analyzeImage(image, leadRecord?.[0]?.id)
    } catch (error: any) {
      console.error(error)
      setActiveStep("analyzing")
      if (image) analyzeImage(image)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const analyzeImage = async (base64Image: string, leadId?: string) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-surface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Analysis failed")

      setResult(data)
      setActiveStep("result")
      
      if (leadId) {
        await supabase
          .from('leads')
          .update({ 
            notes: `Material: ${data.detectedMaterial}, Price: ${data.priceRange}, Area: ${data.estimatedSqFt}sqft.`,
            status: 'analyzed'
          })
          .eq('id', leadId)
      }
      toast.success("Analysis complete!")
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Failed to analyze image. Please try again.")
      setActiveStep("idle")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleRetry = () => {
    setImage(null)
    setResult(null)
    setActiveStep("idle")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleWhatsApp = () => {
    const message = `Hi! I used your AI Estimate tool and got a range of ${result?.priceRange} for my ${result?.detectedMaterial}. I'd like to book this service.`
    const whatsappUrl = `https://wa.me/19544703554?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-linear-to-br from-[#1e71cd] via-[#0a2e5c] to-black z-0 opacity-80" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-20 z-0 pointer-events-none" />
      
      {/* Floating Orbs - Ambient Effect */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 z-0 animate-pulse delay-1000" />

      {/* Content Wrapper */}
      <div className="relative z-10 text-white">
        
        {/* Transparent Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10">
                  <Image src="/logoremovebj.png"  width="100" height="100" alt="Elite Surface Systems" className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-(family-name:--font-orbitron) text-lg font-black text-white uppercase tracking-tight">Elite Surface</span>
                  <span className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-[0.3em]">AI Lab</span>
                </div>
              </Link>
  
              <Link href="/">
                <Button variant="ghost" className="gap-2 font-bold uppercase tracking-widest text-xs text-white/70 hover:text-white hover:bg-white/10">
                  <Home className="w-4 h-4" /> Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>
  
        {/* Breadcrumbs */}
        <div className="border-b border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-2 text-xs text-white/50 font-medium uppercase tracking-wider">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">AI Surface Estimate</span>
            </div>
          </div>
        </div>
  
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 fill-yellow-400" />
              <span className="text-xs font-black uppercase tracking-widest">AI-Powered Tech v2.0</span>
            </motion.div>
  
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-(family-name:--font-orbitron) text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 uppercase tracking-tighter mb-6 drop-shadow-2xl"
            >
              Instant <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-400">Analysis</span>
            </motion.h1>
  
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed mb-12"
            >
              Upload a photo. Get a price. It's that simple.
            </motion.p>
        </section>
  
        {/* Interactive Main Area */}
        <section className="relative pb-32 px-4 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {activeStep === "idle" && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  className="group relative"
                >
                  {/* Glassmorphism Card */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-8 md:p-12 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl overflow-hidden group/card"
                  >
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                    
                    {/* Floating Centerpiece */}
                    <div className="relative mb-8 z-10">
                        <motion.div 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="w-32 h-32 md:w-40 md:h-40 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl relative"
                        >
                            <Bot className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            
                            {/* "AI Powered" Badge */}
                            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-[10px] md:text-xs font-black px-3 py-1.5 rounded-lg shadow-lg rotate-12 uppercase tracking-wide border-2 border-black/10">
                              AI Powered
                            </div>
                        </motion.div>
                        
                        {/* Glow under element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/40 rounded-full blur-3xl -z-10 group-hover/card:bg-primary/60 transition-colors duration-500" />
                    </div>
                    
                    <h3 className="relative z-10 font-(family-name:--font-orbitron) text-2xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight text-center">
                      Upload Surface Photo
                    </h3>
                    <p className="relative z-10 text-white/60 text-sm md:text-base font-medium max-w-md text-center mb-8">
                      Tap anywhere to scan your driveway, roof, or exterior. 
                      <strong className="text-white block mt-1">Instant Quote. No waiting.</strong>
                    </p>
                    
                    <div className="relative z-10 flex gap-4">
                        <Button className="h-14 px-8 bg-primary hover:bg-primary/80 text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/30">
                           <Upload className="w-5 h-5 mr-2" /> Select Image
                        </Button>
                    </div>
                  </div>
                </motion.div>
              )}
  
              {activeStep === "form" && (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
                >
                  <div className="text-center mb-10 text-white">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 font-bold text-[10px] mb-6 uppercase tracking-widest border border-green-500/20">
                        <ShieldCheck size={14} /> Secure Upload
                     </div>
                     <h3 className="font-(family-name:--font-orbitron) text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter"> almost <span className="text-primary">done</span></h3>
                     <p className="text-white/50 text-sm md:text-base">We need these details to send your AI report.</p>
                  </div>
  
                  <form onSubmit={handleLeadSubmit} className="space-y-6 max-w-md mx-auto relative z-10">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
                        <Input 
                          placeholder="Name" 
                          required
                          className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all font-medium"
                          value={leadData.name}
                          onChange={e => setLeadData({...leadData, name: e.target.value})}
                        />
                      </div>
                    </div>
  
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Phone Number</Label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
                        <Input 
                          type="tel"
                          placeholder="Phone" 
                          required
                          className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all font-medium"
                          value={leadData.phone}
                          onChange={e => setLeadData({...leadData, phone: e.target.value})}
                        />
                      </div>
                    </div>
  
                    <Button 
                      type="submit" 
                      disabled={isSubmittingLead}
                      className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-xl text-lg font-black uppercase tracking-widest shadow-xl shadow-white/10 mt-4"
                    >
                      {isSubmittingLead ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (
                        <span className="flex items-center justify-center gap-2">
                          GET ESTIMATE <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {activeStep === "analyzing" && (
                <div className="relative aspect-video bg-black/60 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center">
                  {/* Scanning Line */}
                  <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_50px_rgba(30,113,205,0.8)] z-20"
                  />
                  
                  {image && <Image src={image} alt="Processing" fill className="object-cover opacity-30 blur-sm" />}
                  
                  <div className="relative z-30 flex flex-col items-center gap-8">
                     <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <BrainCircuit className="w-16 h-16 text-primary animate-pulse relative z-10" />
                     </div>
                     <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-widest">Scanning Surface</h3>
                        <p className="text-white/50 text-xs uppercase tracking-[0.2em] animate-pulse">Analyzing Neural Patterns...</p>
                     </div>
                  </div>
                </div>
              )}
  
              {activeStep === "result" && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Result Card */}
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
                      <Zap size={200} />
                    </div>
  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                      
                      {/* Left: Image & Stats */}
                      <div className="space-y-6">
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-lg group">
                          {image && <Image src={image} alt="Analyzed" fill className="object-cover" />}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                            <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-0.5">Confidence</div>
                            <div className="text-white font-bold text-sm flex items-center gap-2">
                               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> {result?.confidenceScore}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                              <Target className="w-6 h-6 text-primary mb-3" />
                              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Material</div>
                              <div className="text-lg font-black text-white uppercase">{result?.detectedMaterial}</div>
                           </div>
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                              <Maximize2 className="w-6 h-6 text-primary mb-3" />
                              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Area</div>
                              <div className="text-lg font-black text-white uppercase">~{result?.estimatedSqFt} sf</div>
                           </div>
                        </div>
                      </div>
                      
                      {/* Right: Pricing & CTA */}
                      <div className="flex flex-col justify-center">
                         <div className="mb-8">
                            <span className="text-yellow-400 font-bold text-xs uppercase tracking-[0.2em] mb-2 block animate-pulse">● AI Exclusive Offer</span>
                            <h3 className="text-white text-5xl md:text-7xl font-(family-name:--font-orbitron) font-black tracking-tighter mb-4">
                              {result?.priceRange}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                               Comparison market value for this job is typically 20% higher. 
                               This AI-generated quote is locked for 48 hours.
                            </p>
                         </div>
                         
                         <div className="space-y-4">
                            <Button 
                              onClick={handleWhatsApp}
                              className="w-full h-16 bg-white text-black hover:bg-gray-200 rounded-xl text-lg font-black uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
                            >
                              <span className="flex items-center gap-3">
                                Lock Price <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              onClick={handleRetry}
                              className="w-full text-white/40 hover:text-white hover:bg-white/5 uppercase tracking-widest text-xs font-bold"
                            >
                              Scan Another Photo
                            </Button>
                         </div>
                      </div>
  
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </section>
  
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  )
}
