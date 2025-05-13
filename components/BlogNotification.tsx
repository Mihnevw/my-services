"use client"

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./animated-section";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { NotificationStack } from "./notification-stack";
import { useLanguage } from "@/contexts/language-context";

export default function Blog() {
  const { t } = useLanguage()

  const translatedBlogPosts = [
    {
      id: 1,
      title: t("blogPost1Title"),
      excerpt: t("blogPost1Content"),
      image: "/web-design-trends-2025.webp",
      date: "Apr 23, 2025",
      readTime: " 13 min read",
      category: t("blogPost1Category"),
      slug: "https://www.theedigital.com/blog/web-design-trends"
    },

    {
      id: 2,
      title: t("blogPost2Title"),
      excerpt: t("blogPost2Excerpt"),
      image: "/digital-blog.webp",
      date: "January 15, 2025",
      readTime: "11 min read",
      category: t("blogPost2Category"),
      slug: "https://www.digitalsilk.com/digital-trends/how-to-increase-website-conversion-rates/"
    },
    {
      id: 3,
      title: t("blogPost3Title"),
      excerpt: t("blogPost3Excerpt"),
      image: "/seo.jpg",
      date: "March 2, 2025",
      readTime: "5 min read",
      category: t("blogPost3Category"),
      slug: "https://www.habilelabs.io/blog/complete-seo-guide-for-web-developers"
    }
  ]

  return (
    <section id="blog" className="py-20 dark:bg-gray-800 relative bg-pattern-2">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{t("blog")}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("latestInsights")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t("blogDescription")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {translatedBlogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 150}>
              <article className="blog-card bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-xl h-full flex flex-col border border-gray-100 dark:border-gray-600">
                <div className="blog-image relative h-48 w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-1 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    <Link href={post.slug} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
                  <Link
                    href={post.slug}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto group"
                  >
                    {t("blogPost1Link")} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <NotificationStack />
    </section>
  )
}
