"use client"

import AnimatedSection from "./animated-section"
import { Code, Palette, Zap, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const { t } = useLanguage()
  
  const skills = [
    {
      icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: t("webDevelopment"),
      description: t("webDevelopmentDesc"),
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: t("uiUxDesign"),
      description: t("uiUxDesignDesc"),
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: t("performance"),
      description: t("performanceDesc"),
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: t("collaboration"),
      description: t("collaborationDesc"),
    },
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative bg-pattern-2">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t("aboutMe")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("passionateWebDeveloper")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-600/10 rounded-full blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="max-w-3xl">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t("aboutDescription1")}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("aboutDescription2")}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {["JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX Design", "Supabase", "Git"].map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg inline-block mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{skill.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
