import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Divya Jyoty | macOS Portfolio',
  description: 'Personal portfolio of Divya Jyoty, AI Engineer and Full Stack Developer showcasing Deep Learning, GPU acceleration, and software engineering projects',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children} <Analytics /></body>
    </html>
  )
}
