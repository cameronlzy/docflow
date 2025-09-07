import { FileText, Image, File } from "lucide-react"

export const getFileTypeIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-4 h-4 text-red-400" />
    case "image":
      return <Image className="w-4 h-4 text-blue-400" />
    case "document":
      return <FileText className="w-4 h-4 text-green-400" />
    default:
      return <File className="w-4 h-4 text-gray-400" />
  }
}

type ProjectStatusBadgeProps = {
  status: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-400 bg-green-950/50 border-green-800"
    case "pending":
      return "text-yellow-400 bg-yellow-950/50 border-yellow-800"
    default:
      return "text-gray-400 bg-gray-950/50 border-gray-800"
  }
}

export const ProjectStatusBadge = ({ status }: ProjectStatusBadgeProps) => {
  return (
    <div
      className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
        status
      )}`}
    >
      {status.replace("-", " ")}
    </div>
  )
}
