"use client"

import Image from "next/image"
import AnimatedSection from "./animated-section"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Projects() {
  const { t } = useLanguage()
  
  const projects = [
    {
      title: "AF_Barbershop",
      description: t("descriptionProjects1"),
      image: "/af.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://afbarber.netlify.app/",
      githubUrl: "https://github.com/Mihnevw/HairPoint",
    },
    {
      title: "Recircle",
      description: t("descriptionProjects2"),
      image: "/zero.png",
      tags: ["UI/UX", "React", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript", "Firebase"],
      liveUrl: "https://zero-waste-swap.vercel.app/",
      githubUrl: "https://github.com/Mihnevw/Zero-Waste-Swap",
    },
    {
      title: "DeliDish",
      description: t("descriptionProjects3"),
      image: "/delidish.png",
      tags: ["React Native", "Firebase", "Redux"],
      liveUrl: "https://foodforge.netlify.app/",
      githubUrl: "https://github.com/Mihnevw/Restaurant-App",
    },
    {
      title: "Portfolio",
      description: t("descriptionProjects4"),
      image: "/portfolio.png",
      tags: ["Next.js", "Tailwind CSS", "Vercel"],
      liveUrl: "https://mihnevw.netlify.app/",
      githubUrl: "https://github.com/Mihnevw/vite",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 relative bg-pattern-3">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t("myWork")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              {t("recentProjects")}
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t("projectsDescription")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 150} direction={index % 2 === 0 ? "left" : "right"}>
              <div className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 h-full">
                <div className="relative h-64 w-full">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="overlay absolute inset-0 flex items-center justify-center gap-4">
                    <a
                      href={project.liveUrl}
                      className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      aria-label="View live site"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      aria-label="View source code"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                    >
                      {t("livePreview")} <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center"
                    >
                      {t("sourceCode")} <Github className="ml-1 h-3 w-3" />
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
