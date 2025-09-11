"use client"

import { UploadedFile } from "@/types/project.types.js"

type ProjectSummaryCardProps = {
  title: string
  description: string
  files: UploadedFile[]
}

export function ProjectSummaryCard({
  title,
  description,
  files,
}: ProjectSummaryCardProps) {
  if (!title && !description && files.length === 0) return null

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Project Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-xl font-bold text-blue-400 mb-1">
            {title ? "✓" : "○"}
          </div>
          <div className="text-gray-400 text-sm">Title</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-xl font-bold text-green-400 mb-1">
            {description ? "✓" : "○"}
          </div>
          <div className="text-gray-400 text-sm">Description</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-xl font-bold text-yellow-400 mb-1">
            {files.length}/4
          </div>
          <div className="text-gray-400 text-sm">Files Uploaded</div>
        </div>
      </div>
    </div>
  )
}
