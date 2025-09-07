import React, { memo } from "react"
import GetStarted from "../ui/getStarted"
import { User } from "@/types/user.types.js"

export const CTASection = memo(({ user }: { user?: User | null }) => (
  <section className="px-6 py-20">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to Transform Your Workflow?
      </h2>
      <p className="text-xl text-gray-400 mb-8">
        Start processing documents smarter, not harder
      </p>
      <GetStarted message="Get Started Now" big={true} user={user} />
    </div>
  </section>
))

CTASection.displayName = "CTASection"
