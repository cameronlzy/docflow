"use client"

import React, { memo, Suspense, useEffect, useState } from "react"
import {
  Navigation,
  Footer,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection,
  LoadingFallback,
} from "@/components"
import { getCurrentUser } from "@/services/userService"
import { User } from "@/types/user.types"

const HomePage = memo(() => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={<LoadingFallback />}>
        <Navigation user={user} loading={loading} />
        <main>
          <HeroSection user={user} />
          <FeaturesSection />
          <HowItWorksSection />
          <CTASection user={user} />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
})

HomePage.displayName = "HomePage"

export default HomePage
