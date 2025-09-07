import React, { memo } from "react"
import { Zap, FileText, Shield, ListChecks } from "lucide-react"
import { FeatureCard } from "../ui/FeatureCard"

export const FeaturesSection = memo(() => (
  <section id="features" className="px-6 py-20 bg-gray-950/50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Choose <span className="text-gray-400">DocFlow</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Intelligent automation that transforms how you handle documents
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Zap}
          title="Lightning Fast OCR"
          description="Extract text from any document in seconds using advanced AI-powered OCR technology. Support for 50+ languages and complex layouts."
          delay={0}
        />
        <FeatureCard
          icon={FileText}
          title="Smart Classification"
          description="Automatically categorise documents by type, extract key data points, and organize everything in a searchable database."
          delay={100}
        />
        <FeatureCard
          icon={ListChecks}
          title="Data Summarisation"
          description="Generate concise summaries of lengthy documents, highlight essential insights, and present information in a clear, accessible format."
          delay={200}
        />
      </div>
    </div>
  </section>
))

FeaturesSection.displayName = "FeaturesSection"
