import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elite Cleaning Surface | Terms of Service",
}

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
