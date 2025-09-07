"use client"

import { User, Mail, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCurrentUser } from "@/services/userService"
import { getCurrentUserStats } from "@/services/projectService"
import { toast } from "sonner"
import { UserStats, User as UserType } from "@/types/user.types"
import { HomeButton } from "@/components/ui/HomeButton"
import { StatsCard } from "@/components/ui/StatsCard"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/BackButton"
import { logout } from "@/services/authService"

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const search = useSearchParams()
  const from = search.get("from") ? decodeURIComponent(search.get("from")!) : ""

  useEffect(() => {
    async function fetchUserData() {
      try {
        const [currentUser, userStats] = await Promise.all([
          getCurrentUser(),
          getCurrentUserStats(),
        ])
        if (!currentUser) {
          toast.error("You must login to access the profile")
          router.push("/")
          return
        }
        setUser(currentUser)
        setStats(userStats)
      } catch {
        toast.error("Failed to load profile data")
        router.push("/")
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      router.push("/")
    } catch {
      toast.error("Failed to logout")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user || !stats) return null

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {from ? (
              <>
                <BackButton from={from} />
                <HomeButton />
              </>
            ) : (
              <HomeButton />
            )}
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 hover:bg-red-950/80 hover:border-red-800/30"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Your account information and statistics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  User Information
                </h2>
                <p className="text-gray-400">Your account details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 uppercase tracking-wide">
                  Name
                </label>
                <div className="mt-1 text-lg text-white font-medium">
                  {user.name || "Not provided"}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 uppercase tracking-wide">
                  Email
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-lg text-white font-medium">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Account Summary
            </h2>
            <p className="text-gray-400 mb-6">Overview of your activity</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Account status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your Statistics
            </h2>
            <p className="text-gray-400">
              Your project and document processing activity
            </p>
          </div>

          <StatsCard
            projectCount={stats.projectCount}
            totalFiles={stats.totalSources}
            completedProjects={stats.completedProjects}
          />
        </div>
      </div>
    </div>
  )
}
