"use client"

import { Sparkles } from "lucide-react"

interface ProjectDetailsFormProps {
  title: string
  description: string
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
}

export function ProjectDetailsForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: ProjectDetailsFormProps) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Project Details</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Project Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter a descriptive title for your project..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            maxLength={100}
          />
          <div className="mt-1 text-right text-xs text-gray-500">
            {title.length}/100 characters
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe what you want to analyse and what insights you're looking for..."
            rows={4}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            maxLength={500}
          />
          <div className="mt-1 text-right text-xs text-gray-500">
            {description.length}/500 characters
          </div>
        </div>
      </div>
    </div>
  )
}
