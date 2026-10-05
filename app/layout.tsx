import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

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
