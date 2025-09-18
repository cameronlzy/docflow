import { FileText, Clock } from "lucide-react"

interface ProjectSummarySectionProps {
  status: string
  summary?: string
}

function renderWithBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function ProjectSummarySection({
  status,
  summary,
}: ProjectSummarySectionProps) {
  const isCompleted = status === "completed"
  const isPending = status === "pending"

  if (isPending) {
    return (
      <div className="bg-gray-900 rounded-lg p-8">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-semibold text-white">Processing</h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">
            Your documents are being analysed. This may take a few minutes.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            You&apos;ll be notified when the analysis is complete.
          </p>
        </div>
      </div>
    )
  }

  if (isCompleted && summary) {
    return (
      <div className="bg-gray-900 rounded-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-semibold text-white">
            Analysis Summary
          </h2>
        </div>
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {renderWithBold(summary)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-8">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-semibold text-white">Analysis Summary</h2>
      </div>
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">Analysis in progress...</p>
        <p className="text-gray-500 text-sm mt-2">
          Summary will be available once processing is complete.
        </p>
      </div>
    </div>
  )
}
