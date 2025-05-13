"use client"

import AnimatedSection from "./animated-section"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useThemeColor } from "@/contexts/theme-color-context"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesPreview() {
  const { currentColor } = useThemeColor()
  const { t } = useLanguage()

  // Using the same services data structure as the main Services component
  // But only showing the first 2 services
  const previewServices = [
    {
      title: t("webDesign"),
      price: "",
      description: t("webDesignDesc"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      features: t("webDesignFeatures"),
    },
    {
      title: t("webDev"),
      price: "",
      description: t("webDevDesc"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-blue-600 dark:text-blue-400"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      features: t("webDevFeatures"),
    }
  ]

  return (
    <section className="py-16 dark:bg-gray-800 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t("myServices")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("whatIOffer")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t("servicesDescription")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {previewServices.map((service, index) => (
            <AnimatedSection key={index} delay={index * 100} direction="up">
              <div className="service-card relative bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-600">
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg inline-block">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{service.price}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3 mt-auto">
                  {Array.isArray(service.features) && service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${currentColor.secondary} 0%, ${currentColor.primary} 100%)`,
              }}
            >
              {t("seeAllServices")}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
