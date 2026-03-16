import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elite Cleaning Surface | Privacy Policy",
}

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
