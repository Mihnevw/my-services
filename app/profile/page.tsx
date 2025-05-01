"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import ProfilePage from "@/components/profile/profile-page"
import Navbar from "@/components/navbar"
import { ArrowLeft } from "lucide-react"

export default function Profile() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </button>
          <ProfilePage />
        </div>
      </main>
    </>
  )
}
