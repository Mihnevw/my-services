"use client"

import React, { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import AnimatedSection from "./animated-section"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

// Common email domains
const COMMON_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'abv.bg',
  'mail.bg',
  'aol.com',
  'protonmail.com',
  'icloud.com',
  'live.com',
  'me.com',
  'msn.com',
  'ymail.com',
  'zoho.com',
  'yandex.com',
  'mail.ru',
  'gmx.com',
  'inbox.com',
  'fastmail.com',
  'tutanota.com'
]

const socialLinks = [
  {
    name: "facebook",
    href: "https://www.facebook.com/stilian.mihnev/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H8.897V12h1.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        />
      </svg>
    ),
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/stilian-mihnev/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5C3.32 3.5 2 4.82 2 6.48s1.32 2.98 2.98 2.98 2.98-1.32 2.98-2.98S6.64 3.5 4.98 3.5zM2 9h6v12H2zm8.09 0H16v1.85c.78-1.42 2.26-2.35 3.99-2.35 4.42 0 5.01 2.91 5.01 6.7V21h-6v-5.5c0-1.31-.03-3-1.83-3s-2.1 1.43-2.1 2.9V21h-6z" />
      </svg>
    ),
  },
  {
    name: "github",
    href: "https://github.com/Mihnevw",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2C6.48 2 2 6.58 2 12.14c0 4.46 2.87 8.23 6.84 9.57.5.09.66-.22.66-.48v-1.73c-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.07 1.53 1.07.88 1.54 2.3 1.1 2.86.84.09-.65.35-1.1.64-1.35-2.22-.26-4.56-1.13-4.56-5 0-1.1.38-2 1-2.7-.1-.25-.44-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.34 9.34 0 0 1 5 0C17.9 6.1 18.75 6.38 18.75 6.38c.54 1.4.2 2.45.1 2.7.62.7 1 1.6 1 2.7 0 3.88-2.34 4.74-4.58 5 .36.3.68.9.68 1.82v2.7c0 .26.16.58.68.48A10.12 10.12 0 0 0 22 12.14C22 6.58 17.52 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const { t } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [emailWarning, setEmailWarning] = useState("")
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const validateEmail = (email: string) => {
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: t("pleaseEnterValidEmail") }
    }

    // Check domain
    const domain = email.split('@')[1].toLowerCase()
    if (!COMMON_DOMAINS.includes(domain)) {
      return {
        isValid: true,
        warning: t("uncommonEmailDomain")
      }
    }

    return { isValid: true }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate email on change
    if (name === "email") {
      if (!value) {
        setEmailError("")
        setEmailWarning("")
      } else {
        const validation = validateEmail(value)
        if (!validation.isValid) {
          setEmailError(t("pleaseEnterValidEmail"))
          setEmailWarning("")
        } else {
          // Check if domain is not in common domains
          const domain = value.split('@')[1].toLowerCase()
          if (!COMMON_DOMAINS.includes(domain)) {
            setEmailError(t("pleaseEnterValidEmail"))
            setEmailWarning("")
          } else {
            setEmailError("")
            setEmailWarning("")
          }
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ type: null, message: '' })

    // Validate email before submission
    const validation = validateEmail(formData.email)
    if (!validation.isValid) {
      const errorMessage = validation.error || t("invalidEmail")
      setFormStatus({ type: 'error', message: errorMessage })
      toast.error(errorMessage)
      setIsSubmitting(false)
      return
    }

    // If there's an email error or warning, prevent submission
    if (emailError || emailWarning) {
      const errorMessage = t("invalidEmail")
      setFormStatus({ type: 'error', message: errorMessage })
      toast.error(errorMessage)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)

    try {
      // Additional validation before making the API call
      if (!formData.email || emailError || emailWarning) {
        throw new Error(t("invalidEmail"))
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t("somethingWentWrong"))
      }

      const successMessage = t("messageSentSuccessfully")
      setFormStatus({ type: 'success', message: successMessage })
      toast.success(successMessage)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setEmailError("")
      setEmailWarning("")

      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("failedToSendMessage")
      setFormStatus({ type: 'error', message: errorMessage })
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section id="contact" className="py-20 bg-blue-50 dark:bg-gray-900 relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                {t("contact")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
                {t("getInTouch")}
              </h2>
              <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {t("contactDescription")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <AnimatedSection direction="left">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("contactInformation")}</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("email")}</h4>
                      <a
                        href="mailto:stilianmihnev@gmail.com"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        stilianmihnev@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("phone")}</h4>
                      <a
                        href="tel:+359899888888"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        +359 88 8 888 888
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("location")}</h4>
                      <p className="text-gray-700 dark:text-gray-300">Bulgaria, Sliven</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("connectWithMe")}</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map(({ name, href, icon }) => (
                      <a
                        key={name}
                        href={href}
                        className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        aria-label={`Connect on ${name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">{name}</span>
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={200}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("sendMessage")}</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus.type && (
                    <div className={`p-4 rounded-lg ${formStatus.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      }`}>
                      {formStatus.message}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      placeholder={t("name")}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t("email")}
                      className={`w-full px-4 py-2 border ${emailError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                    />
                    {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
                    {emailWarning && <p className="mt-1 text-sm text-yellow-500">{emailWarning}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("subject")} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder={t("subject")}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("message")} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t("yourMessage")}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-1 text-white py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex justify-center items-center disabled:opacity-70 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Send className="h-5 w-5 mr-2" />
                    )}
                    {isSubmitting ? t("sending") : t("sendMessageBtn")}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
