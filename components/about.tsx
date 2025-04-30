import AnimatedSection from "./animated-section"
import { Code, Palette, Zap, Users } from "lucide-react"

export default function About() {
  const skills = [
    {
      icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Web Development",
      description: "Expert in modern frameworks and responsive design principles",
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "UI/UX Design",
      description: "Creating intuitive and engaging user experiences",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Performance",
      description: "Optimizing for speed, accessibility, and search engines",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Collaboration",
      description: "Working closely with clients to achieve their goals",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative bg-pattern-2">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              About Me
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              Passionate Web Developer
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
                    Hello! I'm a passionate web developer with over 5 years of experience creating beautiful, functional
                    websites and applications. I specialize in modern web technologies and focus on delivering clean,
                    user-friendly designs that help businesses achieve their goals.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    My approach combines technical expertise with creative problem-solving to build digital experiences
                    that stand out. I believe in continuous learning and staying up-to-date with the latest industry
                    trends to provide the best solutions for my clients.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX Design"].map(
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
