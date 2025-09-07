"use client"

import React, { memo } from "react"
import { FileText } from "lucide-react"
import Link from "next/link"

export const AuthHeader = memo(() => (
  <div className="text-center mb-8">
    <Link
      href="/"
      className="inline-flex items-center space-x-3 mb-8 hover:opacity-80 transition-opacity"
    >
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <FileText className="w-6 h-6 text-black" />
      </div>
      <span className="text-2xl font-bold text-white">DocFlow</span>
    </Link>

    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Welcome to DocFlow
    </h1>
    <p className="text-gray-400 text-lg">
      Start processing your documents with AI automation
    </p>
  </div>
))

AuthHeader.displayName = "AuthHeader"
