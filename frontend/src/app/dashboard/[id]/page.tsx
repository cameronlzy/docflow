"use client"

import { useEffect, useRef, useState } from "react"
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

  const lastStatusRef = useRef<string | null>(null)
  const esRef = useRef<EventSource | null>(null)

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

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL
    if (!projectId) return

    console.log("[SSE] init", { projectId, API_BASE })

    // open one EventSource for this page
    const es = new EventSource(`${API_BASE}/events`, { withCredentials: true })
    es.onopen = () => {
      console.log("[SSE] Connection opened")
    }

    es.onmessage = (e) => {
      console.log("[SSE] Default message event:", e.data)
    }

    es.addEventListener("project-status", (e) => {
      console.log("[SSE] Project status event:", e.data)
    })

    es.onerror = (err) => {
      console.error("[SSE] Error or connection lost:", err)
    }
    esRef.current = es

    const onProjectStatus = async (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data) as {
          projectId: string
          status?: string
          updatedAt?: string
        }

        if (payload.projectId !== projectId) return

        // avoid unnecessary refetches
        const prev = lastStatusRef.current
        const next = payload.status ?? null
        if (prev === next) return

        // Re-fetch full project
        const fresh = await getProject(projectId)
        setProject(fresh)
        lastStatusRef.current = fresh?.status ?? null

        if (prev !== next && next) {
          toast.success(`Project status: ${next}`)
        }
      } catch (err) {
        // Optional: surface a small toast or console only
        console.debug("SSE handler error:", err)
      }
    }

    // Listen to the named event you publish on the server
    es.addEventListener("project-status", onProjectStatus)
    console.log("TEST")

    es.onerror = () => {
      // Browser will auto-reconnect; keep this quiet or show a subtle indicator
      console.debug("SSE error / reconnecting…")
    }

    return () => {
      es.removeEventListener("project-status", onProjectStatus)
      es.close()
      esRef.current = null
    }
  }, [projectId])

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
