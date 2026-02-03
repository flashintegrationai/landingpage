"use client"

import React from "react"
import Link from "next/link"
import { FileText, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover:bg-[#1e71cd]/10 hover:text-[#1e71cd] transition-colors gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#1e71cd]/10 flex items-center justify-center text-[#1e71cd] shadow-lg shadow-[#1e71cd]/5">
              <FileText className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-bold text-foreground">
                Terms of Service
              </h1>
              <p className="text-muted-foreground mt-2 font-medium">
                Standard Agreement for Professional Services
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12 text-foreground/80 leading-relaxed text-lg">
            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e71cd]" />
                1. Contractual Agreement
              </h2>
              <p>
                By engaging the services of Elite Surface Systems or utilizing this digital platform, you enter into a binding legal agreement. These terms govern all restoration, cleaning, and maintenance services provided by our technical crews. We reserve the exclusive right to modify these protocols to align with evolving industry standards and South Florida environmental regulations.
              </p>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e71cd]" />
                2. Professional Estimation Standards
              </h2>
              <p>
                Our precision estimates are engineered using advanced topographical site analysis. The Following conditions apply:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-6 rounded-2xl bg-background/50 border border-border">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1e71cd]" />
                    Validity Period
                  </h4>
                  <p className="text-sm">Estimates remain fixed for a period of 30 calendar days. Beyond this window, a secondary calibration may be required to account for shifting material costs or environmental changes.</p>
                </div>
                <div className="p-6 rounded-2xl bg-background/50 border border-border">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1e71cd]" />
                    Scope Accuracy
                  </h4>
                  <p className="text-sm">If subterranean conditions, hidden biological growth, or structural anomalies are discovered during execution that were not visible during estimation, a Change Order will be issued.</p>
                </div>
              </div>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e71cd]" />
                3. Operational Safety & Site Prep
              </h2>
              <p className="mb-6">To ensure an industrial-grade result while maintaining total site safety, the customer explicitly assumes the following responsibilities:</p>
              <ul className="space-y-4">
                <li className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                   <div className="w-6 h-6 rounded-full bg-[#1e71cd] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</div>
                   <p><strong>Envelope Integrity:</strong> Ensuring all HVAC intakes, electrical panels, and fenestration systems are hermetically sealed prior to the arrival of high-pressure equipment.</p>
                </li>
                <li className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                   <div className="w-6 h-6 rounded-full bg-[#1e71cd] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</div>
                   <p><strong>Utility Access:</strong> Providing an uninterrupted pressurized water supply exceeding 40 PSI at the exterior spigot during the entire duration of the restoration project.</p>
                </li>
                <li className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                   <div className="w-6 h-6 rounded-full bg-[#1e71cd] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</div>
                   <p><strong>Hazard Mitigation:</strong> Removal of all mobile assets, including vehicles, delicate landscaping elements, and pets from the designated Exclusion Zone.</p>
                </li>
              </ul>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e71cd]" />
                4. Liability Limitations
              </h2>
              <p>
                Elite Surface Systems maintains comprehensive general liability and professional insurance. However, our liability is strictly excluded in cases involving:
              </p>
              <div className="mt-6 space-y-3 text-sm italic border-l-4 border-[#1e71cd] pl-6 py-2">
                <p>— Pre-existing structural fatigue, including loose mortar, degraded sealant, or oxidized paint layers.</p>
                <p>— Water ingress resulting from defective architectural seals or non-compliant construction standards.</p>
                <p>— Post-service biological regrowth resulting from unique environmental shielding or lack of suggested maintenance.</p>
                <p>— Damage to sensitive flora if specific pre-wetting instructions provided in the service brief were not possible due to site restrictions.</p>
              </div>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e71cd]" />
                5. Financial Performance
              </h2>
              <p>
                Remuneration is due in full upon the issuance of the Certificate of Completion. For projects exceeding $2,500, a mobilization fee of 30% may be required. 
              </p>
              <p className="mt-4">
                Elite Surface Systems utilizes bank-grade encrypted payment gateways for all digital transactions. Late payments exceeding 15 days will incur a standard professional service interest rate as permitted by Florida state law.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
