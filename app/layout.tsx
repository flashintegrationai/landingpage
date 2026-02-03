import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: 'Elite Surface Systems | Professional Pressure Washing Services',
  description: 'Elite Surface Systems delivers cutting-edge pressure washing technology for residential and commercial properties. South Florida\'s #1 choice for high-tech surface restoration.',
  keywords: ['pressure washing', 'power washing', 'surface cleaning', 'commercial cleaning', 'residential cleaning', 'Elite Surface Systems', 'South Florida cleaning'],
  authors: [{ name: 'Bryan De Jesus Rosa Tavarez', url: 'https://bento.me/bryandejesusrt' }],
  creator: 'Bryan De Jesus Rosa Tavarez',
  publisher: 'Elite Surface Systems',
  openGraph: {
    title: 'Elite Surface Systems | Professional Pressure Washing',
    description: 'Expert industrial-grade surface restoration for residential and commercial properties.',
    type: 'website',
    url: 'https://elitesurface.com',
    siteName: 'Elite Surface Systems',
    images: [
      {
        url: '/images/whatsapp-image-2026-01-28-at-11.png',
        width: 1200,
        height: 630,
        alt: 'Elite Surface Systems Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Surface Systems | Professional Pressure Washing',
    description: 'Expert industrial-grade surface restoration for residential and commercial properties.',
    images: ['/images/whatsapp-image-2026-01-28-at-11.png'],
    creator: '@bryandejesusrt',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.jpeg',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
