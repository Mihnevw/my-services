"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, Bell, Moon, Sun, Mail, Megaphone, GitBranch } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"

type Preferences = {
  emailNotifications: boolean
  marketingEmails: boolean
  projectUpdates: boolean
  darkMode: boolean
}

type PreferencesFormProps = {
  preferences: Preferences
}

export default function PreferencesForm({ preferences }: PreferencesFormProps) {
  const [formData, setFormData] = useState({
    emailNotifications: preferences.emailNotifications,
    marketingEmails: preferences.marketingEmails,
    projectUpdates: preferences.projectUpdates,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { currentColor } = useThemeColor()
  const { theme, setTheme } = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSaving(true)

    try {
      // Update preferences via Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          email_notifications: formData.emailNotifications,
          marketing_emails: formData.marketingEmails,
          project_updates: formData.projectUpdates,
        },
      })
      if (updateError) throw updateError

      // Send notification email
      const res = await fetch('/api/auth/preferences-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, preferences: formData }),
      })
      if (!res.ok) throw new Error('Failed to send notification email')

      toast.success('Preferences updated successfully!')
      router.push('/')
    } catch (error) {
      console.error('Failed to update preferences', error)
      setErrors((prev) => ({
        ...prev,
        form: error instanceof Error
          ? error.message
          : 'Failed to update preferences. Please try again.',
      }))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Preferences</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize your account settings and notification preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-8">
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications about your account activity
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    style={{ backgroundColor: formData.emailNotifications ? currentColor.primary : undefined }}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <Megaphone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <label htmlFor="marketingEmails" className="font-medium text-gray-700 dark:text-gray-300">
                      Marketing Emails
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive emails about new features and offers
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="marketingEmails"
                    checked={formData.marketingEmails}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    style={{ backgroundColor: formData.marketingEmails ? currentColor.primary : undefined }}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <GitBranch className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <label htmlFor="projectUpdates" className="font-medium text-gray-700 dark:text-gray-300">
                      Project Updates
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive updates about your project status
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="projectUpdates"
                    name="projectUpdates"
                    checked={formData.projectUpdates}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    style={{ backgroundColor: formData.projectUpdates ? currentColor.primary : undefined }}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Moon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Theme</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleThemeChange("light")}
                  className={`p-2 rounded-lg ${
                    theme === "light"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                  aria-label="Light mode"
                >
                  <Sun className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange("dark")}
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                  aria-label="Dark mode"
                >
                  <Moon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {errors.form && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg text-sm">
            {errors.form}
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
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
