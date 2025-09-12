"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ApiResponse } from "@/types/api.types.js"

type Props = {
  /** Prefill the email field (optional) */
  initialEmail?: string
  /** Called when user clicks “Back” (optional) */
  onBack?: () => void
  /** Your API caller — must throw on error with a message if possible */
  sendEmail: (email: string) => Promise<ApiResponse<unknown>>
}

export default function SendVerification({
  initialEmail = "",
  onBack,
  sendEmail,
}: Props) {
  const [email, setEmail] = useState(initialEmail)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email")
      return
    }
    setIsSubmitting(true)
    try {
      await sendEmail(email)
      toast.success("Verification email sent")
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else if (typeof err === "string") {
        toast.error(err)
      } else {
        toast.error("Failed to send verification email")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
      <div className="mb-5 flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Resend Verification
          </h2>
          <p className="text-xs text-white/70">
            Enter your email to receive a new link
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="verify-email"
            className="mb-2 block text-sm font-medium text-white"
          >
            Email
          </label>
          <Input
            id="verify-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            className="rounded-xl bg-white text-black hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Verification Email"}
          </Button>

          {onBack && (
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl border border-white/15 bg-transparent text-white hover:bg-white/5"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}
        </div>

        <p className="pt-1 text-xs text-white/60">
          Tip: Check your spam folder if you don&apos;t see the email.
        </p>
      </form>
    </div>
  )
}
