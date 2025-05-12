/* Inserting "use client" directive at the top so that useLanguage (a client hook) can be called. */
"use client"

import { Rocket, ShoppingBag, User } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/contexts/language-context"

export default function TargetAudience() {
  const { t } = useLanguage()
  const audiences = [
    {
      icon: <Rocket className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: t("startups"),
      description: t("startupsDesc"),
      benefits: JSON.parse(t("startupsBenefits")) as string[],
    },
    {
      icon: <ShoppingBag className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: t("onlineStores"),
      description: t("onlineStoresDesc"),
      benefits: JSON.parse(t("onlineStoresBenefits")) as string[],
    },
    {
      icon: <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: t("personalBrands"),
      description: t("personalBrandsDesc"),
      benefits: JSON.parse(t("personalBrandsBenefits")) as string[],
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-2 opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t("whoIsThisSiteFor")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("tailoredSolutions")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t("audienceDescription")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <AnimatedSection key={index} delay={index * 150} direction="up">
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-8 h-full border border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                {/* Decorative gradient circle */}
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl inline-block mb-6">{audience.icon}</div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{audience.title}</h3>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">{audience.description}</p>

                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t("whatYouGet")}</h4>

                  <ul className="space-y-2">
                    {audience.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a
                      href="/contact"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      {t("learnMore")} {audience.title.toLowerCase()} {t("solutions")}
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
