"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PageHeader } from "@/components/layout/PageHeader"
import { ProjectDetailsForm } from "@/components/forms/ProjectDetailsForm"
import { FileUploadSection } from "@/components/forms/FileUploadSection"
import { ProjectSummaryCard } from "@/components/forms/ProjectSummaryCard"
import { FormActions } from "@/components/forms/FormActions"
import {
  createProject,
  deleteProject,
  uploadProjectFile,
} from "@/services/projectService"
import { UploadedFile } from "@/types/project.types.js"

export default function NewProjectPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()
  const canSubmit = title.trim() && description.trim() && files.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setIsCreating(true)

    try {
      const project = await createProject({ title, description })
      const projectId = project._id
      try {
        await Promise.all(
          files.map((f) => uploadProjectFile(projectId, f.file))
        )
      } catch (err) {
        // if any upload fails, clean up the project
        try {
          await deleteProject(projectId)
        } catch (cleanupErr) {
          console.error("Failed to clean up project:", cleanupErr)
        }
        throw err
      }

      toast.success("Project created successfully")
      router.push("/dashboard")
    } catch {
      toast.error("Failed to create project. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  console.log(files)

  const handleGoBack = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="Create New Project"
          subtitle="Upload your documents and let AI analyse them for insights"
          onBackClick={handleGoBack}
        />

        <form onSubmit={handleSubmit} className="space-y-8 mb-8">
          <ProjectDetailsForm
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />

          <FileUploadSection files={files} onFilesChange={setFiles} />

          <FormActions
            isCreating={isCreating}
            canSubmit={!!canSubmit}
            onCancel={handleGoBack}
            onSubmit={() => {}}
            filesCount={files.length}
            hasTitle={!!title}
            hasDescription={!!description}
          />
        </form>

        <ProjectSummaryCard
          title={title}
          description={description}
          files={files}
        />
      </div>
    </div>
  )
}
