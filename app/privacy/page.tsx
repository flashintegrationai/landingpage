"use client"

import React from "react"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover:bg-primary/10 hover:text-primary transition-colors gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-(family-name:--font-orbitron) text-3xl md:text-5xl font-bold text-foreground">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground mt-2 font-medium">
                Last updated: February 2026
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12 text-foreground/80 leading-relaxed text-lg">
            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                1. Comprehensive Information Collection
              </h2>
              <p className="mb-4">
                At Elite Surface Systems, we are committed to safeguarding your personal data. We collect information that identifies, relates to, or describes you ("Personal Information") in the following contexts:
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Direct Identification</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Full legal name and company name (if applicable).</li>
                    <li>Primary and secondary contact phone numbers.</li>
                    <li>Professional email addresses for project coordination.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Service-Specific Data</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Physical property address and specific service locations.</li>
                    <li>Digital photographs of areas requiring restoration.</li>
                    <li>Project-specific notes and accessibility details.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                2. Strategic Use of Data
              </h2>
              <p>
                The information we collect is utilized to deliver the highest standard of industrial-grade surface restoration. Our data processing includes:
              </p>
              <ul className="list-none pl-0 mt-6 space-y-4">
                <li className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p><strong>Operational Execution:</strong> Scheduling logistics, dispatching specialized crews, and ensuring our high-pressure equipment is configured correctly for your specific surface types.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p><strong>Quality Assurance:</strong> Reviewing project history and "before-and-after" documentation to ensure our 100% satisfaction guarantee is met on every project.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p><strong>Technical Support:</strong> Providing long-term maintenance advice and surface protection recommendations tailored to your South Florida climate conditions.</p>
                </li>
              </ul>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                3. Advanced Data Security Protocols
              </h2>
              <p>
                We employ sophisticated technical and organizational measures designed to secure your personal information from accidental loss and unauthorized access. 
              </p>
              <p className="mt-4">
                All digital records are encrypted at rest using AES-256 standards and transmitted via secure TLS (Transport Layer Security) channels. Our staff undergoes regular privacy training, and access to customer databases is controlled via strict multi-factor authentication (MFA) and least-privilege access principles.
              </p>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                4. Ethical Information Sharing
              </h2>
              <p>
                Elite Surface Systems operates on a principle of absolute transparency. We do not monetize your data through sales or rentals to advertising networks. Sharing only occurs under these strict conditions:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-sm italic">
                <li>With infrastructure providers (like AWS or Vercel) necessary to host this digital platform.</li>
                <li>With payment processors (like Stripe or Square) to securely handle transaction data.</li>
                <li>When required by law to comply with a judicial proceeding or court order.</li>
              </ul>
            </section>

            <section className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                5. Global Standards & Compliance
              </h2>
              <p>
                While we primarily serve the South Florida region, we align our privacy practices with modern data protection principles. You maintain the right to:
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                {['Access Records', 'Request Correction', 'Data Portability', 'Right to Erasure'].map((right) => (
                  <span key={right} className="px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-widest text-[#1e71cd]">
                    {right}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-sm text-center">
                For all privacy-related inquiries, please contact our Data Compliance Officer at:
                <br />
                <span className="text-primary font-black mt-2 block">privacy@elitesurface.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
