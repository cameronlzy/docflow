"use client"

import { Spinner } from "@/components/ui/Spinner"
import StatusIcon from "@/components/ui/StatusIcon"
import { verifyEmail } from "@/services/authService"
import { FileText } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export default function VerificationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") as string
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  )

  const animatedText = useMemo(() => {
    if (status === "verifying") return "Verifying your account…"
    if (status === "success") return "Account verified!"
    return "Verification failed"
  }, [status])

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        setStatus("error")
        toast.error("Invalid verification link")
      }
      try {
        await verifyEmail(token)
        setStatus("success")
        toast.success("Successfully verified account")
        router.push("/auth")
      } catch {
        setStatus("error")
        toast.error("Invalid verification link")
      }
    }

    verifyAccount()
  }, [router, token])
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <main className="relative z-10 mx-auto flex min-h-screen max-w-xl items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-6 flex flex-col items-center gap-1">
            <div className="flex flex-row items-center gap-1">
              <FileText className="w-7 h-7 text-white" />
              <h1 className="text-2xl font-bold tracking-tight text-white">
                DocFlow
              </h1>
            </div>
            <p className="text-sm text-slate-300/80">Account Verification</p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <StatusIcon status={status} />
            <h2 className="text-xl font-semibold text-white">{animatedText}</h2>
            <p className="max-w-md text-sm text-slate-300/90">
              {status === "verifying"
                ? "Hang tight while we confirm your email token."
                : status === "success"
                ? "You can now access all features of DocFlow."
                : "Your link may be invalid or expired. You can request a new verification email from your signup page."}
            </p>

            {status === "verifying" ? (
              <>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="animate-[progress_1.6s_ease-in-out_infinite] h-full w-1/3 rounded-full bg-indigo-500" />
                </div>
                <div className="mt-2">
                  <Spinner />
                </div>
              </>
            ) : (
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    status !== "success"
                      ? "w-full bg-rose-500"
                      : "w-full bg-emerald-500"
                  }`}
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {status === "error" && (
                <>
                  <button
                    onClick={() => location.reload()}
                    className="rounded-xl bg-gray-200 px-5 py-2.5 font-medium text-black/90 
                    transition transform hover:scale-105 duration-200 hover:brightness-110"
                  >
                    Retry
                  </button>

                  <button
                    onClick={() => router.push("/")}
                    className="rounded-xl border border-white/15 px-5 py-2.5 font-medium text-white/90 
                    backdrop-blur-sm transition transform hover:scale-105 duration-200 hover:bg-white/5"
                  >
                    Go Home
                  </button>
                </>
              )}
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Tip: Didn&apos;t receive an email? Check your spam folder or
              request a new link.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
