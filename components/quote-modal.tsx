"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, X } from "lucide-react"
import { create } from "zustand"

interface QuoteModalStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useQuoteModal = create<QuoteModalStore>((set) => ({
  isOpen: false,
  openModal: () => {
    // We'll handle the 2s delay in the trigger to show confetti first
    set({ isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal()

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank")
    closeModal()
  }

  const handleCall = () => {
    window.location.href = "tel:+1234567890"
    closeModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-card border-border sm:rounded-3xl shadow-2xl">
        <div className="relative p-8 md:p-10">
          {/* Decorative background flare */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <DialogHeader className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest mb-4 w-fit">
              Ready to Start?
            </div>
            <DialogTitle className="font-(family-name:--font-orbitron) text-3xl md:text-4xl font-black text-foreground text-left leading-tight">
              CHOOSE YOUR <br />
              <span className="text-[#1e71cd]">CONNECTION</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg text-left mt-4">
              How would you prefer to get your free estimate? Our team is standing by.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsApp}
              className="h-20 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-green-500/20 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                   <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">WhatsApp Us</div>
                  <div className="text-white/70 text-xs uppercase tracking-widest ont-medium">Fastest Response</div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                 →
              </div>
            </Button>

            {/* Call Button */}
            <Button
              onClick={handleCall}
              className="h-20 bg-[#1e71cd] hover:bg-[#1e71cd]/90 text-white rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/20 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                   <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">Call Now</div>
                  <div className="text-white/70 text-xs uppercase tracking-widest font-medium">Direct Line</div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                 →
              </div>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
              Elite Surface Systems • Premium Restoration
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
