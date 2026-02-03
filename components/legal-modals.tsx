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
  const { activeModal, closeModal } = useLegalModals()

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
                  Privacy Policy
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  Last updated: February 2026
                </DialogDescription>
              </div>
            </div>

            <ScrollArea className="h-[450px] pr-6">
              <div className="space-y-8 text-foreground/80 leading-relaxed">
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    1. Information We Collect
                  </h3>
                  <p>
                    We collect information you provide directly to us through our quote request form, including your name, email address, phone number, and property address. This information is used solely to provide accurate estimates and contact you regarding our services.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    2. How We Use Your Information
                  </h3>
                  <p>
                    Your data helps us respond to your requests, improve our customer service, and occasionally send promotional offers related to Elite Surface Systems. We do not sell or rent your personal information to third parties.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    3. Data Security
                  </h3>
                  <p>
                    We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your information. Your data is stored on secure servers and is only accessible by authorized personnel.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    4. Cookies
                  </h3>
                  <p>
                    Our website may use cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser that enables the site's systems to recognize your browser and capture certain information.
                  </p>
                </section>
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
              <div className="w-14 h-14 rounded-2xl bg-[#1e71cd]/10 flex items-center justify-center text-[#1e71cd]">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <DialogTitle className="font-(family-name:--font-orbitron) text-2xl md:text-3xl font-bold text-foreground">
                  Terms of Service
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  Agreement for our professional services
                </DialogDescription>
              </div>
            </div>

            <ScrollArea className="h-[450px] pr-6">
              <div className="space-y-8 text-foreground/80 leading-relaxed">
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e71cd]" />
                    1. Scope of Services
                  </h3>
                  <p>
                    Elite Surface Systems provides professional pressure washing, soft washing, and surface restoration services. All estimates provided are based on our physical or satellite inspection of the property and are subject to adjustment if actual conditions differ significantly.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e71cd]" />
                    2. Customer Obligations
                  </h3>
                  <p>
                    The customer is responsible for ensuring that all windows and doors are tightly shut before work begins. Any delicate plants or outdoor furniture should be moved or covered as advised by our technicians.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e71cd]" />
                    3. Payments and Deposits
                  </h3>
                  <p>
                    Payments are due upon completion of the service unless otherwise agreed in writing. Large commercial projects may require a deposit prior to commencement of work.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e71cd]" />
                    4. Liability
                  </h3>
                  <p>
                    Elite Surface Systems is fully insured. However, we are not responsible for damage caused by pre-existing conditions, such as loose siding, damaged stucco, or improperly sealed windows, unless such damage is caused by our direct negligence.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
