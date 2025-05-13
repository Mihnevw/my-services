"use client"

import { CheckCircle, Code, Palette, Search, Settings, ArrowRight } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function Services() {
  const { t } = useLanguage();
  const router = useRouter();

  const services = [
    {
      title: t("webDesign"),
      price: t("webDesignPrice"),
      description: t("webDesignDesc"),
      icon: <Palette className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: JSON.parse(t("webDesignFeatures")) as string[],
    },
    {
      title: t("webDev"),
      price: t("webDevPrice"),
      description: t("webDevDesc"),
      icon: <Code className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: JSON.parse(t("webDevFeatures")) as string[],
    },
    {
      title: t("seoOptimization"),
      price: t("seoPrice"),
      description: t("seoDesc"),
      icon: <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: JSON.parse(t("seoFeatures")) as string[],
    },
    {
      title: t("maintenance"),
      price: t("maintenancePrice"),
      description: t("maintenanceDesc"),
      icon: <Settings className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: JSON.parse(t("maintenanceFeatures")) as string[],
    },
  ]

  return (
    <section id="services" className="py-20 dark:bg-gray-800 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t("myServices")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("whatIOffer")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {t("servicesDescription")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 100} direction="up">
              <div className="service-card relative bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-600">
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg inline-block">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{service.price}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3 mt-auto">
                  {service.features.map((feature, idx) => (
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
      </div>
      <AnimatedSection delay={200}>
        <div className="text-center mt-12">
          <Link
            href="/pricing"
            className="btn-primary inline-flex items-center justify-center text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          >
            {t("seePricing")}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </AnimatedSection>

      {/* Wave divider */}
      <div className="custom-shape-divider-bottom-1 mt-20">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  )
}
