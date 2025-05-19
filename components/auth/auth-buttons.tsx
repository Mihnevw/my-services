"use client"

import { useState } from "react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { User, ChevronDown, X } from "lucide-react"
import AuthModal from "./auth-modal"
import Link from "next/link"

export default function AuthButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalView, setModalView] = useState<"login" | "register" | "forgot-password">("login")
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { currentColor } = useThemeColor()
  const { user, signOut } = useAuth()
  const { t } = useLanguage()

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
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity p-2 rounded-full"
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              <span className="text-gray-400 dark:text-gray-300 font-medium hidden md:inline">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300 hidden md:inline" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("menu")}
                    </span>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full"
                      aria-label="Close menu"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    {t("profile")}
                  </Link>

                  {/* Language Switcher
                  <div className="px-4 py-2">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {t("language")}
                    </div>
                    <div className="space-y-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang)
                            setShowProfileMenu(false)
                          }}
                          className={`w-full flex items-center px-2 py-1.5 text-sm rounded-md transition-colors ${
                            language.code === lang.code
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                          {language.code === lang.code && (
                            <Globe className="ml-auto h-4 w-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div> */}

                  <button
                    onClick={() => {
                      setShowSignOutConfirm(true)
                      setShowProfileMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    {t("signOut")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sign Out Confirmation Modal - Improved for mobile */}
        {showSignOutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full relative">
              {/* Mobile-friendly close button */}
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("signOut")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("signOutConfirm")}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700 rounded-md"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
                  }}
                >
                  {t("signOut")}
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
      <div className="flex items-center space-x-2">
        <button
          onClick={openLoginModal}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-full"
        >
          {t("login")}
        </button>
        <button
          onClick={openRegisterModal}
          className="text-white font-medium py-2 px-4 rounded-full transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
          }}
        >
          {t("register")}
        </button>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialView={modalView} />
    </>
  )
}
