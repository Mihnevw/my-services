"use client"

import Image from "next/image"
import AnimatedSection from "./animated-section"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RotatingText from "./rotating-text"

export default function Hero() {
  const { t } = useLanguage()
  
  // Array of rotating texts for the animation
  const rotatingTexts = [
    t("developer"),
    t("designer"),
    t("creator"),
    t("innovator")
  ]
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/hero.png"
          alt="Professional web development services backdrop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-indigo-900/90 dark:from-blue-900/80 dark:to-gray-900/95 mix-blend-multiply" />

        {/* Animated particles/shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-pattern-1 opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 text-center relative">
        <AnimatedSection direction="down" delay={300}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-shadow-2xl">
            {t("welcomeToPortfolio")}
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 flex items-center justify-center flex-wrap gap-2 min-h-[2em] py-2 text-shadow-2xl" style={{ lineHeight: 1.5 }}>
            <span className="text-glow mr-2 whitespace-nowrap">{t("iAmA")}</span>
            <RotatingText 
              texts={rotatingTexts} 
              className="text-glow bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg font-bold"
            />
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 text-shadow-lg">
            {t("heroDescription")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={900}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="contact"
              className="btn-primary text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg text-shadow-lg"
              aria-label="Get in touch"
              rel="nofollow"
            >
              {t("getInTouch")}
            </a>
            <a
              href="/projects"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 text-lg text-shadow-lg"
              aria-label="View my work"
            >
              {t("viewMyWork")}
            </a>
          </div>
        </AnimatedSection>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <a href="/about" className="text-white/80 hover:text-white transition-colors text-shadow-lg" aria-label="Scroll down to about section">
            <ChevronDown className="h-8 w-8" />
            <span className="sr-only">Scroll down</span>
          </a>
        </div>
      </div>

      {/* Wave divider */}
      <div className="custom-shape-divider-bottom-1" aria-hidden="true">
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
