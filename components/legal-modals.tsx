"use client"

import { create } from "zustand"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, FileText, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface LegalModalStore {
  activeModal: "privacy" | "terms" | null
  openPrivacy: () => void
  openTerms: () => void
  closeModal: () => void
}

export const useLegalModals = create<LegalModalStore>((set) => ({
  activeModal: null,
  openPrivacy: () => set({ activeModal: "privacy" }),
  openTerms: () => set({ activeModal: "terms" }),
  closeModal: () => set({ activeModal: null }),
}))

export default function LegalModals() {
  const { t } = useLanguage()
  const { activeModal, closeModal } = useLegalModals()

  const privacySections = t("privacyPage.sections")
  const termsSections = t("termsPage.sections")

  return (
    <>
      {/* Privacy Policy Modal */}
      <Dialog open={activeModal === "privacy"} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden bg-card border-border shadow-2xl rounded-3xl">
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={closeModal}
              className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
            >
              <X className="w-5 h-5 text-foreground/60" />
            </button>
          </div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <DialogTitle className="font-(family-name:--font-orbitron) text-2xl md:text-3xl font-bold text-foreground">
                  {t("privacyPage.title")}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  {t("privacyPage.lastUpdated")}
                </DialogDescription>
              </div>
            </div>

            <ScrollArea className="h-[450px] pr-6">
              <div className="space-y-8 text-foreground/80 leading-relaxed">
                {privacySections.map((section: any, idx: number) => (
                  <section key={idx}>
                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {section.title}
                    </h3>
                    <p>{section.content}</p>
                  </section>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={activeModal === "terms"} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden bg-card border-border shadow-2xl rounded-3xl">
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={closeModal}
              className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
            >
              <X className="w-5 h-5 text-foreground/60" />
            </button>
          </div>

          <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <DialogTitle className="font-(family-name:--font-orbitron) text-2xl md:text-3xl font-bold text-foreground">
                  {t("termsPage.title")}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  {t("termsPage.subtitle")}
                </DialogDescription>
              </div>
            </div>

            <ScrollArea className="h-[450px] pr-6">
              <div className="space-y-8 text-foreground/80 leading-relaxed">
                {termsSections.map((section: any, idx: number) => (
                  <section key={idx}>
                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {section.title}
                    </h3>
                    <p>{section.content}</p>
                  </section>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
