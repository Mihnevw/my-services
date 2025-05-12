"use client"

import { useState } from "react"
import { useLanguage, LANGUAGES } from "@/contexts/language-context"
import { speak } from "@/components/LanguageSelector"

/**
 * Example component demonstrating how to use the language context
 * This includes examples of:
 * 1. Basic translation
 * 2. Nested translation keys
 * 3. Dynamic content with translations
 * 4. Language switching
 * 5. Using text-to-speech
 */
export default function LanguageExample() {
  const { language, setLanguage, t } = useLanguage()
  const [count, setCount] = useState(0)

  // Example of handling dynamic content
  const incrementCount = () => {
    setCount(count + 1)
  }

  // Example of programmatically switching language
  const toggleLanguage = () => {
    // Find the current language index
    const currentIndex = LANGUAGES.findIndex(lang => lang.code === language.code)
    // Select the next language (or circle back to the first)
    const nextIndex = (currentIndex + 1) % LANGUAGES.length
    setLanguage(LANGUAGES[nextIndex])
  }

  // Example of using text-to-speech
  const speakWelcome = () => {
    speak(t("welcomeToPortfolio")) // Replace with: Welcome to the Future of your business
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 my-8">
      <h2 className="text-2xl font-bold mb-4">{t("about")}</h2>
      
      {/* Basic translation example */}
      <p className="mb-4">{t("aboutDescription1")}</p>
      
      {/* Dynamic content example */}
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p>{t("count")}: {count}</p>
        <button 
          onClick={incrementCount}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t("increment")}
        </button>
      </div>
      
      {/* Language switching example */}
      <div className="mb-4">
        <p className="mb-2">{t("currentLanguage")}: {language.name} {language.flag}</p>
        <button 
          onClick={toggleLanguage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {t("switchLanguage")}
        </button>
      </div>
      
      {/* Text-to-speech example */}
      <div className="mt-4">
        <button 
          onClick={speakWelcome}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {t("speakWelcome")}
        </button>
      </div>
    </div>
  )
} 