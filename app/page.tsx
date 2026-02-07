import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import FeaturesSection from "@/components/features-section"
import ProcessSection from "@/components/process-section"
import GallerySection from "@/components/gallery-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import QuoteModal from "@/components/quote-modal"
import LegalModals from "@/components/legal-modals"
import DiscountPopup from "@/components/discount-popup"
import BackgroundEffects from "@/components/background-effects"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <FloatingContact />
      <QuoteModal />
      <DiscountPopup />
      <LegalModals />
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <ProcessSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
