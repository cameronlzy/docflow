import { File, FileText, Image } from "lucide-react"

export type ProjectFile = {
  id: string
  name: string
  type: string
  size: string
}

type ProjectFilesSectionProps = {
  files: ProjectFile[]
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-400" />
    case "image":
      return <Image className="w-5 h-5 text-blue-400" />
    case "document":
      return <File className="w-5 h-5 text-green-400" />
    default:
      return <File className="w-5 h-5 text-gray-400" />
  }
}

const getFileTypeColor = (type: string) => {
  switch (type) {
    case "pdf":
      return "text-red-400 bg-red-950/50 border-red-800"
    case "image":
      return "text-blue-400 bg-blue-950/50 border-blue-800"
    case "document":
      return "text-green-400 bg-green-950/50 border-green-800"
    default:
      return "text-gray-400 bg-gray-950/50 border-gray-800"
  }
}

export function ProjectFilesSection({ files }: ProjectFilesSectionProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Project Files</h2>
        <span className="text-gray-400">{files.length} files</span>
      </div>

      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
          >
            {getFileIcon(file.type)}

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-white font-medium truncate">{file.name}</p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs border ${getFileTypeColor(
                    file.type
                  )}`}
                >
                  {file.type.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
