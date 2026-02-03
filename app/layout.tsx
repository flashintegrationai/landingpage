import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  description: 'Elite Surface Systems delivers cutting-edge pressure washing technology for residential and commercial properties. Experience the future of surface cleaning with our professional team.',
  keywords: ['pressure washing', 'power washing', 'surface cleaning', 'commercial cleaning', 'residential cleaning', 'Elite Surface Systems'],
  openGraph: {
    title: 'Elite Surface Systems | Professional Pressure Washing',
    description: 'Experience next-level pressure washing technology for pristine results.',
    type: 'website',
  },
    generator: 'v0.app'
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
      </body>
    </html>
  )
}
