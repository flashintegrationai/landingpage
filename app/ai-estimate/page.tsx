"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Upload, 
  Zap, 
  Sparkles,
  Loader2,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  Target,
  Maximize2,
  ChevronRight,
  Shield,
  Droplets,
  AlertTriangle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/navbar"
import { useLanguage } from "@/context/language-context"
import nextDynamic from "next/dynamic"

const BackgroundEffects = nextDynamic(
  () => import("@/components/background-effects"),
  { ssr: false }
)

interface AnalysisResult {
  detectedMaterial: string
  contaminationLevel: string
  estimatedSqFt: number
  confidenceScore: number
  priceRange: string
}

export default function AiEstimatePage() {
  const { t } = useLanguage()
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [leadData, setLeadData] = useState({ name: "", phone: "" })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string }>({})
  const [showDuplicateModal, setShowDuplicateModal] = useState(false)
  const [duplicateContactData, setDuplicateContactData] = useState<any>(null)
  const [activeStep, setActiveStep] = useState<"idle" | "form" | "analyzing" | "result">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatPhoneNumber = (value: string) => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t("contact.form.errors.fileSize") || "Image too large. Please use an image under 10MB.")
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
    
    // Simple phone validation (10 digits)
    const phoneDigits = leadData.phone.replace(/[^\d]/g, "")
    if (phoneDigits.length < 10) {
      toast.error(t("contact.form.errors.phoneInvalid"))
      return
    }

    if (!leadData.name || !leadData.phone) {
      toast.error(t("contact.form.errors.submissionFailed"))
      return
    }

    setIsSubmittingLead(true)
    setFieldErrors({})

    try {
      // 1. Check if phone exists in GHL
      const phoneCheck = await fetch(`/api/ghl/contacts?phone=${encodeURIComponent(leadData.phone)}`).then(r => r.json());
      
      if (phoneCheck.exists) {
        setFieldErrors({ phone: t("contact.form.errors.phoneExists") });
        setDuplicateContactData({
          field: 'phone',
          name: phoneCheck.contactName || leadData.name,
          id: phoneCheck.contactId
        });
        setShowDuplicateModal(true);
        setIsSubmittingLead(false);
        return;
      }

      // 2. Insert into Supabase for local backup
      const { data: leadRecord, error: supabaseError } = await supabase
        .from('leads')
        .insert([
          { 
            name: leadData.name, // The table likely uses 'name' based on contact-section.tsx
            phone: leadData.phone,
            source: 'ai_estimator',
            status: 'new',
            notes: `AI Analysis started for image.`
          }
        ])
        .select()

      if (supabaseError) console.error("Supabase insert error:", supabaseError)

      // 3. Create contact in GHL
      const ghlRes = await fetch("/api/ghl/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name,
          phone: leadData.phone,
          source: "AI Estimate Tool",
          tags: ["AI-Estimate-Started"]
        }),
      });

      const ghlData = await ghlRes.json();
      
      if (!ghlRes.ok) {
        console.error("GHL Error:", ghlData);
        // Robust error parsing
        const rawError = ghlData.error || ghlData.details?.message || "";
        const errorMsg = (Array.isArray(rawError) ? rawError[0] : rawError).toString().toLowerCase();

        if (errorMsg.includes("duplicated") || ghlData.code === "duplicated_contact") {
           const meta = ghlData.details?.meta || ghlData.details;
           setDuplicateContactData({
             field: meta?.matchingField || 'phone',
             name: meta?.contactName || leadData.name,
             id: meta?.contactId || meta?.id
           });
           setShowDuplicateModal(true);
           setFieldErrors({ phone: t("contact.form.errors.phoneExists") });
           setIsSubmittingLead(false);
           return;
        }
        throw new Error(errorMsg || "GHL Submission failed");
      }

      const contactId = ghlData.contactId;

      setActiveStep("analyzing")
      if (image) analyzeImage(image, leadRecord?.[0]?.id, contactId)
    } catch (error: any) {
      console.error(error)
      // Even if GHL/Supabase fails, we still try to analyze the image for the user experience
      setActiveStep("analyzing")
      if (image) analyzeImage(image)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const analyzeImage = async (base64Image: string, leadId?: string, ghlContactId?: string) => {
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
      
      const analysisNotes = `Material: ${data.detectedMaterial}, Price: ${data.priceRange}, Area: ${data.estimatedSqFt}sqft, Confidence: ${data.confidenceScore}%`;

      // Update Supabase
      if (leadId) {
        await supabase
          .from('leads')
          .update({ 
            notes: analysisNotes,
            status: 'analyzed'
          })
          .eq('id', leadId)
      }

      // Update GHL with analysis results
      if (ghlContactId) {
        try {
          await fetch("/api/ghl/contacts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contactId: ghlContactId,
              notes: analysisNotes,
              tags: ["AI-Analyzed", data.detectedMaterial.replaceAll(" ", "-")],
              customFields: {
                 "surface_material": data.detectedMaterial,
                 "estimated_area": `${data.estimatedSqFt} sqft`,
                 "price_range": data.priceRange
              }
            }),
          });
        } catch (updateError) {
          console.error("Failed to update GHL contact with results:", updateError);
        }
      }

      toast.success(t("aiEstimate.result.complete"))
    } catch (error: any) {
      console.error(error)
      toast.error(t("contact.form.errors.submissionFailed"))
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
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-500 overflow-x-hidden">
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

      <div className="relative z-10 pt-32 pb-20">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-primary transition-colors">{t("nav.home") || "Home"}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{t("nav.aiEstimate")}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("aiEstimate.noMoreGuessing")}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-(family-name:--font-orbitron) text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            {t("aiEstimate.stopOverpaying")} <span className="bg-linear-to-r from-primary via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">{t("aiEstimate.overpaying")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed font-medium"
          >
            {t("aiEstimate.description")}
          </motion.p>
        </section>

        {/* Interactive Main Area */}
        <div className="max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeStep === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                className="relative"
              >
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative bg-card/50 backdrop-blur-xl border border-border rounded-4xl p-12 md:p-20 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(30,113,205,0.1)] overflow-hidden"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 border border-border overflow-hidden p-4">
                      <Image src="/logoremovebj.png" width={80} height={80} alt="Logo" className="object-contain" />
                    </div>
                    
                    <h2 className="font-(family-name:--font-orbitron) text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tight">
                      {t("aiEstimate.idle.unlock")} <span className="text-primary">{t("aiEstimate.idle.pricing")}</span>
                    </h2>
                    <p className="max-w-sm text-muted-foreground text-sm md:text-base mb-10 leading-relaxed">
                      {t("aiEstimate.idle.upload")}
                    </p>

                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-7 rounded-2xl h-auto text-lg transition-all duration-300 group-hover:shadow-[0_15px_30px_rgba(30,113,205,0.3)]">
                      <Upload className="mr-2 w-5 h-5 shrink-0" />
                      {t("aiEstimate.idle.startScan")}
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
                className="bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
              >
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 font-bold text-[10px] mb-6 uppercase tracking-widest">
                    <ShieldCheck size={14} /> Encrypted Session
                  </div>
                  <h3 className="font-(family-name:--font-orbitron) text-3xl font-black mb-4 uppercase tracking-tighter">{t("aiEstimate.form.claimTitle")} <span className="text-primary italic">{t("aiEstimate.form.claimEstimate")}</span></h3>
                  <p className="text-muted-foreground text-sm">{t("aiEstimate.form.description")}</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-6 max-w-sm mx-auto relative z-10">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">{t("aiEstimate.form.fullName")}</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        placeholder="e.g. John Smith" 
                        required
                        className="h-14 pl-12 bg-background/50 border-border text-foreground placeholder:text-muted-foreground/30 rounded-xl focus:border-primary focus:ring-primary/20 transition-all"
                        value={leadData.name}
                        onChange={e => setLeadData({...leadData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">{t("aiEstimate.form.phoneNumber")}</Label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        type="tel"
                        placeholder="(555) 000-0000" 
                        required
                        className={`h-14 pl-12 bg-background/50 text-foreground placeholder:text-muted-foreground/30 rounded-xl focus:ring-primary/20 transition-all font-medium ${
                          fieldErrors.phone ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                        }`}
                        value={leadData.phone}
                        onChange={e => {
                          const formatted = formatPhoneNumber(e.target.value)
                          setLeadData({...leadData, phone: formatted})
                          if (fieldErrors.phone) setFieldErrors({})
                        }}
                        maxLength={14}
                      />
                      {fieldErrors.phone && (
                        <p className="absolute -bottom-5 left-1 text-[10px] text-red-500 font-bold uppercase tracking-tighter animate-pulse">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmittingLead}
                    className="w-full h-16 bg-primary text-white hover:bg-primary/90 rounded-xl text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/10 mt-6"
                  >
                    {isSubmittingLead ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (
                      <span className="flex items-center justify-center gap-2">
                        {t("aiEstimate.form.generateReport")} <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {activeStep === "analyzing" && (
              <div className="relative aspect-video bg-card/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-border shadow-2xl flex flex-col items-center justify-center">
                {/* Scanning Animation */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_30px_rgba(30,113,205,0.8)] z-20"
                />
                
                {image && <Image src={image} alt="Processing" fill className="object-cover opacity-20" />}
                
                <div className="relative z-30 flex flex-col items-center gap-6">
                   <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center animate-pulse p-4 border border-white/20">
                      <Image src="/logoremovebj.png" width={60} height={60} alt="Logo" className="object-contain" />
                   </div>
                   <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground font-(family-name:--font-orbitron) tracking-wider mb-2 uppercase">{t("aiEstimate.analyzing.mapping")}</h3>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-bold">Deploying Neural Network...</p>
                   </div>
                </div>
              </div>
            )}

            {activeStep === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* Visual Analysis */}
                    <div className="space-y-6">
                      <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-border group shadow-inner">
                        {image && <Image src={image} alt="Analyzed" fill className="object-cover" />}
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-300" />
                        
                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border flex items-center gap-2">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                           <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{result?.confidenceScore}% {t("aiEstimate.result.match")}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div className="bg-muted/30 border border-border p-4 rounded-xl flex flex-col gap-1">
                            <Target className="w-4 h-4 text-primary mb-1" />
                            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{t("aiEstimate.result.material")}</span>
                            <span className="text-sm font-black text-foreground uppercase truncate" title={result?.detectedMaterial}>{result?.detectedMaterial}</span>
                         </div>
                         <div className="bg-muted/30 border border-border p-4 rounded-xl flex flex-col gap-1">
                            <Maximize2 className="w-4 h-4 text-primary mb-1" />
                            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{t("aiEstimate.result.surfaceArea")}</span>
                            <span className="text-sm font-black text-foreground uppercase truncate">~{result?.estimatedSqFt} {t("aiEstimate.result.sqft")}</span>
                         </div>
                      </div>
                    </div>
                    
                    {/* Proposal */}
                    <div className="flex flex-col text-center md:text-left">
                       <span className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 md:mb-1 block">{t("aiEstimate.result.report")}</span>
                       <h3 className="text-foreground text-5xl md:text-7xl font-(family-name:--font-orbitron) font-black tracking-tighter mb-6 leading-tight">
                         {result?.priceRange}
                       </h3>
                       
                       <p className="text-muted-foreground text-sm mb-10 leading-relaxed font-medium">
                         {t("aiEstimate.result.validity")}
                       </p>
                       
                       <div className="space-y-3">
                          <Button 
                            onClick={handleWhatsApp}
                            className="w-full h-16 bg-[#1e71cd] text-white hover:bg-[#1e71cd]/90 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_15px_30px_rgba(30,113,205,0.2)] group"
                          >
                            <span className="flex items-center gap-3">
                              {t("aiEstimate.result.lockPrice")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                          
                          <button 
                            onClick={handleRetry}
                            className="w-full py-3 text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-[0.3em] transition-colors"
                          >
                            {t("aiEstimate.result.newAnalysis")}
                          </button>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Shield, label: t("hero.guaranteed") },
                    { icon: Droplets, label: t("hero.industrialGrade") },
                    { icon: Zap, label: "Eco-Friendly" }
                  ].map((item, i) => (
                    <div key={i} className="bg-card/30 backdrop-blur-md border border-border p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                      <item.icon className="w-5 h-5 text-primary/60" />
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {/* Duplicate Contact Modal */}
      <Dialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <DialogTitle className="text-center text-xl font-bold font-(family-name:--font-orbitron)">
              {t("contact.form.errors.phoneExists")}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {t("contact.form.errors.phoneExists")}
            </DialogDescription>
          </DialogHeader>
          
          {duplicateContactData && (
            <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/40 font-medium uppercase tracking-wider text-[10px]">
                  Registered Name:
                </span>
                <span className="text-foreground font-semibold">
                  {duplicateContactData.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/40 font-medium uppercase tracking-wider text-[10px]">
                  Matching Field:
                </span>
                <span className="text-[#1e71cd] font-bold uppercase tracking-tight">
                  {duplicateContactData.field}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-center mt-4">
            <Button
              type="button"
              onClick={() => setShowDuplicateModal(false)}
              className="bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white px-8 h-12 rounded-xl w-full sm:w-auto font-bold"
            >
              Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
