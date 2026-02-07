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
  DollarSign
} from "lucide-react"
import Image from "next/image"
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

export default function AiEstimateSection() {
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
    <section id="ai-estimate" className="relative py-24 bg-background overflow-hidden border-t border-border/50">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,113,205,0.05),transparent_70%)]" />
      
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header - Strongly Sales Focused */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles className="w-3 h-3" /> NO MORE GUESSING
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-orbitron)] text-4xl md:text-7xl font-black text-foreground uppercase tracking-tighter mb-8"
          >
            STOP <span className="text-primary italic">OVERPAYING</span>
          </motion.h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-10">
            Get an instant, laboratory-precise price range using our neural network. 
            Avoid hidden technician costs and lock in your <span className="text-foreground font-black">AI-Special Discount</span> today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">3-Second Scan</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">0 Overcharges</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Instant Proof</span>
            </div>
          </div>
        </div>

        {/* Action Container - Strictly Single Column */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {activeStep === "idle" && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative"
              >
                {/* Glow Ring */}
                <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition duration-1000" />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-video md:aspect-[21/9] bg-card border-2 border-dashed border-primary/20 group-hover:border-primary rounded-[3rem] flex flex-col items-center justify-center p-8 md:p-12 cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-primary/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-50" />
                  
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(30,113,205,0.4)] group-hover:scale-110 transition-transform duration-700"
                  >
                    <Camera className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-black text-foreground mb-4 uppercase tracking-tighter">
                    UNLOCK <span className="text-primary italic">PRICING</span>
                  </h3>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-[0.2em] max-w-sm text-center leading-relaxed">
                    Upload photo to identify material & verify <span className="text-foreground">Exclusive Discounts</span>
                  </p>
                  
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Button className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 group/btn">
                      <Upload className="w-4 h-4 mr-3 group-hover/btn:-translate-y-1 transition-transform" /> Start AI Scan
                    </Button>
                    <Button variant="outline" className="h-16 px-12 rounded-2xl border-border bg-background/50 backdrop-blur-md text-xs font-black uppercase tracking-widest hover:bg-accent group/btn">
                      <Camera className="w-4 h-4 mr-3 group-hover/btn:scale-110 transition-transform" /> Take Photo
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
                className="bg-card border border-border rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none">
                  <ShieldAlert size={140} />
                </div>

                <div className="text-center mb-12">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-black text-[10px] mb-6 uppercase tracking-widest border border-primary/20">
                      <Zap size={14} className="animate-pulse" /> Final Verification
                   </div>
                   <h3 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">CLAIM YOUR <span className="text-primary">ESTIMATE</span></h3>
                   <p className="text-muted-foreground font-medium">Verify your details below to reveal the AI analysis and lock-in your price.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-6 max-w-md mx-auto relative z-10">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        placeholder="John Doe" 
                        required
                        className="h-16 pl-14 bg-background border-border rounded-2xl focus:border-primary focus:ring-primary/10 transition-all font-bold"
                        value={leadData.name}
                        onChange={e => setLeadData({...leadData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Phone Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        type="tel"
                        placeholder="(123) 456-7890" 
                        required
                        className="h-16 pl-14 bg-background border-border rounded-2xl focus:border-primary focus:ring-primary/10 transition-all font-bold"
                        value={leadData.phone}
                        onChange={e => setLeadData({...leadData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmittingLead}
                    className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/25 group/submit"
                  >
                    {isSubmittingLead ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (
                      <span className="flex items-center justify-center gap-3">
                        GENERATE REPORT <ArrowRight className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {activeStep === "analyzing" && (
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl">
                {image && <Image src={image} alt="Processing" fill className="object-cover opacity-60 contrast-125 saturate-50" />}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                   <motion.div 
                     animate={{ top: ["0%", "100%", "0%"] }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_30px_rgba(30,113,205,1)] z-10"
                   />
                   <div className="p-10 bg-black/80 rounded-[2.5rem] border border-white/10 flex flex-col items-center gap-4">
                     <BrainCircuit className="w-10 h-10 text-primary animate-pulse" />
                     <span className="text-white font-black uppercase tracking-[0.4em] text-[10px]">Neural Surface Mapping...</span>
                   </div>
                </div>
              </div>
            )}

            {activeStep === "result" && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Analyzed Image with Logo Overlay - Like Reference */}
                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-primary/30 shadow-2xl">
                  {image && <Image src={image} alt="Analyzed Surface" fill className="object-cover" />}
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Elite Logo Centered - Like ai stimate.png */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                     <div className="relative w-full max-w-md aspect-square">
                        <Image src="/images/logo.png" alt="Elite Surface Systems" fill className="object-contain drop-shadow-[0_0_40px_rgba(30,113,205,0.5)]" />
                     </div>
                  </div>

                  {/* Status Badge Bottom Left */}
                  <div className="absolute bottom-8 left-8 px-5 py-3 rounded-2xl bg-green-500/20 backdrop-blur-xl border border-green-500/30 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 text-xs font-black uppercase tracking-widest">Analysis Complete</span>
                  </div>

                  {/* Confidence Score Top Right */}
                  <div className="absolute top-8 right-8 px-5 py-3 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-primary text-xs font-black uppercase tracking-widest">{result?.confidenceScore}% Match</span>
                  </div>
                </div>

                {/* Report Card Below */}
                <div className="bg-card border border-border rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none">
                    <Zap size={180} />
                  </div>

                  <div className="mb-12">
                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-3">
                       <Target size={14} /> Surface Intelligence Report
                    </div>
                    <h3 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-6xl font-black text-foreground uppercase tracking-tighter">
                      YOUR <span className="text-primary italic">ESTIMATE</span>
                    </h3>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-8 bg-muted/50 border border-border rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Target className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">Material Type</span>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-foreground uppercase">{result?.detectedMaterial}</p>
                    </div>

                    <div className="p-8 bg-muted/50 border border-border rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <ShieldAlert className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">Contamination</span>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-foreground uppercase">{result?.contaminationLevel}</p>
                    </div>

                    <div className="p-8 bg-muted/50 border border-border rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Maximize2 className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">Surface Area</span>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-foreground uppercase">~{result?.estimatedSqFt} SQFT</p>
                    </div>
                  </div>

                  {/* Price Range - Hero Element */}
                  <div className="bg-linear-to-r from-primary/10 to-primary/5 border-l-4 border-primary rounded-r-3xl p-10 md:p-16 mb-12 relative group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <DollarSign className="w-8 h-8 text-primary" />
                        <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">AI-Locked Price Range</span>
                      </div>
                      
                      <div className="text-6xl md:text-8xl font-[family-name:var(--font-orbitron)] font-black text-foreground tracking-tighter tabular-nums mb-6 drop-shadow-lg">
                        {result?.priceRange}
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border">
                        <Clock className="w-4 h-4 text-primary mt-0.5" />
                        <p className="text-muted-foreground text-xs font-bold uppercase leading-relaxed">
                          This exclusive AI discount is valid for <span className="text-foreground font-black">48 hours</span>. Book now via WhatsApp to lock in this price.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Button 
                      onClick={handleWhatsApp}
                      className="flex-[3] h-20 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg md:text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group"
                    >
                      <span className="flex items-center justify-center gap-3">
                        Lock This Price <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleRetry}
                      className="flex-1 h-20 rounded-2xl border-border hover:bg-accent text-muted-foreground hover:text-foreground font-black uppercase tracking-widest text-xs"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" /> New Analysis
                    </Button>
                  </div>
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
    </section>
  )
}
