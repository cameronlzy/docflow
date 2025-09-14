import React, { memo } from "react"

export const AboutSection = memo(() => (
  <section id="about" className="px-6 py-20 bg-gray-900/50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why We Built This
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Transforming how teams interact with their documents
        </p>
      </div>

      <div className="flex flex-row gap-12 justify-center">
        <div className="space-y-6 flex-1">
          <h3 className="text-2xl font-bold text-white">
            The Problem We Solved
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Information scattered across countless documents creates
            bottlenecks. Teams waste hours manually extracting key details,
            searching through lengthy PDFs, and struggling to synthesise
            important insights from their document libraries.
          </p>
        </div>

        <div className="space-y-6 flex-1">
          <h3 className="text-2xl font-bold text-white">Our Solution</h3>
          <p className="text-gray-400 leading-relaxed">
            This app was designed to streamline the entire document
            summarization process. By leveraging advanced AI technology,
            we&apos;ve created a seamless workflow that extracts, processes, and
            presents your document content in a digestible format—enabling
            better decision-making and improved information flow across your
            organisation.
          </p>
        </div>
      </div>
    </div>
  </section>
))

AboutSection.displayName = "AboutSection"
