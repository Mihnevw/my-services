"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import ThemeColorPicker from "@/components/theme-color-picker";
import AuthButtons from "@/components/auth/auth-buttons";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/language-context";

export default function Navbar() {
  const { t } = useLanguage()  // Use the translation function from language context
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [pathname, setPathname] = useState<string>("")
  const [isMounted, setIsMounted] = useState(false)

  // Set pathname and mounted state after client-side hydration
  useEffect(() => {
    setPathname(window.location.pathname)
    setIsMounted(true)
  }, [])

  // Close menu when clicking outside - only active after mounting
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Close menu with Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("keydown", handleKeyDown)

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen, isMounted])

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

  // Basic style classes - consistent between server and client
  const logoClass = "block w-[40px] h-[40px] relative"
  const menuButtonClass = "md:hidden text-gray-700 hover:text-blue-600"

  // Enhanced styles only applied after client-side hydration
  const logoEnhancedClass = isMounted ? "z-[60]" : ""
  const menuButtonEnhancedClass = isMounted ? "relative z-[60] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" : ""

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4"
        }`}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className={`${logoClass} ${logoEnhancedClass}`}>
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
          <button
            ref={menuButtonRef}
            className={`${menuButtonClass} ${menuButtonEnhancedClass}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            {...(isMounted ? {
              'aria-expanded': isMenuOpen,
              'aria-controls': 'mobile-menu'
            } : {})}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Full Screen Overlay (only rendered after client-side hydration) */}
        {isMounted && (
          <div
            id="mobile-menu"
            className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-all duration-300 md:hidden ${isMenuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible"
              }`}
            aria-hidden={!isMenuOpen}
          >
            <div
              ref={menuRef}
              className="flex flex-col h-full max-h-screen overflow-y-auto py-20 px-6"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col space-y-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={link.prefetch}
                    className={`
                      text-xl font-medium py-3 px-4 rounded-lg transition-colors
                      ${link.href === pathname
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                  <div className="w-full md:w-auto mb-2">
                    <LanguageSelector className="w-full" />
                  </div>
                  <div className="flex items-center space-x-4 mx-auto">
                    <ThemeToggle />
                    <ThemeColorPicker />
                  </div>
                  <div className="w-full md:w-auto flex justify-center mt-4">
                    <AuthButtons />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
