import React from "react"
import { Spinner } from "./Spinner"

interface StatsCardsProps {
  projectCount: number
  totalFiles: number
  completedProjects: number
  loading?: boolean
}

export function StatsCard({
  projectCount,
  totalFiles,
  completedProjects,
  loading = false,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="text-2xl font-bold text-blue-400 mb-1">
          {loading ? <Spinner /> : projectCount}
        </div>
        <div className="text-gray-400 text-sm">Total Projects</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="text-2xl font-bold text-green-400 mb-1">
          {loading ? <Spinner /> : totalFiles}
        </div>
        <div className="text-gray-400 text-sm">Documents Processed</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="text-2xl font-bold text-yellow-400 mb-1">
          {loading ? <Spinner /> : completedProjects}
        </div>
        <div className="text-gray-400 text-sm">Completed Projects</div>
      </div>
    </div>
  )
}
