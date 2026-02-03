"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { triggerConfetti } from "@/lib/confetti";

const services = [
  "House Washing",
  "Driveway Cleaning",
  "Roof Cleaning",
  "Commercial",
  "Fence Restoration",
  "Patio & Deck",
  "Other",
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

                <div className="space-y-2">
                  <Label className="text-foreground/80">Service Needed *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-2 p-3 rounded-xl bg-background/50 border border-input cursor-pointer hover:border-[#1e71cd]/50 transition-colors has-[:checked]:border-[#1e71cd] has-[:checked]:bg-[#1e71cd]/10"
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          className="sr-only"
                        />
                        <span className="text-sm text-foreground/80">
                          {service}
                        </span>
                      </label>
                    ))}
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
                  By submitting this form, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
