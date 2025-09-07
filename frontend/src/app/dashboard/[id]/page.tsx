"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { ProjectHeader } from "@/components/project/ProjectHeader"
import { ProjectSummarySection } from "@/components/project/ProjectSummarySection"
import { ProjectFilesSection } from "@/components/sections/ProjectFilesSection"
import { ProjectFull } from "@/types/project.types"
import { deleteProject, getProject } from "@/services/projectService"

export default function ProjectDetailsPage() {
  const [project, setProject] = useState<ProjectFull | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProject(projectId)

        if (!projectData) {
          toast.error("Project not found")
          router.push("/dashboard")
          return
        }

        setProject(projectData)
      } catch {
        toast.error("Failed to load project details")
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId, router])

  const handleBackClick = () => {
    router.push("/dashboard")
  }

  const handleDelete = async () => {
    try {
      await deleteProject(projectId)
      toast.success("Project deleted successfully")
      router.push("/dashboard")
    } catch {
      toast.error("Failed to delete project")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <ProjectHeader
          project={project}
          onBackClick={handleBackClick}
          onDelete={handleDelete}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProjectSummarySection
              status={project.status}
              summary={project.summary}
            />
          </div>

          <div className="lg:col-span-1">
            <ProjectFilesSection files={project.sources} />
          </div>
        </div>
      </div>
    </div>
  )
}
