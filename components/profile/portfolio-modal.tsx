"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Upload, Plus, XIcon, Loader2 } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"
import Image from "next/image"
import type { PortfolioItem } from "./portfolio-manager"

type PortfolioModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (item: PortfolioItem) => void
  item: PortfolioItem | null
}

export default function PortfolioModal({ isOpen, onClose, onSave, item }: PortfolioModalProps) {
  const { currentColor } = useThemeColor()
  const [formData, setFormData] = useState<Omit<PortfolioItem, "id"> & { id?: string }>({
    title: "",
    description: "",
    category: "Web Development",
    image: "/placeholder.svg?height=600&width=800",
    tags: [],
    link: "",
    githubLink: "",
    featured: false,
    date: new Date().toISOString().split("T")[0],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isUploading, setIsUploading] = useState(false)

  // Initialize form data when editing an existing item
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        image: item.image,
        tags: [...item.tags],
        link: item.link || "",
        githubLink: item.githubLink || "",
        featured: item.featured,
        date: item.date,
      })
    } else {
      // Reset form for new item
      setFormData({
        title: "",
        description: "",
        category: "Web Development",
        image: "/placeholder.svg?height=600&width=800",
        tags: [],
        link: "",
        githubLink: "",
        featured: false,
        date: new Date().toISOString().split("T")[0],
      })
    }
    setErrors({})
  }, [item, isOpen])

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

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image file" }))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Image size should be less than 5MB" }))
      return
    }

    setIsUploading(true)

    // Simulate image upload
    setTimeout(() => {
      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
      setIsUploading(false)
      if (errors.image) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.image
          return newErrors
        })
      }
    }, 1500)
  }

  const addTag = () => {
    if (!currentTag.trim()) return
    if (formData.tags.includes(currentTag.trim())) {
      setErrors((prev) => ({ ...prev, tag: "This tag already exists" }))
      return
    }
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, currentTag.trim()],
    }))
    setCurrentTag("")
    if (errors.tag) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.tag
        return newErrors
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (formData.link && !/^https?:\/\/.+/.test(formData.link)) {
      newErrors.link = "Please enter a valid URL starting with http:// or https://"
    }

    if (formData.githubLink && !/^https?:\/\/.+/.test(formData.githubLink)) {
      newErrors.githubLink = "Please enter a valid URL starting with http:// or https://"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSave(formData as PortfolioItem)
  }

  const categories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Graphic Design",
    "Branding",
    "Marketing",
    "Other",
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div
          className="h-2"
          style={{ background: `linear-gradient(to right, ${currentColor.secondary}, ${currentColor.primary})` }}
        ></div>

        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {item ? "Edit Portfolio Item" : "Add New Portfolio Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`form-input w-full px-4 py-2 border ${
                    errors.title ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="E.g., E-commerce Website"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`form-input w-full px-4 py-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Describe your project..."
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Completion Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project URL
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className={`form-input w-full px-4 py-2 border ${
                    errors.link ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="https://example.com/project"
                />
                {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link}</p>}
              </div>

              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  id="githubLink"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className={`form-input w-full px-4 py-2 border ${
                    errors.githubLink ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="https://github.com/username/project"
                />
                {errors.githubLink && <p className="mt-1 text-sm text-red-500">{errors.githubLink}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    className={`form-input flex-1 px-4 py-2 border ${
                      errors.tag ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Add technologies used (e.g., React, Node.js)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {errors.tag && <p className="mt-1 text-sm text-red-500">{errors.tag}</p>}

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1.5 text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Image</label>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Recommended size: 800x600px</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Project preview"
                      fill
                      className="object-cover"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg shadow-lg tracking-wide border border-blue-400 dark:border-blue-600 border-dashed cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Upload className="h-8 w-8" />
                      <span className="mt-2 text-sm font-medium">Upload image</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Feature this project (highlighted in portfolio)
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary px-4 py-2 rounded-lg text-white font-medium"
            style={{
              background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
            }}
          >
            {item ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  )
}
