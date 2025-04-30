import { Check } from "lucide-react"
import AnimatedSection from "./animated-section"

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$999",
      description: "Perfect for small businesses just getting started",
      features: [
        "5-page responsive website",
        "Basic SEO setup",
        "Contact form",
        "Mobile-friendly design",
        "1 month of support",
      ],
      highlighted: false,
      ctaText: "Choose Basic",
    },
    {
      name: "Standard",
      price: "$1,999",
      description: "Ideal for growing businesses with specific needs",
      features: [
        "10-page responsive website",
        "Advanced SEO optimization",
        "Content management system",
        "Blog integration",
        "Social media integration",
        "E-commerce functionality (up to 20 products)",
        "3 months of support",
      ],
      highlighted: true,
      ctaText: "Choose Standard",
    },
    {
      name: "Premium",
      price: "$3,999",
      description: "Comprehensive solution for established businesses",
      features: [
        "Unlimited pages",
        "Custom design & functionality",
        "Advanced SEO strategy",
        "Full e-commerce solution",
        "Custom integrations",
        "Performance optimization",
        "Security features",
        "6 months of priority support",
        "Monthly performance reports",
      ],
      highlighted: false,
      ctaText: "Choose Premium",
    },
  ]

  return (
    <section id="pricing" className="py-20 dark:bg-gray-800 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Pricing Plans
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              Choose Your Plan
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose the perfect plan for your needs
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={index} delay={index * 150} direction="up">
              <div
                className={`pricing-card rounded-2xl overflow-hidden transition-all duration-300 h-full ${
                  plan.highlighted
                    ? "highlighted-pricing shadow-2xl relative z-10"
                    : "border border-gray-200 dark:border-gray-700 shadow-xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-1 text-white text-center py-2 text-sm font-medium">Most Popular</div>
                )}
                <div className="p-8 bg-white dark:bg-gray-700 h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{plan.price}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">{plan.description}</p>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                      plan.highlighted
                        ? "btn-primary text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white hover:shadow-md"
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
