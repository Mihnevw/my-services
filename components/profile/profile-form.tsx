"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Camera, Loader2, Mail, Phone, MapPin, User } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type UserData = {
    name: string
    email: string
    bio: string
    profileImage: string
    phone: string
    location: string
}

type ProfileFormProps = {
    userData: UserData
}

export default function ProfileForm({ userData }: ProfileFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        bio: userData.bio,
        phone: userData.phone,
        location: userData.location,
    })
    const [profileImage, setProfileImage] = useState(userData.profileImage)
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [successMessage, setSuccessMessage] = useState("")
    const { currentColor } = useThemeColor()
    const { user } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "Please upload an image file" }))
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, image: "Image size should be less than 5MB" }))
            return
        }

        setIsUploading(true)

        try {
            // Upload image to Supabase Storage
            const fileExt = file.name.split('.').pop()
            const fileName = `${user?.id}-${Math.random()}.${fileExt}`
            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(fileName, file)

            if (error) throw error

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName)

            setProfileImage(publicUrl)

            // Update user metadata with new avatar URL
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            })

            if (updateError) throw updateError

            if (errors.image) {
                setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.image
                    return newErrors
                })
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            setErrors((prev) => ({ ...prev, image: "Failed to upload image. Please try again." }))
        } finally {
            setIsUploading(false)
        }
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSaving(true)
        setErrors({}) // Clear any existing errors

        try {
            // Update user metadata and display name
            const { data: { user: updatedUser }, error } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.name,
                    bio: formData.bio,
                    phone: formData.phone,
                    location: formData.location,
                    avatar_url: profileImage,
                    updated_at: new Date().toISOString(),
                }
            })

            if (error) {
                console.error("Supabase update error:", error)
                throw new Error(error.message)
            }

            if (!updatedUser) {
                throw new Error("Failed to update user profile")
            }

            // Update the user's display name
            const { error: updateError } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.name
                }
            })

            if (updateError) {
                console.error("Error updating display name:", updateError)
                throw new Error("Failed to update display name")
            }

            setSuccessMessage("Profile updated successfully!")
            // Redirect to home page after a short delay to show the success message
            setTimeout(() => {
                router.push('/')
            }, 1500)
        } catch (error) {
            console.error("Failed to update profile:", error)
            setErrors((prev) => ({ 
                ...prev, 
                form: error instanceof Error ? error.message : "Failed to update profile. Please try again." 
            }))
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your personal information and how others see you on the platform
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Image Section */}
                <div className="flex items-center space-x-8">
                    <div className="relative group">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                            <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-md transition-colors"
                        >
                            <Camera size={16} />
                            <span className="sr-only">Upload profile picture</span>
                        </label>
                        <input
                            type="file"
                            id="profile-image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploading}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Picture</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Max size of 5MB.
                        </p>
                        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-input w-full pl-10 px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input w-full pl-10 px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-input w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="form-input w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="City, Country"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Tell us a little about yourself"
                    ></textarea>
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
