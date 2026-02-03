"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { triggerConfetti } from "@/lib/confetti";
import Link from "next/link";

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

const services = [
  { label: "Pressure Washing", icon: ServiceIcons.PressureWashing },
  { label: "House Washing", icon: ServiceIcons.HouseWashing },
  { label: "Roof Cleaning", icon: ServiceIcons.RoofCleaning },
  { label: "Screen Enclosures", icon: ServiceIcons.ScreenEnclosure },
  { label: "Driveway Cleaning", icon: ServiceIcons.Driveway },
  { label: "Commercial", icon: ServiceIcons.Commercial },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    triggerConfetti();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-background transition-colors duration-300"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e71cd]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e71cd]/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#1e71cd]/10 text-[#1e71cd] text-sm font-semibold mb-4 border border-[#1e71cd]/20">
            Contact Us
          </span>
          <h2 className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-balance">Get Your Free Quote</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 leading-relaxed">
            Ready to transform your property? Fill out the form below and
            {"we'll"} get back to you within 24 hours.
          </p>
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
                <h3 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-foreground mb-4">
                  Thank You!
                </h3>
                <p className="text-foreground/60 mb-6">
                  Your message has been sent successfully. {"We'll"} get back to
                  you within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground/80">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="John Doe"
                      className="bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground/80">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(123) 456-7890"
                      className="bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground/80">
                    Property Address *
                  </Label>
                  <Input
                    id="address"
                    required
                    placeholder="123 Main St, Miami, FL"
                    className="bg-background/50 border-input text-foreground placeholder:text-foreground/40 focus:border-[#1e71cd] focus:ring-[#1e71cd]/20"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-foreground/80 text-lg font-bold">Select Which Services You Need</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground/80">
                    Additional Details
                  </Label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us more about your project..."
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Get Free Quote
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-foreground/40">
                  By submitting this form, you agree to our{" "}
                  <Link 
                    href="/privacy"
                    className="underline hover:text-primary transition-colors cursor-pointer"
                  >
                    privacy policy
                  </Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
