import { ArrowLeft, Calendar, FileText } from "lucide-react"
import { ProjectStatusBadge } from "../ui/project.helpers"
import { Project } from "@/types/project.types"
import { Button } from "../ui/button"

interface ProjectHeaderProps {
  project: Project
  onBackClick: () => void
  onDelete: () => void
}

export function ProjectHeader({
  project,
  onBackClick,
  onDelete,
}: ProjectHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-gray-400 text-lg mb-4">{project.description}</p>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <FileText className="w-4 h-4" />
          <span>{project.fileCount} files</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>
            Created {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-end space-x-10 text-gray-400">
          <div className="flex flex-row space-x-2 items-center">
            <Calendar className="w-4 h-4" />
            <span>
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={onDelete}
            >
              Delete Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
