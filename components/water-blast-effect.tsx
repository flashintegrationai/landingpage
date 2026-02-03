"use client"

import { useEffect, useRef, useState } from "react"

interface Drop {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  isStuck: boolean
  stuckTime: number
  targetY: number
}

export default function WaterBlastEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)
  const hasTriggeredRef = useRef(false)
  const dropsRef = useRef<Drop[]>([])
  const animationRef = useRef<number | undefined>(undefined)

  const triggerBlast = () => {
    if (active || hasTriggeredRef.current) return
    hasTriggeredRef.current = true
    setActive(true)
    
    const canvas = canvasRef.current
    if (!canvas) return

    // Create a massive burst of tiny drops dispersed across the bottom (Confetti-like)
    const dropCount = 400 // Massive count
    const newDrops: Drop[] = []

    for (let i = 0; i < dropCount; i++) {
      const size = Math.random() * 3 + 1.5 // Exact same size range as particles but tiny
      newDrops.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        vx: (Math.random() - 0.5) * 35, 
        vy: -Math.random() * 45 - 20,   
        size: size,
        alpha: Math.random() * 0.4 + 0.3, // Matches particles alpha range
        isStuck: false,
        stuckTime: 0,
        targetY: Math.random() * (canvas.height * 0.85) + (canvas.height * 0.05)
      })
    }
    dropsRef.current = newDrops
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }
    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      dropsRef.current.forEach((drop) => {
        if (!drop.isStuck) {
          drop.x += drop.vx
          drop.y += drop.vy
          drop.vy += 1.4 // Physics

          if (drop.vy >= 0 && drop.y >= drop.targetY) {
            drop.isStuck = true
            drop.vx = 0 
            drop.vy = Math.random() * 1.5 + 0.5 // Drip
          }
        } else {
          drop.y += drop.vy
          drop.stuckTime += 1
          
          if (drop.stuckTime > 120) {
            drop.alpha -= 0.005 // Slow fade
          }
        }

        // --- DRAW EXACT "LIQUID GLASS" DROP FROM HERO ---
        const w = drop.size
        const h = drop.size * 2.5 // Exact Hero ratio
        const opacity = drop.alpha

        ctx.save()
        ctx.translate(drop.x, drop.y)
        
        if (!drop.isStuck) {
          const angle = Math.atan2(drop.vy, drop.vx) + Math.PI / 2
          ctx.rotate(angle)
        }

        // Main body path (Identical to water-particles.tsx)
        ctx.beginPath()
        ctx.moveTo(0, -h/2) // Top point
        ctx.bezierCurveTo(w/2, -h/2, w, h/4, 0, h/2) // Right side to bottom curve
        ctx.bezierCurveTo(-w, h/4, -w/2, -h/2, 0, -h/2) // Left side back to top
        
        // Glassy Gradient Base (Identical to water-particles.tsx)
        const grad = ctx.createLinearGradient(0, -h/2, 0, h/2)
        grad.addColorStop(0, `rgba(186, 230, 253, ${opacity * 0.3})`)
        grad.addColorStop(0.5, `rgba(30, 113, 205, ${opacity * 0.6})`)
        grad.addColorStop(1, `rgba(15, 23, 42, ${opacity * 0.2})`)
        
        ctx.fillStyle = grad
        ctx.fill()

        // Highlight "Glass" Reflection (Identical to water-particles.tsx)
        ctx.beginPath()
        ctx.ellipse(-w/4, -h/4, w/6, h/4, Math.PI / 10, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`
        ctx.fill()

        // Subtle Stroke for definition (Identical to water-particles.tsx)
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.restore()
      })

      dropsRef.current = dropsRef.current.filter(d => d.alpha > 0 && d.y < canvas.height + 100)

      if (dropsRef.current.length === 0 && active) {
        setActive(false)
      } else if (active) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    if (active) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [active])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        triggerBlast()
      }
    }, { threshold: 0.3 })

    const parent = canvasRef.current?.parentElement
    if (parent) {
      observer.observe(parent)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-9999"
      style={{ filter: 'contrast(1.1) brightness(1.1)' }} 
    />
  )
}
