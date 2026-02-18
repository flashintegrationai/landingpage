"use client"

import React from "react"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLanguage } from "@/context/language-context"

export default function PrivacyPage() {
  const { t } = useLanguage()
  const sections = t("privacyPage.sections")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover:bg-primary/10 hover:text-primary transition-colors gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("privacyPage.backHome")}
            </Button>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-bold text-foreground">
                {t("privacyPage.title")}
              </h1>
              <p className="text-muted-foreground mt-2 font-medium">
                {t("privacyPage.lastUpdated")}
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
                <p className={section.subsections || (section.items && typeof section.items[0] === 'object') ? "mb-4" : ""}>
                  {section.content}
                </p>

                {/* Subsections (for Section 1) */}
                {section.subsections && (
                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    {section.subsections.map((sub: any, subIdx: number) => (
                      <div key={subIdx}>
                        <h4 className="font-bold text-foreground mb-2">{sub.title}</h4>
                        <ul className="list-disc pl-6 space-y-2 text-sm">
                          {sub.items.map((item: string, itemIdx: number) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items with labels (for Section 2) */}
                {section.items && typeof section.items[0] === 'object' && (
                  <ul className="list-none pl-0 mt-6 space-y-4">
                    {section.items.map((item: any, itemIdx: number) => (
                      <li key={itemIdx} className="flex gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <p><strong>{item.label}:</strong> {item.desc}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Extra Info (for Section 3) */}
                {section.extraInfo && (
                  <p className="mt-4">{section.extraInfo}</p>
                )}

                {/* Plain Items (for Section 4) */}
                {section.items && typeof section.items[0] === 'string' && (
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-sm italic">
                    {section.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Rights (for Section 5) */}
                {section.rights && (
                  <>
                    <div className="flex flex-wrap gap-4 mt-6">
                      {section.rights.map((right: string) => (
                        <span key={right} className="px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-widest text-[#1e71cd]">
                          {right}
                        </span>
                      ))}
                    </div>
                    <p className="mt-8 text-sm text-center">
                      {section.contact}
                      <br />
                      <span className="text-primary font-black mt-2 block">{section.email}</span>
                    </p>
                  </>
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
