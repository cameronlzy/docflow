"use client"

import { UploadArea } from "@/components/ui/UploadArea"
import { UploadedFile } from "@/types/project.types.js"

interface FileUploadSectionProps {
  files: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
}

export function FileUploadSection({ onFilesChange }: FileUploadSectionProps) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Documents</h2>
        <p className="text-gray-400">
          Upload up to 4 files for analysis. Supported formats: PDF, PNG, JPG,
          DOCX
        </p>
      </div>

      <UploadArea onFilesChange={onFilesChange} maxFiles={4} maxSizeMB={10} />
    </div>
  )
}
