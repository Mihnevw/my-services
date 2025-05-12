"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/contexts/language-context"

export default function Testimonials() {
  const { t } = useLanguage()
  const testimonials = [
    {
      id: 1,
      name: t("testimonialSarah"),
      position: t("testimonialSarahPosition"),
      image: "/sarah.png",
      content: t("testimonialSarahContent"),
      rating: 5,
    },
    {
      id: 2,
      name: t("testimonialMichael"),
      position: t("testimonialMichaelPosition"),
      image: "/developer.png",
      content: t("testimonialMichaelContent"),
      rating: 5,
    },
    {
      id: 3,
      name: t("testimonialEmma"),
      position: t("testimonialEmmaPosition"),
      image: "/emma.png",
      content: t("testimonialEmmaContent"),
      rating: 4,
    },
    {
      id: 4,
      name: t("testimonialDavid"),
      position: t("testimonialDavidPosition"),
      image: "/david.png",
      content: t("testimonialDavidContent"),
      rating: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext()
    }

    if (touchStart - touchEnd < -75) {
      handlePrev()
    }
  }

  const visibleTestimonials = () => {
    // For mobile, show only the current testimonial
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return [testimonials[currentIndex]]
    }

    // For desktop, show 2 testimonials at a time
    const secondIndex = (currentIndex + 1) % testimonials.length
    return [testimonials[currentIndex], testimonials[secondIndex]]
  }

  return (
    <section id="testimonials" className="py-20 bg-blue-50 dark:bg-gray-900 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t("testimonials")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("clientFeedback")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t("testimonialsDescription")}
            </p>
          </div>
        </AnimatedSection>

        <div
          className="relative max-w-6xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / testimonials.length)}%)`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {visibleTestimonials().map((testimonial, index) => (
                  <AnimatedSection key={testimonial.id} delay={index * 200}>
                    <div className="testimonial-card bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 h-full flex flex-col border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-blue-100 dark:border-blue-900">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                                }`}
                                aria-label={t("testimonialRating")}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <blockquote className="flex-grow">
                        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </blockquote>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-800"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
