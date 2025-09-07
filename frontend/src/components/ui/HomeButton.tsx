"use client"

import Link from "next/link"

export function HomeButton() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <span className="hidden sm:inline text-sm font-medium text-gray-200">
        Home
      </span>
    </Link>
  )
}
