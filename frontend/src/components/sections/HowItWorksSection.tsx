import React, { memo } from "react"
import { ProcessStep } from "../ui/ProcessStep"

export const HowItWorksSection = memo(() => (
  <section id="how-it-works" className="px-6 py-20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Simple 3-Step Process
        </h2>
        <p className="text-xl text-gray-400">
          From upload to insights in under 30 seconds
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        <ProcessStep
          number={1}
          title="Upload Document"
          description="Drag & drop or browse to upload your PDF or Word document"
          showLine={true}
        />
        <ProcessStep
          number={2}
          title="AI Processing"
          description="Our AI extracts text, identifies document type, and pulls out key information"
          showLine={true}
        />
        <ProcessStep
          number={3}
          title="Get Results"
          description="View extracted data, search content, and export to your favorite tools"
          showLine={false}
        />
      </div>
    </div>
  </section>
))

HowItWorksSection.displayName = "HowItWorksSection"
