"use client"

import React, { memo, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthHeader } from "./AuthHeader"
import { SignInForm } from "./SignInForm"
import { SignUpForm } from "./SignUpForm"
import { SocialAuth } from "./SocialAuth"

const LoadingForm = () => (
  <div className="space-y-4">
    <div className="h-12 bg-gray-800 rounded-lg animate-pulse" />
    <div className="h-12 bg-gray-800 rounded-lg animate-pulse" />
    <div className="h-12 bg-gray-800 rounded-lg animate-pulse" />
  </div>
)

export const AuthContainer = memo(() => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="w-full max-w-md">
      <AuthHeader />

      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-6">
            <Suspense fallback={<LoadingForm />}>
              <SignInForm />
            </Suspense>
            <SocialAuth />
          </TabsContent>

          <TabsContent value="signup" className="space-y-6">
            <Suspense fallback={<LoadingForm />}>
              <SignUpForm />
            </Suspense>
            <SocialAuth />
          </TabsContent>
        </Tabs>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
))

AuthContainer.displayName = "AuthContainer"
