"use client"

import { useThemeColor } from "@/contexts/theme-color-context"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  const { currentColor } = useThemeColor()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Didn't receive the email?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check your spam folder or{" "}
              <button
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                onClick={() => {
                  // Here you would typically resend the verification email
                  alert("Verification email resent!")
                }}
              >
                click here to resend
              </button>
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              After verifying your email, you can{" "}
              <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                sign in to your account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 