"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function BackButton({ from }: { from: string }) {
  return (
    <Link
      href={from}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <ArrowLeft className="w-4 h-4 text-gray-200" />
      <span className="text-gray-200 text-sm font-medium">Back</span>
    </Link>
  )
}
