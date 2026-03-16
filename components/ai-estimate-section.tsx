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
  Maximize2,
  ShieldAlert,
  Clock,
  DollarSign,
  Target,
  BrainCircuit,
  Plus,
  X,
  Images
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { useLanguage } from "@/context/language-context"

interface AnalysisResult {
  detectedMaterial: string
  contaminationLevel: string
  estimatedSqFt: number
  confidenceScore: number
  priceRange: string
}

export default function AiEstimateSection() {
  const { t } = useLanguage()
  const [images, setImages] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [leadData, setLeadData] = useState({ name: "", phone: "" })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [activeStep, setActiveStep] = useState<"idle" | "form" | "analyzing" | "result">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addMoreRef = useRef<HTMLInputElement>(null)

  const readFilesToBase64 = async (files: File[]): Promise<string[]> => {
    const result: string[] = []
    for (const file of files) {
      const b64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
      result.push(b64)
    }
    return result
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    if (files.length > 5) {
      toast.error("Please select up to 5 images max.")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }
    const oversized = files.some(file => file.size > 10 * 1024 * 1024)
    if (oversized) {
      toast.error("One or more images are too large. Please use images under 10MB each.")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }
    const b64List = await readFilesToBase64(files)
    setImages(b64List)
    setActiveStep("form")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleAddMore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    if (images.length + files.length > 5) {
      toast.error(`Puedes subir hasta 5 imágenes. Ya tienes ${images.length}.`)
      if (addMoreRef.current) addMoreRef.current.value = ""
      return
    }
    const oversized = files.some(f => f.size > 10 * 1024 * 1024)
    if (oversized) {
      toast.error("Una o más imágenes son demasiado grandes. Usa imágenes de menos de 10MB.")
      if (addMoreRef.current) addMoreRef.current.value = ""
      return
    }
    const newB64 = await readFilesToBase64(files)
    setImages(prev => [...prev, ...newB64])
    if (addMoreRef.current) addMoreRef.current.value = ""
  }

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    if (updated.length === 0) setActiveStep("idle")
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
            notes: `AI Analysis started for ${images.length} image(s).`
          }
        ])
        .select()

      if (error) console.error("Supabase insert error:", error)

      setActiveStep("analyzing")
      if (images.length > 0) analyzeImages(images, leadRecord?.[0]?.id)
    } catch (error: any) {
      console.error(error)
      setActiveStep("analyzing")
      if (images.length > 0) analyzeImages(images)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const analyzeImages = async (base64Images: string[], leadId?: string) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-surface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: base64Images }),
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
      toast.error(error.message || "Failed to analyze images. Please try again.")
      setActiveStep("idle")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleRetry = () => {
    setImages([])
    setResult(null)
    setActiveStep("idle")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleWhatsApp = () => {
    const message = `Hi! I used your AI Estimate tool and got a range of ${result?.priceRange} for my ${result?.detectedMaterial}. I'd like to book this service.`
    const whatsappUrl = `https://wa.me/12392654398?text=${encodeURIComponent(message)}`
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
            <Sparkles className="w-3 h-3" /> {t("aiEstimate.noMoreGuessing")}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-(family-name:--font-orbitron) text-4xl md:text-7xl font-black text-foreground uppercase tracking-tighter mb-8"
          >
            {t("aiEstimate.stopOverpaying")} <span className="text-primary italic">{t("aiEstimate.overpaying")}</span>
          </motion.h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-10">
            {t("aiEstimate.description")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("aiEstimate.stats.scan")}</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("aiEstimate.stats.overcharges")}</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("aiEstimate.stats.proof")}</span>
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
                  className="relative aspect-video md:aspect-21/9 bg-card border-2 border-dashed border-primary/20 group-hover:border-primary rounded-[3rem] flex flex-col items-center justify-center p-8 md:p-12 cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-primary/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-50" />
                  
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(30,113,205,0.4)] group-hover:scale-110 transition-transform duration-700"
                  >
                    <Camera className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-black text-foreground mb-4 uppercase tracking-tighter">
                    {t("aiEstimate.idle.unlock")} <span className="text-primary italic">{t("aiEstimate.idle.pricing")}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-[0.2em] max-w-sm text-center leading-relaxed">
                    {t("aiEstimate.idle.upload")}
                  </p>
                  
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Button className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 group/btn">
                      <Upload className="w-4 h-4 mr-3 group-hover/btn:-translate-y-1 transition-transform" /> {t("aiEstimate.idle.startScan")}
                    </Button>
                    <Button variant="outline" className="h-16 px-12 rounded-2xl border-border bg-background/50 backdrop-blur-md text-xs font-black uppercase tracking-widest hover:bg-accent group/btn">
                      <Camera className="w-4 h-4 mr-3 group-hover/btn:scale-110 transition-transform" /> {t("aiEstimate.idle.takePhoto")}
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

                {/* Image Thumbnail Grid */}
                {images.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                        {images.length} foto{images.length > 1 ? "s" : ""} seleccionada{images.length > 1 ? "s" : ""}
                      </span>
                      {images.length < 5 && (
                        <button
                          type="button"
                          onClick={() => addMoreRef.current?.click()}
                          disabled={isSubmittingLead}
                          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" /> Agregar más
                        </button>
                      )}
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className="relative rounded-2xl overflow-hidden border-2 border-border shrink-0"
                          style={{ width: 80, height: 80 }}
                        >
                          <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" />
                          {!isSubmittingLead && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(i)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[8px] font-black text-center py-0.5">
                            #{i + 1}
                          </div>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <button
                          type="button"
                          disabled={isSubmittingLead}
                          onClick={() => addMoreRef.current?.click()}
                          className="relative rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary flex items-center justify-center transition-all text-primary/40 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-primary/30 disabled:hover:text-primary/40"
                          style={{ width: 80, height: 80 }}
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-center mb-12">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-black text-[10px] mb-6 uppercase tracking-widest border border-primary/20">
                      <Zap size={14} className="animate-pulse" /> {t("aiEstimate.form.verification")}
                   </div>
                   <h3 className="font-(family-name:--font-orbitron) text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">{t("aiEstimate.form.claimTitle")} <span className="text-primary">{t("aiEstimate.form.claimEstimate")}</span></h3>
                   <p className="text-muted-foreground font-medium">{t("aiEstimate.form.description")}</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-6 max-w-md mx-auto relative z-10">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">{t("aiEstimate.form.fullName")}</Label>
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
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">{t("aiEstimate.form.phoneNumber")}</Label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        type="tel"
                        placeholder="(239) 265-4398" 
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
                        {t("aiEstimate.form.generateReport")} <ArrowRight className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {activeStep === "analyzing" && (
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl">
                {images.length > 0 && <Image src={images[0]} alt="Processing" fill className="object-cover opacity-60 contrast-125 saturate-50" />}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                   <motion.div 
                     animate={{ top: ["0%", "100%", "0%"] }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_30px_rgba(30,113,205,1)] z-10"
                   />
                   <div className="p-10 bg-black/80 rounded-[2.5rem] border border-white/10 flex flex-col items-center gap-4 text-center">
                     <BrainCircuit className="w-10 h-10 text-primary animate-pulse mx-auto" />
                     {images.length > 1 ? (
                        <span className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
                            Analyzing {images.length} Images...
                        </span>
                     ) : (
                        <span className="text-white font-black uppercase tracking-[0.4em] text-[10px]">
                            {t("aiEstimate.analyzing.mapping")}
                        </span>
                     )}
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
                {/* Analyzed Image with Logo Overlay */}
                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-primary/30 shadow-2xl">
                  {images.length > 0 && <Image src={images[0]} alt="Analyzed Surface" fill className="object-cover" />}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                     <div className="relative w-full max-w-md aspect-square">
                        <Image src="/images/logo.png" alt="Elite Cleaning Surface" fill className="object-contain drop-shadow-[0_0_40px_rgba(30,113,205,0.5)]" />
                     </div>
                  </div>
                  <div className="absolute bottom-8 left-8 px-5 py-3 rounded-2xl bg-green-500/20 backdrop-blur-xl border border-green-500/30 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 text-xs font-black uppercase tracking-widest">{t("aiEstimate.result.complete")}</span>
                  </div>
                  <div className="absolute top-8 right-8 px-5 py-3 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 flex text-right flex-col gap-1 items-end justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-primary text-xs font-black uppercase tracking-widest">{result?.confidenceScore}% {t("aiEstimate.result.match")}</span>
                    </div>
                    {images.length > 1 && (
                        <span className="text-primary/70 text-[10px] font-bold uppercase tracking-widest">
                            Based on {images.length} photos
                        </span>
                    )}
                  </div>
                </div>

                {/* Report Card */}
                <div className="bg-card border border-border rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none">
                    <Zap size={180} />
                  </div>

                  <div className="mb-12">
                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-3">
                       <Target size={14} /> {t("aiEstimate.result.report")}
                    </div>
                    <h3 className="font-(family-name:--font-orbitron) text-3xl md:text-6xl font-black text-foreground uppercase tracking-tighter">
                      {t("aiEstimate.result.your")} <span className="text-primary italic">{t("aiEstimate.result.estimate")}</span>
                    </h3>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-8 bg-muted/50 border border-border rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <Target className="w-10 h-10 p-2.5 rounded-xl bg-primary/10 text-primary" />
                        <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">{t("aiEstimate.result.material")}</span>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-foreground uppercase">{result?.detectedMaterial}</p>
                    </div>

                    <div className="p-8 bg-muted/50 border border-border rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="w-10 h-10 p-2.5 rounded-xl bg-primary/10 text-primary" />
                        <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">{t("aiEstimate.result.contamination")}</span>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-foreground uppercase">{result?.contaminationLevel}</p>
                    </div>

                    <div className="p-8 bg-muted/50 border border-border rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <Maximize2 className="w-10 h-10 p-2.5 rounded-xl bg-primary/10 text-primary" />
                        <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">{t("aiEstimate.result.surfaceArea")}</span>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-foreground uppercase">~{result?.estimatedSqFt} {t("aiEstimate.result.sqft")}</p>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="bg-linear-to-r from-primary/10 to-primary/5 border-l-4 border-primary rounded-r-3xl p-10 md:p-16 mb-12 relative group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <DollarSign className="w-8 h-8 text-primary" />
                        <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">{t("aiEstimate.result.lockedPrice")}</span>
                      </div>
                      
                      <div className="text-6xl md:text-8xl font-(family-name:--font-orbitron) font-black text-foreground tracking-tighter tabular-nums mb-6 drop-shadow-lg">
                        {result?.priceRange}
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border">
                        <Clock className="w-4 h-4 text-primary mt-0.5" />
                        <p className="text-muted-foreground text-xs font-bold uppercase leading-relaxed">
                          {t("aiEstimate.result.validity")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Button 
                      onClick={handleWhatsApp}
                      className="flex-3 h-20 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg md:text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group"
                    >
                      <span className="flex items-center justify-center gap-3">
                        {t("aiEstimate.result.lockPrice")} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleRetry}
                      className="flex-1 h-20 rounded-2xl border-border hover:bg-accent text-muted-foreground hover:text-foreground font-black uppercase tracking-widest text-xs"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" /> {t("aiEstimate.result.newAnalysis")}
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
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        multiple
        ref={addMoreRef}
        onChange={handleAddMore}
        accept="image/*"
        className="hidden"
      />
    </section>
  )
}
