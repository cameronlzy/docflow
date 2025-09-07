import React from "react"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { AuthContainer } from "@/components/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | DocFlow",
  description: "Sign in to your DocFlow account or create a new one",
}

export default function AuthPage() {
  return (
    <AuthLayout>
      <AuthContainer />
    </AuthLayout>
  )
}
