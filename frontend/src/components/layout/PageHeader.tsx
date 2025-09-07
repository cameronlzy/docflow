"use client"

import { ArrowLeft } from "lucide-react"
import { HomeButton } from "@/components/ui/HomeButton"
import { UserButton } from "@/components/ui/UserButton"
import { usePathname } from "next/navigation"

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBackClick?: () => void
}

export function PageHeader({ title, subtitle, onBackClick }: PageHeaderProps) {
  const pathname = usePathname()

  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 hover:border-gray-600"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
        )}
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <HomeButton />
        <UserButton previousRoute={pathname} />
      </div>
    </div>
  )
}
