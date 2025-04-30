"use client"

import { useEffect, useState } from "react"
import { useThemeColor } from "@/contexts/theme-color-context"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const { currentColor } = useThemeColor()

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY

      if (totalHeight > 0) {
        // Calculate progress percentage and set state
        const progress = (scrollPosition / totalHeight) * 100
        setScrollProgress(progress)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to set initial position
    handleScroll()

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999]">
      <div
        className="h-full scroll-progress-bar"
        style={{ width: `${scrollProgress}%`, transition: "width 0.1s ease-out" }}
      />
    </div>
  )
}
