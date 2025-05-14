"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("projects"), href: "/projects" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("testimonials"), href: "/testimonials" },
    { name: t("blog"), href: "/blog" },
    { name: t("contact"), href: "/contact" },
  ]

  const serviceItems = [
    { name: t("webDesign"), href: "/services" },
    { name: t("webDev"), href: "/services" },
    { name: t("seoOptimization"), href: "/services" },
    { name: t("maintenance"), href: "/services" },
    { name: t("eComerce"), href: "/services" },
    { name: t("branding"), href: "/services" },
  ]

  const resourceItems = [
    { name: t("blog"), href: "/" },
    { name: t("caseStudies"), href: "/" },
    { name: t("portfolio"), href: "/" },
    { name: t("testimonials"), href: "/" },
    { name: t("faq"), href: "/" },
    { name: t("support"), href: "/" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/" className="block w-[40px] h-[40px] relative">
              <Image
                src="/favicon.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <p className="mt-3 text-gray-400 max-w-md">
              {t("heroDescription")}
            </p>
          </div>

          <div className="flex space-x-5">
            <a
              href="https://www.facebook.com/stilian.mihnev/"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/stilian-mihnev/"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://github.com/Mihnevw"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("home")}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("services")}</h3>
            <ul className="space-y-2">
              {serviceItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("resources")}</h3>
            <ul className="space-y-2">
              {resourceItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">{t("email")}: stilianmihnev@gmail.com</span>
              </li>
              <li className="text-gray-400">
                <span className="block">{t("phone")}: +359 89 9 888 888</span>
              </li>
              <li className="text-gray-400">
                <span className="block">{t("location")}: Bulgaria, Sliven</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {currentYear} Mihnev. {t("allRightsReserved")}</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/legal/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/legal/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
              {t("termsOfService")}
            </Link>
            <Link href="/legal/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
              {t("cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
