import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from "@/context/language-context"
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
    icon: '/favicon32.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
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
        <html lang="en" suppressHydrationWarning>
          <head>
            <script
              src="https://link.msgsndr.com/js/external-tracking.js"
              data-tracking-id="tk_e86876678ed543d68052afb2d95036b2"
            />
          </head>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Script 
          src="https://widgets.leadconnectorhq.com/loader.js" 
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
          data-widget-id="698692457cd1e666619d1fec"
        />
      </body>
    </html>
  )
}
