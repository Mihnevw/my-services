"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ThemeColor = {
  name: string
  primary: string
  secondary: string
  accent: string
}

const themeColors: ThemeColor[] = [
  {
    name: "blue",
    primary: "#3b82f6",
    secondary: "#4f46e5",
    accent: "#8b5cf6",
  },
  {
    name: "purple",
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    accent: "#6366f1",
  },
  {
    name: "teal",
    primary: "#14b8a6",
    secondary: "#0d9488",
    accent: "#0ea5e9",
  },
  {
    name: "green",
    primary: "#22c55e",
    secondary: "#16a34a",
    accent: "#84cc16",
  },
  {
    name: "red",
    primary: "#ef4444",
    secondary: "#dc2626",
    accent: "#f97316",
  },
  {
    name: "orange",
    primary: "#f97316",
    secondary: "#ea580c",
    accent: "#f59e0b",
  },
  {
    name: "pink",
    primary: "#ec4899",
    secondary: "#db2777",
    accent: "#d946ef",
  },
]

type ThemeColorContextType = {
  currentColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
  availableColors: ThemeColor[]
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined)

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [currentColor, setCurrentColor] = useState<ThemeColor>(themeColors[0])

  useEffect(() => {
    // Load saved theme color from localStorage on initial render
    const savedTheme = localStorage.getItem("themeColor")
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme)
      setCurrentColor(parsedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme color to CSS variables
    if (currentColor) {
      document.documentElement.style.setProperty("--theme-primary", currentColor.primary)
      document.documentElement.style.setProperty("--theme-secondary", currentColor.secondary)
      document.documentElement.style.setProperty("--theme-accent", currentColor.accent)

      // Save to localStorage
      localStorage.setItem("themeColor", JSON.stringify(currentColor))
    }
  }, [currentColor])

  const setThemeColor = (color: ThemeColor) => {
    setCurrentColor(color)
  }

  return (
    <ThemeColorContext.Provider
      value={{
        currentColor,
        setThemeColor,
        availableColors: themeColors,
      }}
    >
      {children}
    </ThemeColorContext.Provider>
  )
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext)
  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider")
  }
  return context
}
