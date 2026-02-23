"use client"

import { useLanguage } from "@/context/language-context"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircleQuestion, Sparkles } from "lucide-react"

export default function FAQSection() {
  const { t } = useLanguage()
  const faqs = t("faq.items")

  return (
    <section className="relative py-24 bg-card/30 border-y border-border overflow-hidden">
      {/* Visual flair */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
            <MessageCircleQuestion className="w-3 h-3" />
            {t("faq.title")}
          </div>
          <h2 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t("faq.subtitle")}
          </h2>
          <p className="text-foreground/60 leading-relaxed">
            {t("faq.description")}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((item: any, idx: number) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`}
              className="px-6 rounded-2xl bg-background border border-border data-[state=open]:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline hover:text-primary transition-colors gap-4">
                <span className="flex-1">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/60 leading-relaxed text-base pb-6">
                <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 italic">
                  <Sparkles className="w-5 h-5 text-primary shrink-0" />
                  {item.a}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
