"use client"

import { useState, useRef, useEffect } from "react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { Palette, Check, ChevronDown } from "lucide-react"

export default function ThemeColorPicker() {
  const { currentColor, setThemeColor, availableColors } = useThemeColor()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 font-medium py-2 px-3 rounded-full transition-all duration-300 border
          ${isScrolled
            ? "bg-white/80 border-white/80 text-gray-400 dark:bg-gray-900/80 dark:text-white"
            : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/50 hover:border-white/40"
          }`}
        aria-label="Change theme color"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            Choose Theme Color
          </div>
          <div className="p-2 grid grid-cols-3 gap-2">
            {availableColors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setThemeColor(color)
                  setIsOpen(false)
                }}
                className="relative flex items-center justify-center w-full h-10 rounded-md transition-transform hover:scale-105 focus:outline-none"
                style={{ backgroundColor: color.primary }}
                aria-label={`Set theme to ${color.name}`}
              >
                {currentColor.name === color.name && <Check className="h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
