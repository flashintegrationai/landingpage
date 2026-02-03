"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
}

export default function WaterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

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
    
    const resizeObserver = new ResizeObserver(resize)
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }
    resize()

    const createParticle = (): Particle => {
      const size = Math.random() * 6 + 2 // Base width of the drop
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.05, // Minimal horizontal drift
        vy: Math.random() * 5 + 4, // Slower, more elegant falling speed
        size: size,
        alpha: Math.random() * 0.4 + 0.3,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      }
    }

    // Initialize particles - Balanced density
    for (let i = 0; i < 40; i++) {
      particlesRef.current.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Wrap around vertically for continuous rain
        if (particle.y > canvas.height + 50) {
          particle.y = -50
          particle.x = Math.random() * canvas.width
        }

        const opacity = particle.alpha

        // --- DRAW TEARDROP "LIQUID GLASS" DROP ---
        const w = particle.size
        const h = particle.size * 2.5 // Elongated teardrop shape

        ctx.save()
        ctx.translate(particle.x, particle.y)
        
        // Main body path
        ctx.beginPath()
        ctx.moveTo(0, -h/2) // Top point
        ctx.bezierCurveTo(w/2, -h/2, w, h/4, 0, h/2) // Right side to bottom curve
        ctx.bezierCurveTo(-w, h/4, -w/2, -h/2, 0, -h/2) // Left side back to top
        
        // Glassy Gradient Base
        const grad = ctx.createLinearGradient(0, -h/2, 0, h/2)
        grad.addColorStop(0, `rgba(186, 230, 253, ${opacity * 0.3})`) // Transparent top
        grad.addColorStop(0.5, `rgba(30, 113, 205, ${opacity * 0.6})`) // Brand blue middle
        grad.addColorStop(1, `rgba(15, 23, 42, ${opacity * 0.2})`) // Darker bottom for depth
        
        ctx.fillStyle = grad
        ctx.fill()

        // Highlight "Glass" Reflection
        ctx.beginPath()
        ctx.ellipse(-w/4, -h/4, w/6, h/4, Math.PI / 10, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`
        ctx.fill()

        // Subtle Stroke for definition
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.restore()

        // Reset particle if out of horizontal bounds
        if (particle.x < -50 || particle.x > canvas.width + 50) {
          particlesRef.current[index] = createParticle()
          particlesRef.current[index].y = -50
        }
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      resizeObserver.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
