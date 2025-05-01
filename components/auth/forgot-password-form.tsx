"use client"

import type React from "react"
import { useState } from "react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { useAuth } from "@/contexts/auth-context"
import { Mail, AlertCircle, ArrowLeft } from "lucide-react"

type ForgotPasswordFormProps = {
  onBackToLogin: () => void
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{
    email?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { currentColor } = useThemeColor()
  const { resetPassword } = useAuth()

  const validateForm = () => {
    const newErrors: {
      email?: string
    } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleResetPassword = async () => {
    setIsLoading(true)
    setErrors({})

    try {
      await resetPassword(email)
      setIsSuccess(true)
    } catch (error) {
      let errorMessage = 'An error occurred while sending reset instructions'
      
      // Handle specific Supabase error messages
      if (error instanceof Error) {
        switch (error.message) {
          case 'Email rate limit exceeded':
            errorMessage = 'Too many attempts. Please try again later.'
            break
          case 'Email not confirmed':
            errorMessage = 'Please verify your email address first.'
            break
          case 'User not found':
            errorMessage = 'No account found with this email address.'
            break
          default:
            errorMessage = error.message
        }
      }
      
      setErrors({
        general: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    await handleResetPassword()
  }

  const handleResend = async () => {
    setIsResending(true)
    setErrors({})

    try {
      await resetPassword(email)
      // Show temporary success message
      const tempErrors = { ...errors }
      delete tempErrors.general
      setErrors({
        ...tempErrors,
        general: "Reset instructions sent again. Please check your email."
      })
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.general
          return newErrors
        })
      }, 5000)
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to resend reset instructions'
      })
    } finally {
      setIsResending(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We've sent password reset instructions to {email}
        </p>
        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Resending...
              </>
            ) : (
              "Didn't receive the email? Click to resend"
            )}
          </button>
          <button
            onClick={onBackToLogin}
            className="text-gray-600 dark:text-gray-400 hover:underline font-medium flex items-center justify-center mx-auto"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
          <AlertCircle size={18} className="text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input w-full pl-10 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
            }}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? "Sending instructions..." : "Send reset instructions"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onBackToLogin}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center justify-center mx-auto"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </button>
      </div>
    </div>
  )
} 