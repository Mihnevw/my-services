"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2, Loader2, MoveVertical, ExternalLink } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"
import Image from "next/image"
import PortfolioModal from "./portfolio-modal"

// Types for portfolio items
export type PortfolioItem = {
  id: string
  title: string
  description: string
  category: string
  image: string
  tags: string[]
  link?: string
  githubLink?: string
  featured: boolean
  date: string
}

export default function PortfolioManager() {
  const { currentColor } = useThemeColor()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "E-commerce Website",
      description: "A fully responsive e-commerce platform with product catalog, shopping cart, and secure checkout.",
      category: "Web Development",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://example.com/project1",
      githubLink: "https://github.com/username/project1",
      featured: true,
      date: "2023-06-15",
    },
    {
      id: "2",
      title: "Corporate Rebrand",
      description:
        "Complete website redesign for a financial services company, focusing on modern aesthetics and improved UX.",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["UI/UX", "WordPress", "JavaScript"],
      link: "https://example.com/project2",
      featured: false,
      date: "2023-04-10",
    },
    {
      id: "3",
      title: "Mobile App",
      description: "Cross-platform mobile application for a health and wellness startup with user tracking features.",
      category: "Mobile Development",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React Native", "Firebase", "Redux"],
      link: "https://example.com/project3",
      githubLink: "https://github.com/username/project3",
      featured: false,
      date: "2023-02-22",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

  // Open modal for creating a new portfolio item
  const handleAddNew = () => {
    setCurrentItem(null)
    setIsModalOpen(true)
  }

  // Open modal for editing an existing portfolio item
  const handleEdit = (item: PortfolioItem) => {
    setCurrentItem(item)
    setIsModalOpen(true)
  }

  // Handle saving a portfolio item (create or update)
  const handleSave = (item: PortfolioItem) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (item.id) {
        // Update existing item
        setPortfolioItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
        setSuccessMessage("Portfolio item updated successfully!")
      } else {
        // Create new item with generated ID
        const newItem = {
          ...item,
          id: Math.random().toString(36).substring(2, 9),
        }
        setPortfolioItems((prev) => [...prev, newItem])
        setSuccessMessage("New portfolio item created successfully!")
      }
      setIsLoading(false)
      setIsModalOpen(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  // Handle deleting a portfolio item
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio item?")) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setPortfolioItems((prev) => prev.filter((item) => item.id !== id))
        setIsLoading(false)
        setSuccessMessage("Portfolio item deleted successfully!")

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      }, 1000)
    }
  }

  // Drag and drop handlers for reordering
  const handleDragStart = (id: string) => {
    setDraggedItemId(id)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedItemId || draggedItemId === targetId) {
      setDraggedItemId(null)
      return
    }

    const draggedItemIndex = portfolioItems.findIndex((item) => item.id === draggedItemId)
    const targetItemIndex = portfolioItems.findIndex((item) => item.id === targetId)

    if (draggedItemIndex === -1 || targetItemIndex === -1) {
      setDraggedItemId(null)
      return
    }

    const newItems = [...portfolioItems]
    const [draggedItem] = newItems.splice(draggedItemIndex, 1)
    newItems.splice(targetItemIndex, 0, draggedItem)

    setPortfolioItems(newItems)
    setDraggedItemId(null)
    setSuccessMessage("Portfolio items reordered successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Portfolio Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Showcase your work by adding and managing portfolio items</p>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-3 rounded-md text-sm">
          {successMessage}
        </div>
      )}

      {/* Add new button */}
      <div className="flex justify-end">
        <button
          onClick={handleAddNew}
          className="btn-primary py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </button>
      </div>

      {/* Portfolio items list */}
      <div className="space-y-4">
        {portfolioItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">You haven't added any portfolio items yet.</p>
            <button
              onClick={handleAddNew}
              className="mt-4 text-blue-600 dark:text-blue-400 font-medium flex items-center mx-auto"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add your first project
            </button>
          </div>
        ) : (
          portfolioItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden ${
                draggedItemId === item.id ? "opacity-50" : ""
              }`}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(item.id)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  {item.featured && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{item.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 rounded-md"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700 rounded-md"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md cursor-grab"
                        title="Drag to reorder"
                      >
                        <MoveVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Added: {new Date(item.date).toLocaleDateString()}
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:underline"
                      >
                        View Project <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center">
            <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin mr-3" />
            <p className="text-gray-900 dark:text-white font-medium">Processing...</p>
          </div>
        </div>
      )}

      {/* Portfolio edit/create modal */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        item={currentItem}
      />
    </div>
  )
}
