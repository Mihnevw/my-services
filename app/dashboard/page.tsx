"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useThemeColor } from "@/contexts/theme-color-context"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { currentColor } = useThemeColor()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: currentColor.primary }}></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to your Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Profile</h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Last Sign In:</span>{" "}
                  {new Date(user.last_sign_in_at || "").toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Activity</h2>
              <p className="text-gray-600 dark:text-gray-300">No recent activity to show.</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
                  }}
                  onClick={() => {
                    // TODO: Implement profile edit functionality
                    alert("Profile edit coming soon!")
                  }}
                >
                  Edit Profile
                </button>
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
                  }}
                  onClick={() => {
                    // TODO: Implement settings functionality
                    alert("Settings coming soon!")
                  }}
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 