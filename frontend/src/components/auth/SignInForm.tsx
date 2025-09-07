"use client"

import React, { memo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { validateLogin } from "@/utils/user.validator"
import { login } from "@/services/authService"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type FieldErrors = Partial<Record<"email" | "password" | "form", string>>

export const SignInForm = memo(() => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    const { error, value } = validateLogin({ email, password })
    if (error) {
      const next: FieldErrors = {}
      for (const d of error.details) {
        const key = d.path[0] as "email" | "password" | undefined
        if (key) next[key] = d.message
      }
      setErrors(next)
      setIsLoading(false)
      return
    }

    try {
      await login({ identifier: value.email, password: value.password })
      router.push("/dashboard")
      toast.success("Successfully logged in!")
    } catch (err: unknown) {
      setErrors({ form: "Invalid email or password" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-xs text-red-400">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      <div>
        <a
          href="#"
          className="text-sm text-white hover:text-gray-300 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
})

SignInForm.displayName = "SignInForm"
