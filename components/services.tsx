import { CheckCircle, Code, Palette, Search, Settings } from "lucide-react"
import AnimatedSection from "./animated-section"

export default function Services() {
  const services = [
    {
      title: "Web Design",
      price: "$1,200",
      description: "Custom website design focused on user experience and brand identity.",
      icon: <Palette className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: [
        "Responsive design for all devices",
        "User experience optimization",
        "Brand integration",
        "Wireframing and prototyping",
      ],
    },
    {
      title: "Web Development",
      price: "$2,500",
      description: "Full-stack development of websites and web applications.",
      icon: <Code className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: [
        "Custom coding with modern technologies",
        "Content management system integration",
        "E-commerce functionality",
        "Performance optimization",
      ],
    },
    {
      title: "SEO Optimization",
      price: "$800",
      description: "Improve your website's visibility in search engines.",
      icon: <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: [
        "Keyword research and analysis",
        "On-page SEO optimization",
        "Technical SEO improvements",
        "Monthly performance reports",
      ],
    },
    {
      title: "Maintenance",
      price: "$300/month",
      description: "Keep your website secure, updated, and running smoothly.",
      icon: <Settings className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      features: [
        "Regular software updates",
        "Security monitoring",
        "Performance optimization",
        "Content updates and backups",
      ],
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
              My Services
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              What I Offer
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              I offer a range of services to help you establish a strong online presence
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
