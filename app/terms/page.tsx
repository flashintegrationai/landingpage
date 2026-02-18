"use client"

import React from "react"
import Link from "next/link"
import { FileText, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLanguage } from "@/context/language-context"

export default function TermsPage() {
  const { t } = useLanguage()
  const sections = t("termsPage.sections")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover:bg-primary/10 hover:text-primary transition-colors gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("termsPage.backHome")}
            </Button>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
              <FileText className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-bold text-foreground">
                {t("termsPage.title")}
              </h1>
              <p className="text-muted-foreground mt-2 font-medium">
                {t("termsPage.subtitle")}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12 text-foreground/80 leading-relaxed text-lg">
            {sections.map((section: any, idx: number) => (
              <section key={idx} className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  {section.title}
                </h2>
                <p className={section.subsections || section.steps || section.items ? "mb-6" : ""}>
                  {section.content}
                </p>

                {/* Subsections (for Section 2) */}
                {section.subsections && (
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {section.subsections.map((sub: any, subIdx: number) => (
                      <div key={subIdx} className="p-6 rounded-2xl bg-background/50 border border-border">
                        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          {sub.title}
                        </h4>
                        <p className="text-sm">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Steps (for Section 3) */}
                {section.steps && (
                  <ul className="space-y-4">
                    {section.steps.map((step: any, stepIdx: number) => (
                      <li key={stepIdx} className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">{stepIdx + 1}</div>
                        <p><strong>{step.label}:</strong> {step.content}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Items (for Section 4) */}
                {section.items && (
                  <div className="mt-6 space-y-3 text-sm italic border-l-4 border-primary pl-6 py-2">
                    {section.items.map((item: string, itemIdx: number) => (
                      <p key={itemIdx}>— {item}</p>
                    ))}
                  </div>
                )}

                {/* Extra (for Section 5) */}
                {section.extra && (
                  <p className="mt-4">{section.extra}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
