"use client"

import React, { memo, useState, useRef, useCallback } from "react"
import { Upload, FileText, File, X, CheckCircle } from "lucide-react"

interface UploadedFile {
  id: string
  file: File
  name: string
  size: string
  type: "pdf" | "document"
}

interface UploadAreaProps {
  onFilesChange?: (files: UploadedFile[]) => void
  maxFiles?: number
  maxSizeMB?: number
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const getFileType = (file: File): "pdf" | "document" => {
  if (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  )
    return "pdf"
  return "document"
}

const getFileIcon = (type: "pdf" | "document") => {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-400" />
    case "document":
    default:
      return <FileText className="w-5 h-5 text-green-400" />
  }
}

export const UploadArea = memo<UploadAreaProps>(
  ({ onFilesChange, maxFiles = 4, maxSizeMB = 10 }) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const acceptedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".pdf",
      ".docx",
    ]

    const processFiles = useCallback(
      async (files: File[]) => {
        setError(null)
        setIsUploading(true)

        const validFiles: UploadedFile[] = []
        for (const file of files) {
          if (file.size > maxSizeMB * 1024 * 1024) {
            setError(
              `${file.name} is too large. Maximum size is ${maxSizeMB}MB.`
            )
            continue
          }

          const isValidType = acceptedTypes.some((type) => {
            if (type.startsWith("."))
              return file.name.toLowerCase().endsWith(type)
            return file.type === type
          })
          if (!isValidType) {
            setError(`${file.name} is not a supported file type.`)
            continue
          }

          const fileType = getFileType(file)

          const uploadedFile: UploadedFile = {
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: formatFileSize(file.size),
            type: fileType,
          }

          validFiles.push(uploadedFile)
        }

        if (uploadedFiles.length + validFiles.length > maxFiles) {
          setError(`Maximum ${maxFiles} files allowed.`)
          setIsUploading(false)
          return
        }

        const newFiles = [...uploadedFiles, ...validFiles]
        setUploadedFiles(newFiles)
        onFilesChange?.(newFiles)

        setTimeout(() => {
          setIsUploading(false)
        }, 1000)
      },
      [uploadedFiles, maxFiles, maxSizeMB, onFilesChange]
    )

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const files = Array.from(e.dataTransfer.files)
        processFiles(files)
      },
      [processFiles]
    )

    const handleFileSelect = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) processFiles(Array.from(files))
        e.target.value = ""
      },
      [processFiles]
    )

    const removeFile = useCallback(
      (fileId: string) => {
        const newFiles = uploadedFiles.filter((file) => file.id !== fileId)
        setUploadedFiles(newFiles)
        onFilesChange?.(newFiles)
      },
      [uploadedFiles, onFilesChange]
    )

    const handleClick = () => {
      fileInputRef.current?.click()
    }

    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div
          className={`
          bg-gray-950 border-2 border-dashed rounded-xl p-12 transition-all duration-200 cursor-pointer group
          ${
            isDragOver
              ? "border-white bg-gray-900"
              : "border-gray-700 hover:border-gray-600"
          }
          ${isUploading ? "pointer-events-none opacity-75" : ""}
        `}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />

          <Upload
            className={`
          w-12 h-12 mx-auto mb-4 transition-all duration-200
          ${
            isDragOver
              ? "text-white scale-110"
              : "text-gray-400 group-hover:text-white group-hover:scale-105"
          }
          ${isUploading ? "animate-bounce" : ""}
        `}
          />

          <p
            className={`text-lg mb-2 transition-colors duration-200 ${
              isDragOver ? "text-white" : "text-gray-300"
            }`}
          >
            {isUploading
              ? "Processing files..."
              : isDragOver
              ? "Drop files here"
              : "Drop your documents here or click to browse"}
          </p>

          <p className="text-gray-500 text-sm">
            PDF or DOCX only • Max {maxSizeMB}MB per file • Max {maxFiles} files
          </p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-800 rounded-lg p-4 flex items-center justify-between">
            <span className="text-red-300 text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium">
              Uploaded Files ({uploadedFiles.length}/{maxFiles})
            </h3>

            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-gray-400 text-sm">{file.size}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-3 text-gray-400 hover:text-red-400 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

UploadArea.displayName = "UploadArea"
