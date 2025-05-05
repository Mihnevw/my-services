"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import AnimatedSection from "./animated-section"

export default function BlogPreview() {
  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: "10 Web Design Trends to Watch in 2025",
      excerpt:
        "Discover the latest web design trends that are shaping the digital landscape this year, from glassmorphism to advanced animations.",
      image: "/web-design-trends-2025.webp",
      date: "Apr 23, 2025",
      readTime: " 13 min read",
      category: "Design",
      slug: "https://www.theedigital.com/blog/web-design-trends",
    },
    {
      id: 2,
      title: "How to Optimize Your Website for Better Conversion Rates",
      excerpt:
        "Learn proven strategies to improve your website's conversion rates through strategic design changes, A/B testing, and user experience improvements.",
      image: "/digital-blog.webp",
      date: "January 15, 2025",
      readTime: "11 min read",
      category: "Marketing",
      slug: "https://www.digitalsilk.com/digital-trends/how-to-increase-website-conversion-rates/",
    },
    {
      id: 3,
      title: "The Complete Guide to SEO for Developers",
      excerpt:
        "A comprehensive guide to search engine optimization specifically tailored for developers, covering technical SEO aspects and implementation.",
      image: "/seo.jpg",
      date: "March 2, 2025",
      readTime: "5 min read",
      category: "Development",
      slug: "https://www.habilelabs.io/blog/complete-seo-guide-for-web-developers",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Latest Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              From Our Blog
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest insights and trends in web development and design
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 150}>
              <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
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
                    Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="btn-primary inline-flex items-center justify-center text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
            >
              View all posts
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
} 