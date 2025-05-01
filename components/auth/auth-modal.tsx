"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import ForgotPasswordForm from "./forgot-password-form"
import { useThemeColor } from "@/contexts/theme-color-context"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  initialView?: "login" | "register" | "forgot-password"
}

export default function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "register" | "forgot-password">(initialView)
  const { currentColor } = useThemeColor()

  // Update view when initialView changes
  useEffect(() => {
    setView(initialView)
  }, [initialView])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Decorative header */}
        <div
          className="h-3"
          style={{ background: `linear-gradient(to right, ${currentColor.secondary}, ${currentColor.primary})` }}
        ></div>

        {/* Content */}
        <div className="p-8">
          {view === "login" && (
            <LoginForm
              onRegisterClick={() => setView("register")}
              onForgotPasswordClick={() => setView("forgot-password")}
            />
          )}
          {view === "register" && <RegisterForm onLoginClick={() => setView("login")} />}
          {view === "forgot-password" && <ForgotPasswordForm onBackToLogin={() => setView("login")} />}
        </div>
      </div>
    </div>
  )
}
