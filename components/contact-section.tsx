"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Loader2, Upload, X, Image as ImageIcon, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { triggerConfetti } from "@/lib/confetti";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/language-context";

// Custom SVG Icons for Services - Professional White-Stroke Aesthetic
const ServiceIcons = {
  PressureWashing: () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 30L40 60" strokeLinecap="round" />
      <path d="M40 60L30 70" strokeLinecap="round" strokeWidth="4" />
      <path d="M35 55L10 80M45 65L20 90M55 75L30 100" strokeLinecap="round" strokeDasharray="1 6" className="animate-pulse" />
      <circle cx="15" cy="85" r="1.5" className="fill-current" />
      <circle cx="25" cy="75" r="1" className="fill-current" />
    </svg>
  ),
  HouseWashing: () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50L50 20L80 50V85H20V50Z" strokeLinecap="round" />
      <path d="M40 85V65H60V85" strokeLinecap="round" />
      <path d="M55 35L85 45M60 45 L88 55" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M75 50L90 60" strokeLinecap="round" strokeWidth="3" />
    </svg>
  ),
  RoofCleaning: () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 70L50 30L85 70" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 30V80" strokeLinecap="round" className="opacity-20" />
      <path d="M65 25L85 45M70 35L88 55" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M75 20L90 35" strokeLinecap="round" strokeWidth="3" />
    </svg>
  ),
  ScreenEnclosure: () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="35" width="60" height="45" rx="2" strokeLinecap="round" />
      <path d="M20 50H80M20 65H80M35 35V80M50 35V80M65 35V80" strokeLinecap="round" strokeWidth="1" className="opacity-40" />
      <path d="M75 20L90 35" strokeLinecap="round" strokeWidth="3" />
    </svg>
  ),
  Driveway: () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 20L40 85H60L75 20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 45H58M40 60H60" strokeLinecap="round" className="opacity-30" />
      <path d="M50 15V45" strokeLinecap="round" strokeDasharray="4 6" />
    </svg>
  ),
  Commercial: () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 85V35H50V85M50 85V25H80V85" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="45" width="8" height="6" rx="1" strokeWidth="1" />
      <rect x="30" y="60" width="8" height="6" rx="1" strokeWidth="1" />
      <rect x="60" y="35" width="8" height="6" rx="1" strokeWidth="1" />
      <rect x="60" y="50" width="8" height="6" rx="1" strokeWidth="1" />
      <rect x="60" y="65" width="8" height="6" rx="1" strokeWidth="1" />
    </svg>
  ),
};

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateContactData, setDuplicateContactData] = useState<any>(null);

  const [files, setFiles] = useState<File[]>([]);

  const services = [
    { label: t("contact.services.pressureWashing"), icon: ServiceIcons.PressureWashing },
    { label: t("contact.services.houseWashing"), icon: ServiceIcons.HouseWashing },
    { label: t("contact.services.roofCleaning"), icon: ServiceIcons.RoofCleaning },
    { label: t("contact.services.screenEnclosures"), icon: ServiceIcons.ScreenEnclosure },
    { label: t("contact.services.drivewayCleaning"), icon: ServiceIcons.Driveway },
    { label: t("contact.services.commercial"), icon: ServiceIcons.Commercial },
  ];

  useEffect(() => {
    setMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const oversizedFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      
      if (oversizedFiles.length > 0) {
        toast.error(t("contact.form.errors.fileSize"));
        return;
      }

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!validatePhone(phone)) {
      toast.error(t("contact.form.errors.phoneInvalid"));
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      // 1. Check if email or phone exists in GHL
      const [emailCheck, phoneCheck] = await Promise.all([
        fetch(`/api/ghl/contacts?email=${encodeURIComponent(email)}`).then(r => r.json()),
        fetch(`/api/ghl/contacts?phone=${encodeURIComponent(phone)}`).then(r => r.json())
      ]);

      if (emailCheck.exists || phoneCheck.exists) {
        const errors: any = {};
        if (emailCheck.exists) {
          errors.email = t("contact.form.errors.emailExists");
          toast.error(t("contact.form.errors.emailExists"));
        }
        if (phoneCheck.exists) {
          errors.phone = t("contact.form.errors.phoneExists");
          toast.error(t("contact.form.errors.phoneExists"));
        }
        setFieldErrors(errors);
        setIsSubmitting(false);
        return;
      }

      const name = formData.get("name") as string;
      const address = formData.get("address") as string;
      const servicesSubmited = formData.getAll("services") as string[];
      const message = formData.get("message") as string;
      
      let imageUrls: string[] = [];

      // 2. Upload Images if any
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('quote_uploads')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('quote_uploads')
            .getPublicUrl(filePath);

          imageUrls.push(publicUrl);
        }
      }

      // 3. Insert into Supabase
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          name,
          phone,
          email,
          address,
          services: servicesSubmited,
          message,
          image_urls: imageUrls,
          source: 'website_contact_form'
        });

      if (insertError) {
        console.error('Error inserting lead to Supabase:', insertError);
      }

      // 4. Send to GHL
      const ghlRes = await fetch("/api/ghl/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          source: "Website Contact Form",
          tags: ["website-lead", ...servicesSubmited],
          customFields: {
            address,
            services: servicesSubmited.join(", "),
            message,
            image_urls: imageUrls
          }
        })
      });

      const ghlData = await ghlRes.json();

      if (!ghlRes.ok) {
        console.error("GHL Error:", ghlData);
        
        // Handle GHL duplicate errors specifically
        const errorMsg = (ghlData.error || ghlData.details?.message || "").toLowerCase();
        if (errorMsg.includes("duplicated") || ghlData.code === "duplicated_contact") {
           const meta = ghlData.details?.meta;
           const matchingField = meta?.matchingField; 
           
           setDuplicateContactData({
             field: matchingField || 'email',
             name: meta?.contactName || 'Existing Contact',
             id: meta?.contactId
           });
           setShowDuplicateModal(true);

           if (matchingField === 'phone') {
             setFieldErrors(prev => ({ ...prev, phone: t("contact.form.errors.phoneExists") }));
           } else {
             setFieldErrors(prev => ({ ...prev, email: t("contact.form.errors.emailExists") }));
           }
           setIsSubmitting(false);
           return;
        }
        throw new Error(ghlData.error || "GHL creation failed");
      }

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerConfetti();
      setFiles([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t("contact.form.errors.submissionFailed"));
      setIsSubmitting(false);
      // Notice: we DON'T set isSubmitted to true, and we DON'T reset files,
      // so the user keeps their data in the inputs.
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-20 pb-64 md:pt-32 md:pb-80 bg-background transition-colors duration-300"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-t from-[#1e71cd]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#1e71cd]/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#1e71cd]/10 text-[#1e71cd] text-sm font-semibold mb-4 border border-[#1e71cd]/20">
            {t("contact.title")}
          </span>
          <h2 className="font-(family-name:--font-orbitron) text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-balance">{t("contact.subtitle")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 leading-relaxed mb-10">
            {t("contact.description")}
          </p>

          {/* AI Estimate Promo Card */}
          <Link href="/ai-estimate" className="block max-w-2xl mx-auto mb-12 group">
            <div className="relative p-6 rounded-2xl bg-[#1e71cd]/5 border border-[#1e71cd]/20 hover:border-[#1e71cd]/40 transition-all duration-300 overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles size={80} className="text-[#1e71cd]" />
               </div>
               <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-[#1e71cd] flex items-center justify-center shrink-0 shadow-lg shadow-[#1e71cd]/20">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-(family-name:--font-orbitron) text-lg font-bold text-foreground uppercase tracking-tight mb-1">{t("contact.promo.title")}</h4>
                    <p className="text-sm text-foreground/60">{t("contact.promo.description")}</p>
                  </div>
                  <div className="md:ml-auto">
                    <div className="flex items-center gap-2 px-8 py-4 bg-[#1e71cd] text-white text-xs font-black uppercase tracking-widest rounded-xl group-active:scale-95 transition-all shadow-[0_10px_20px_rgba(30,113,205,0.2)] group-hover:shadow-[0_15px_30px_rgba(30,113,205,0.4)] group-hover:bg-[#1e71cd]/90">
                      {t("contact.promo.cta")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
               </div>
            </div>
          </Link>
        </div>

        {/* Contact Form */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-6 md:p-10 rounded-3xl bg-card border border-border shadow-lg">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-(family-name:--font-orbitron) text-2xl font-bold text-foreground mb-4">
                  {t("contact.form.success.title")}
                </h3>
                <p className="text-foreground/60 mb-6">
                  {t("contact.form.success.description")}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  {t("contact.form.success.button")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground/80">
                      {t("contact.form.fullName")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground/80">
                      {t("contact.form.phone")}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={15}
                      placeholder="(123) 456-7890"
                      className={`bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20 ${fieldErrors.phone ? 'border-red-500/50' : ''}`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight animate-in fade-in slide-in-from-top-1">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80">
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={`bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20 ${fieldErrors.email ? 'border-red-500/50' : ''}`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight animate-in fade-in slide-in-from-top-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground/80">
                    {t("contact.form.address")}
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    placeholder="123 Main St, Miami, FL"
                    className="bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-foreground/80 text-lg font-bold">{t("contact.form.selectServices")}</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <label
                          key={service.label}
                          className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-background/50 border-2 border-border cursor-pointer transition-all duration-300 hover:border-[#1e71cd] hover:bg-[#1e71cd]/5 has-checked:border-[#1e71cd] has-checked:bg-[#1e71cd]/10 has-checked:shadow-[0_0_20px_rgba(30,113,205,0.2)]"
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={service.label}
                            className="sr-only"
                          />
                          <div className="text-foreground/80 group-hover:text-[#1e71cd] group-has-checked:text-[#1e71cd] transition-colors duration-300">
                            <Icon />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60 group-hover:text-foreground group-has-checked:text-foreground transition-colors text-center mt-2">
                            {service.label}
                          </span>
                          
                          {/* Selected Indicator Checkmark */}
                          <div className="absolute top-3 right-3 opacity-0 group-has-checked:opacity-100 transition-all scale-50 group-has-checked:scale-100">
                             <div className="bg-[#1e71cd] rounded-full p-1 shadow-lg">
                                <CheckCircle className="w-3.5 h-3.5 text-white" />
                             </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* File Upload Section (Optional) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground/80 text-lg font-bold">{t("contact.form.uploadPhotos")} <span className="text-sm font-normal text-muted-foreground ml-2">{t("contact.form.optional")}</span></Label>
                    <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">{t("contact.form.maxFiles")}</span>
                  </div>
                  
                  <div className="border-2 border-dashed rounded-2xl p-8 transition-colors bg-[#1e71cd]/5 border-[#1e71cd]/50 group cursor-pointer">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#1e71cd]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                         <Upload className="w-7 h-7 text-[#1e71cd]" />
                      </div>
                      <p className="font-bold text-foreground text-center">{t("contact.form.clickToUpload")}</p>
                      <p className="text-sm text-muted-foreground mt-2 text-center">{t("contact.form.dragAndDrop")}</p>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {files.map((file, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-border bg-background aspect-square shadow-sm hover:shadow-md transition-shadow">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt="preview" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1.5 text-[10px] text-white truncate text-center backdrop-blur-sm">
                             {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground/80">
                    {t("contact.form.additionalDetails")}
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className="w-full px-4 py-3 bg-background/50 border border-input rounded-xl text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-1 focus:ring-[#1e71cd]/20 focus:outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(30,113,205,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-foreground/40">
                  {t("contact.form.privacy").split("{{link}}")[0]}
                  <Link
                    href="/privacy"
                    className="underline hover:text-primary transition-colors cursor-pointer"
                  >
                    {t("contact.form.privacyLink")}
                  </Link>
                  {t("contact.form.privacy").split("{{link}}")[1]}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Duplicate Contact Modal */}
      <Dialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <DialogTitle className="text-center text-xl font-bold font-(family-name:--font-orbitron)">
              {t("contact.form.errors.emailExists")}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {duplicateContactData?.field === 'phone' 
                ? t("contact.form.errors.phoneExists") 
                : t("contact.form.errors.emailExists")}
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
              className="bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white px-8 h-12 rounded-xl w-full sm:w-auto"
            >
              Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
