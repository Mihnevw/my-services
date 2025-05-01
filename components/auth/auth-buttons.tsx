"use client"

import { useState } from "react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "./auth-modal"
import { LogOut, User } from "lucide-react"

export default function AuthButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalView, setModalView] = useState<"login" | "register" | "forgot-password">("login")
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const { currentColor } = useThemeColor()
  const { user, signOut } = useAuth()

  const openLoginModal = () => {
    setModalView("login")
    setIsModalOpen(true)
  }

  const openRegisterModal = () => {
    setModalView("register")
    setIsModalOpen(true)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setShowSignOutConfirm(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (user) {
    return (
      <>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <span className="text-gray-400 dark:text-gray-300 font-medium">
              {user.email?.split('@')[0]}
            </span>
          </div>
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="flex items-center space-x-1 text-gray-400 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>

        {/* Sign Out Confirmation Modal */}
        {showSignOutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sign Out
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={openLoginModal}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
        >
          Login
        </button>
        <button
          onClick={openRegisterModal}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
          style={{
            background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
          }}
        >
          Register
        </button>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialView={modalView} />
    </>
  )
}
