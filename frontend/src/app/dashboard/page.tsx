"use client"

import { NewProjectCard } from "@/components/dashboard/NewProjectCard"
import { ProjectCard } from "@/components/dashboard/ProjectCard"
import { Project } from "@/types/project.types"
import { Filter, Search } from "lucide-react"
import { lazy, Suspense, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentUser } from "@/services/userService"
import {
  getCurrentUserProjects,
  getCurrentUserStats,
} from "@/services/projectService"
import { toast } from "sonner"
import { User, UserStats } from "@/types/user.types"
import { HomeButton } from "@/components/ui/HomeButton"
import { UserButton } from "@/components/ui/UserButton"
import { LoadingFallback } from "@/components/index"

const StatsCard = lazy(() =>
  import("@/components/ui/StatsCard").then((m) => ({ default: m.StatsCard }))
)

export default function ProjectsDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true)
      try {
        const [currentUser, userStats] = await Promise.all([
          getCurrentUser(),
          getCurrentUserStats(),
        ])

        const projects = await getCurrentUserProjects()
        console.log(projects)
        if (projects) {
          setProjects(projects)
        }

        if (!currentUser) {
          toast.error("You must login to access the dashboard")
          router.push("/")
          return
        }

        setUser(currentUser)
        setStats(userStats)
      } catch {
        toast.error("You must login to access the dashboard")
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleProjectClick = (projectId: string) => {
    console.log(`Navigating to: /dashboard/${projectId}`)
    router.push(`/dashboard/${projectId}`)
  }

  const handleNewProjectClick = () => {
    console.log("Navigating to: /dashboard/new")
    router.push(`/dashboard/new`)
  }

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Fallback to mock data calculation if stats not loaded
  const statsData = stats || {
    projectCount: projects.length,
    totalSources: projects.reduce((sum, p) => sum + p.fileCount, 0),
    completedProjects: projects.filter((p) => p.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Projects Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your document analysis projects and summaries
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <HomeButton />
            <UserButton previousRoute={path} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-8 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>
        {!loading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              <NewProjectCard onClick={handleNewProjectClick} />
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={() => handleProjectClick(project._id)}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">
                  No projects found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        ) : (
          <LoadingFallback />
        )}

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Suspense fallback={<LoadingFallback />}>
            <StatsCard
              projectCount={statsData.projectCount}
              totalFiles={statsData.totalSources}
              completedProjects={statsData.completedProjects}
              loading={loading}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
