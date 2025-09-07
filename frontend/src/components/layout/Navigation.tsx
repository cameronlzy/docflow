import React, { memo } from "react"
import { FileText } from "lucide-react"
import GetStarted from "../ui/getStarted"
import { User } from "@/types/user.types"
import DashboardButton from "../dashboard/dashboardButton"
import { Spinner } from "../ui/Spinner"

type NavigationProps = { user?: User | null; loading?: boolean }

export const Navigation = memo(({ user, loading }: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">DocFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              How it works
            </a>
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            {loading ? (
              <div className="px-16 py-0">
                <Spinner />
              </div>
            ) : user ? (
              <DashboardButton message="My Dashboard" user={user} />
            ) : (
              <GetStarted />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
})

Navigation.displayName = "Navigation"
