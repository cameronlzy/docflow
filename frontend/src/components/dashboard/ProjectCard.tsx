import { FileType, ProjectFile, ProjectFull } from "@/types/project.types.js"
import { Calendar, ChevronRight, Clock, File } from "lucide-react"
import { getFileTypeIcon, ProjectStatusBadge } from "../ui/project.helpers"

export const ProjectCard = ({
  project,
  onClick,
}: {
  project: ProjectFull
  onClick: (_id: string) => void
}) => {
  return (
    <div
      onClick={() => onClick(project._id)}
      className="bg-gray-900 h-full border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-200 cursor-pointer group hover:bg-gray-850 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
              {project?.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description.split(" ").slice(0, 40).join(" ")}
              {project.description.split(" ").length > 40 && " ..."}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <File className="w-4 h-4" />
              <span>
                {project.sources.length}{" "}
                {project.sources.length > 1 ? "files" : "file"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {project.sources.map((source: ProjectFile) => (
                <div key={source._id} className="flex items-center">
                  {getFileTypeIcon(source.type)}
                </div>
              ))}
            </div>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>Created {new Date(project.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Updated {new Date(project.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
