"use client"

import React, { memo } from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = memo<AuthLayoutProps>(({ children }) => (
  <div className="min-h-screen bg-black">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50" />

    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-10" />

    <div className="relative z-10">{children}</div>
  </div>
))

AuthLayout.displayName = "AuthLayout"
