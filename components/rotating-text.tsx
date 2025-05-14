"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RotatingTextProps {
  texts: string[]
  interval?: number
  className?: string
}

export default function RotatingText({ texts, interval = 3000, className = "" }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts, interval])

  // Find the longest text to set minimum width
  const longestText = texts.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    ""
  )

  return (
    <span 
      className="inline-flex items-center justify-center relative"
      style={{ 
        minWidth: `${longestText.length * 0.5}em`,
        minHeight: '1.5em',
        marginTop: '0.1em',
        marginBottom: '0.1em'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -30, opacity: 0, scale: 0.9 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1], // Custom ease curve
            opacity: { duration: 0.25 }
          }}
          className={`block ${className}`}
          style={{ lineHeight: '1.4' }}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
} 