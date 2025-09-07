"use client"

import React, { memo, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { register } from "@/services/authService"
import { validateUser } from "@/utils/user.validator" // path where you exported the TS version

type FieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "passwordConfirm"
    | "form",
    string
  >
>

export const SignUpForm = memo(() => {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const passwordRequirements = [
    { test: (pwd: string) => pwd.length >= 8, text: "At least 8 characters" },
    { test: (pwd: string) => /[A-Z]/.test(pwd), text: "One uppercase letter" },
    { test: (pwd: string) => /[0-9]/.test(pwd), text: "One number" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    const name = `${firstName} ${lastName}`.trim()

    const { error, value } = validateUser({
      name,
      email,
      password,
      passwordConfirm: confirmPassword,
    })

    if (error) {
      const next: FieldErrors = {}
      for (const d of error.details) {
        const key = String(d.path[0])
        if (key === "name") {
          // split name error across first/last for display
          next.firstName = d.message
          next.lastName = d.message
        } else if (
          key === "email" ||
          key === "password" ||
          key === "passwordConfirm"
        ) {
          next[key] = d.message
        } else {
          next.form = d.message
        }
      }
      setErrors(next)
      setIsLoading(false)
      return
    }

    try {
      await register(value)
      router.push("/") // change as needed
    } catch {
      setErrors({ form: "Could not create account. Try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white mb-2"
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white mb-2"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

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
            placeholder="john@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          {password && (
            <div className="mt-2 space-y-1">
              {passwordRequirements.map((req, i) => (
                <div key={i} className="flex items-center text-xs">
                  {req.test(password) ? (
                    <Check className="w-3 h-3 text-green-500 mr-2" />
                  ) : (
                    <X className="w-3 h-3 text-gray-500 mr-2" />
                  )}
                  <span
                    className={
                      req.test(password) ? "text-green-500" : "text-gray-500"
                    }
                  >
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          )}
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowConfirmPassword((v) => !v)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {confirmPassword && (
            <div className="mt-2 flex items-center text-xs">
              {password === confirmPassword ? (
                <>
                  <Check className="w-3 h-3 text-green-500 mr-2" />
                  <span className="text-green-500">Passwords match</span>
                </>
              ) : (
                <>
                  <X className="w-3 h-3 text-red-500 mr-2" />
                  <span className="text-red-500">
                    Passwords don&apos;t match
                  </span>
                </>
              )}
            </div>
          )}
          {errors.passwordConfirm && (
            <p className="mt-1 text-xs text-red-400">
              {errors.passwordConfirm}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || password !== confirmPassword}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  )
})

SignUpForm.displayName = "SignUpForm"
