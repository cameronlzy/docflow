import React, { memo } from "react"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  showLine?: boolean
}

export const ProcessStep = memo<ProcessStepProps>(
  ({ number, title, description, showLine = false }) => (
    <div className="text-center relative">
      {showLine && (
        <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-white to-gray-600 transform"></div>
      )}
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-black text-2xl font-bold relative z-10">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
)

ProcessStep.displayName = "ProcessStep"
