"use client";

import { useLanguage } from "@/context/language-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Globe, Check, Languages, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  {
    code: "en",
    name: "English",
    label: "ENG",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#0A3161" />
        <path d="M0 50H100M50 0V100M0 0L100 100M100 0L0 100" stroke="#fff" strokeWidth="12" />
        <path d="M0 50H100M50 0V100M0 0L100 100M100 0L0 100" stroke="#B22234" strokeWidth="8" />
      </svg>
    )
  },
  {
    code: "es",
    name: "Español",
    label: "ESP",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#AA151B" />
        <rect y="25" width="100" height="50" fill="#F1BF00" />
      </svg>
    )
  },
];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#1e71cd]/10 animate-pulse border border-[#1e71cd]/20" />
    );
  }

  const handleSelect = (lang: string) => {
    setLanguage(lang as any);
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="group relative w-10 min-w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          aria-label="Change language"
        >
          <Languages className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
            <span className="text-[7px] font-black text-white uppercase">{language}</span>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[400px] p-0 overflow-hidden bg-card border-border shadow-2xl rounded-[2.5rem]">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,113,205,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative p-8 md:p-10">
          <DialogHeader className="mb-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary shadow-lg shadow-primary/5">
              <Globe className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="font-(family-name:--font-orbitron) text-2xl font-black text-center text-foreground uppercase tracking-tight">
                {t("nav.selectLanguage")}
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">
                {t("nav.localizedExperience")}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`flex items-center gap-5 p-5 rounded-3xl border-2 transition-all duration-300 relative group overflow-hidden ${
                  language === item.code
                    ? "bg-primary/5 border-primary shadow-[0_10px_30px_rgba(30,113,205,0.1)] translate-y-[-2px]"
                    : "bg-background/50 border-border hover:border-primary/30 hover:bg-primary/2 hover:-translate-y-px"
                }`}
              >
                {/* Flag Icon */}
                <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 group-hover:scale-110 ${language === item.code ? 'ring-4 ring-primary/20 scale-105' : ''}`}>
                  {item.icon}
                </div>

                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-(family-name:--font-orbitron) text-lg font-bold text-foreground uppercase tracking-tight">
                      {item.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-foreground/5 text-muted-foreground text-[8px] font-black tracking-widest uppercase">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium mt-0.5">
                    {item.code === 'en' ? 'United States / Global' : (language === 'es' ? 'España / Latinoamérica' : 'Spain / Latin America')}
                  </span>
                </div>

                <AnimatePresence>
                  {language === item.code && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="ml-auto w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover indicator */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                {t("nav.smartDetection")}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
