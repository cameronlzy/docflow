"use client"

import { Suspense } from "react"
import VerificationClient from "../../components/emailVerification/VerificationClient"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-black text-white">
          Loading…
        </div>
      }
    >
      <VerificationClient />
    </Suspense>
  )
}
