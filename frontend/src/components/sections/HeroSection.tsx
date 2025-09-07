import React, { memo } from "react"
import { Zap } from "lucide-react"
import { UploadArea } from "../ui/UploadArea"
import GetStarted from "../ui/getStarted"
import { User } from "@/types/user.types.js"

export const HeroSection = memo(({ user }: { user?: User | null }) => (
  <section className="relative px-6 py-20 lg:py-32">
    <div className="max-w-6xl mx-auto text-center">
      <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-gray-300 text-sm mb-8">
        <Zap className="w-4 h-4 mr-2" />
        Powered by Zapier & ChatGPT
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
        Document Processing
        <br />
        <span className="text-gray-400">Made Simple</span>
      </h1>

      <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
        Upload any document and extract, categorise, and process it
        automatically. Transform unstructured data into actionable insights.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <GetStarted big={true} message="Get Started ->" user={user} />
      </div>

      <UploadArea />
    </div>
  </section>
))

HeroSection.displayName = "HeroSection"
