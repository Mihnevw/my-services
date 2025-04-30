import Navbar from "@/components/navbar"

export const metadata = {
  title: "Cookie Policy - Portfolio Website",
  description: "Information about how we use cookies on our website",
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Essential cookies: Required for the website to function properly</li>
                <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                <li>Preference cookies: Remember your settings and preferences</li>
                <li>Marketing cookies: Used to track visitors across websites</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Session cookies: Temporary cookies that expire when you close your browser</li>
                <li>Persistent cookies: Remain on your device for a set period of time</li>
                <li>First-party cookies: Set by our website</li>
                <li>Third-party cookies: Set by external services we use</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Managing Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about our Cookie Policy, please contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email: privacy@example.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
} 