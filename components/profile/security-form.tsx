"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Loader2, Shield, Lock, KeyRound } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/language-context" 

type SecurityFormProps = {
  email: string
}

export default function SecurityForm({ email }: SecurityFormProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const { currentColor } = useThemeColor()
  const router = useRouter()
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    if (successMessage) {
      setSuccessMessage("")
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSaving(true)

    try {
      // Verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: formData.currentPassword,
      })
      if (signInError) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: 'Current password is incorrect',
        }))
        return
      }

      // Update password via Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword,
      })
      if (updateError) throw updateError

      // Send notification email
      const res = await fetch('/api/auth/password-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Failed to send notification email')

      // Show success toast and redirect home
      toast.success('Password changed successfully!')
      router.push('/')
    } catch (error) {
      console.error('Failed to update password', error)
      setErrors((prev) => ({
        ...prev,
        form:
          error instanceof Error
            ? error.message
            : 'Failed to update password. Please try again.',
      }))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("securitySettings")}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("updatePassword")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("currentPassword")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`form-input w-full pl-10 pr-10 py-2 border ${
                    errors.currentPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  tabIndex={-1}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("newPassword")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={18} className="text-gray-400" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`form-input w-full pl-10 pr-10 py-2 border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  tabIndex={-1}
                >
                  {showNewPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
              {!errors.newPassword && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {t("passwordRequirements")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("confirmNewPassword")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={18} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input w-full pl-10 pr-10 py-2 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>
        </div>

        {errors.form && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg text-sm">
            {errors.form}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary py-2 px-6 rounded-lg text-white font-medium flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
            }}
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                {t("updating")}
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                {t("updatePassword")}
              </>
            )}
          </button>
        </div>
      </form>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t("securityRecommendations")}</h3>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-4" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">{t("keepAccountSecure")}</h4>
              <ul className="mt-3 text-sm text-blue-700 dark:text-blue-400 space-y-2">
                <li>• {t("securityTips")}</li>
                <li>• {t("securityTips")}</li>
                <li>• {t("securityTips")}</li>
                <li>• {t("securityTips")}</li>
                <li>• {t("securityTips")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
