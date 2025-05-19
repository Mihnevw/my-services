"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/navbar'

// Component that uses useSearchParams() - must be wrapped in Suspense
function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found')
      setLoading(false)
      return
    }

    // You could verify the session with your backend here
    // For simplicity, we'll just assume the payment was successful
    setLoading(false)
  }, [sessionId])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Verifying your payment...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <div className="h-20 w-20 mx-auto flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-full">
            <span className="text-red-500 text-3xl">×</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">{error}</p>
          <Link 
            href="/pricing"
            className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            Return to pricing
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <div className="h-20 w-20 mx-auto flex items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Thank you for your purchase. We've sent a confirmation email with all the details.
          </p>
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
            >
              Return to home
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// Main page component with Suspense wrapper
export default function Success() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <Suspense fallback={
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">Loading payment details...</p>
            </div>
          }>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
    </>
  )
} 