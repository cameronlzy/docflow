"use client"

import React, { memo } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image.js"

export const SocialAuth = memo(() => (
  <div className="space-y-4">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-black px-4 text-gray-400">Or continue with</span>
      </div>
    </div>

    <div>
      <Button variant="outline" className="w-full text-md hover:bg-gray-200">
        <Image
          src="/google-black-icon.jpeg"
          alt="Google"
          width={20}
          height={20}
        />
        Google
      </Button>
    </div>
  </div>
))

SocialAuth.displayName = "SocialAuth"
