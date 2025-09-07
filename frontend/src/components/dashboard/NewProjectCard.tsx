import { FileText, Plus } from "lucide-react"

export const NewProjectCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="h-full bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[280px] hover:bg-gray-850"
    >
      <div className="w-16 h-16 bg-blue-950/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-900/40 transition-colors">
        <Plus className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
        Create New Project
      </h3>
      <p className="text-gray-400 text-sm text-center leading-relaxed">
        Upload documents and create a new project summary
      </p>
      <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
        <FileText className="w-3 h-3" />
        <span>PDF, Images, Documents</span>
      </div>
    </div>
  )
}
