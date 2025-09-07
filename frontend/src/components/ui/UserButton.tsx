"use client"

import Link from "next/link"
import { User } from "lucide-react"

interface UserButtonProps {
  previousRoute?: string
}

export function UserButton({ previousRoute }: UserButtonProps) {
  const href = previousRoute
    ? `/profile?from=${encodeURIComponent(previousRoute)}`
    : "/profile"

  return (
    <Link
      href={href}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <User className="w-5 h-5 text-gray-200" />
      <span className="hidden sm:inline text-sm font-medium text-gray-200">
        Account
      </span>
    </Link>
  )
}
