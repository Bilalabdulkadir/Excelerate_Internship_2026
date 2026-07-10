import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ISR Blog Example",
  description: "A minimal example of Incremental Static Regeneration in Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.className} text-foreground antialiased`}>{children}</body>
    </html>
  )
}
