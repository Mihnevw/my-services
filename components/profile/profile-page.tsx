"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileForm from "./profile-form"
import SecurityForm from "./security-form"
import PreferencesForm from "./preferences-form"
import SocialLinksForm from "./social-links-form"
import { useThemeColor } from "@/contexts/theme-color-context"
import { ArrowLeft, User, Shield, Link2, Settings } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

type ProfilePageProps = {
  onClose?: () => void
}

export default function ProfilePage({ onClose }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const { currentColor } = useThemeColor()
  const { user } = useAuth()
  const { t } = useLanguage()

  // Use actual user data from Supabase
  const userData = {
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
    email: user?.email || "",
    bio: user?.user_metadata?.bio || "",
    profileImage: user?.user_metadata?.avatar_url || "/placeholder.svg?height=200&width=200",
    phone: user?.user_metadata?.phone || "",
    location: user?.user_metadata?.location || "",
    socialLinks: {
      twitter: user?.user_metadata?.twitter || "",
      linkedin: user?.user_metadata?.linkedin || "",
      github: user?.user_metadata?.github || "",
      instagram: user?.user_metadata?.instagram || "",
    },
    preferences: {
      emailNotifications: user?.user_metadata?.email_notifications ?? true,
      marketingEmails: user?.user_metadata?.marketing_emails ?? false,
      projectUpdates: user?.user_metadata?.project_updates ?? true,
      darkMode: user?.user_metadata?.dark_mode ?? false,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t("backToHome")}
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 min-h-[calc(100vh-12rem)]">
            {/* Sidebar */}
            <div className="col-span-3 bg-gray-50 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <User size={18} className="mr-3" />
                  {t("profileInformation")}
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "security"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Shield size={18} className="mr-3" />
                  {t("security")}
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "social"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Link2 size={18} className="mr-3" />
                  {t("socialLinks")}
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "preferences"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  {t("preferences")}
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9 p-8">
              <div className="max-w-3xl mx-auto">
                {activeTab === "profile" && <ProfileForm userData={userData} />}
                {activeTab === "security" && <SecurityForm email={userData.email} />}
                {activeTab === "social" && <SocialLinksForm socialLinks={userData.socialLinks} />}
                {activeTab === "preferences" && <PreferencesForm preferences={userData.preferences} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
