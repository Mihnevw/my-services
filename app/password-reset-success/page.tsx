"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function PasswordResetSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Automatically redirect to login page after 5 seconds
    const timer = setTimeout(() => {
      router.push("/login")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Password Reset Successful
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your password has been successfully reset. You will be automatically redirected to the login page in a few seconds.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Go to Login
        </button>

        <div className="mt-4">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Redirecting...
          </span>
        </div>
      </div>
    </div>
  )
} 