"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import ThemeColorPicker from "@/components/theme-color-picker"
import AuthButtons from "@/components/auth/auth-buttons"
import LanguageSelector from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const { t } = useLanguage()  // Use the translation function from language context
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: t("home"), href: "/", prefetch: true },
    { name: t("about"), href: "/about", prefetch: true },
    { name: t("services"), href: "/services", prefetch: false },
    { name: t("projects"), href: "/projects", prefetch: false },
    { name: t("pricing"), href: "/pricing", prefetch: false },
    { name: t("testimonials"), href: "/testimonials", prefetch: false },
    { name: t("blog"), href: "/blog", prefetch: true },
    { name: t("contact"), href: "/contact", prefetch: false },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="block w-[40px] h-[40px] relative">
            <Image
              src="/favicon.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={link.prefetch}
                className="text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
            <ThemeColorPicker />
            <AuthButtons />
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-gray-700 hover:text-blue-600" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={link.prefetch}
                  className="text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 flex items-center space-x-3">
                <LanguageSelector />
                <ThemeColorPicker />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
