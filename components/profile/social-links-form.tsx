"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, Twitter, Linkedin, Github, Instagram, Link2 } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"

type SocialLinks = {
  twitter: string
  linkedin: string
  github: string
  instagram: string
}

type SocialLinksFormProps = {
  socialLinks: SocialLinks
}

export default function SocialLinksForm({ socialLinks }: SocialLinksFormProps) {
  const [formData, setFormData] = useState({
    twitter: socialLinks.twitter,
    linkedin: socialLinks.linkedin,
    github: socialLinks.github,
    instagram: socialLinks.instagram,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const { currentColor } = useThemeColor()

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

    if (formData.twitter && !/^[A-Za-z0-9_]{1,15}$/.test(formData.twitter)) {
      newErrors.twitter = "Invalid Twitter username"
    }

    if (formData.linkedin && !/^[A-Za-z0-9-]{1,100}$/.test(formData.linkedin)) {
      newErrors.linkedin = "Invalid LinkedIn username"
    }

    if (formData.github && !/^[A-Za-z0-9-]{1,39}$/.test(formData.github)) {
      newErrors.github = "Invalid GitHub username"
    }

    if (formData.instagram && !/^[A-Za-z0-9._]{1,30}$/.test(formData.instagram)) {
      newErrors.instagram = "Invalid Instagram username"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSaving(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Social links updated", formData)
      setSuccessMessage("Social links updated successfully!")
    } catch (error) {
      console.error("Failed to update social links", error)
      setErrors((prev) => ({ ...prev, form: "Failed to update social links. Please try again." }))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Media Profiles</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your social media accounts to your profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Social Media Links</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Twitter size={18} className="text-[#1DA1F2]" />
                </div>
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                  <span className="text-gray-500">@</span>
                </div>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className={`form-input w-full pl-16 py-2 border ${
                    errors.twitter ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="username"
                />
              </div>
              {errors.twitter && <p className="mt-1 text-sm text-red-500">{errors.twitter}</p>}
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin size={18} className="text-[#0A66C2]" />
                </div>
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                  <span className="text-gray-500">in/</span>
                </div>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={`form-input w-full pl-16 py-2 border ${
                    errors.linkedin ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="username"
                />
              </div>
              {errors.linkedin && <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>}
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GitHub
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github size={18} className="text-gray-800 dark:text-white" />
                </div>
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                  <span className="text-gray-500">@</span>
                </div>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className={`form-input w-full pl-16 py-2 border ${
                    errors.github ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="username"
                />
              </div>
              {errors.github && <p className="mt-1 text-sm text-red-500">{errors.github}</p>}
            </div>

            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instagram
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Instagram size={18} className="text-[#E1306C]" />
                </div>
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                  <span className="text-gray-500">@</span>
                </div>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className={`form-input w-full pl-16 py-2 border ${
                    errors.instagram ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="username"
                />
              </div>
              {errors.instagram && <p className="mt-1 text-sm text-red-500">{errors.instagram}</p>}
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
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
