"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const GLSLWavesBackground = dynamic(
  () => import("@/components/glsl-waves-background"),
  { ssr: false }
)

const WaterParticles = dynamic(
  () => import("@/components/water-particles"),
  { ssr: false }
)

interface BackgroundEffectsProps {
  showWaves?: boolean
  showRain?: boolean
}

export default function BackgroundEffects({ 
  showWaves = true, 
  showRain = true 
}: BackgroundEffectsProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${theme === 'light' ? 'opacity-30' : 'opacity-100'}`}>
      {showWaves && <GLSLWavesBackground />}
      {showRain && <WaterParticles />}
    </div>
  )
}
