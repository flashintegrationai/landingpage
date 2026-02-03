import Navbar from "@/components/navbar"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import BackgroundEffects from "@/components/background-effects"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <BackgroundEffects />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
            <AboutSection />
        </div>
        <Footer />
      </div>
    </main>
  )
}
