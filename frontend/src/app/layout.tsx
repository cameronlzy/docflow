import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocFlow - Document Processing Made Simple",
  description:
    "Transform unstructured documents into actionable insights with AI-powered automation",
  icons: {
    icon: [
      { url: "/DocFlow_Icon.png", sizes: "16x16", type: "image/png" },
      { url: "/DocFlow_Icon.png", sizes: "32x32", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
