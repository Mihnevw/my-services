"use client"

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGES } from "@/contexts/language-context";

export default function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Set mounted state after client-side hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle scroll effect - only after component is mounted
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMounted])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMounted])

  return (
    <div className={`relative ${className}`} ref={dropdownRef} suppressHydrationWarning>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-full md:w-auto rounded-full transition-all duration-300 
          ${isScrolled && isMounted
            ? "bg-transparent text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          } py-2 px-3 md:px-4`}
        aria-label={t("selectLanguage")}
      >
        <Globe className="h-5 w-5 mr-2" />
        <span className="hidden md:inline">{language.name}</span>
        <span className="md:hidden">{language.flag}</span>
        <ChevronDown className="h-3 w-3 ml-1" />
      </button>
      {isOpen && isMounted && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
            {t("selectLanguage")}
          </div>
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang)
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex items-center">
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </span>
                {lang.code === language.code && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function speak(text: string) {
  const { language } = useLanguage()
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.lang = language.speechCode
  const voices = window.speechSynthesis.getVoices()
  utterance.voice = voices.find(v => v.lang === language.speechCode) || null
  window.speechSynthesis.speak(utterance)
}
