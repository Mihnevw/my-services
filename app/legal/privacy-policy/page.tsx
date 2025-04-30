import Navbar from "@/components/navbar"

export const metadata = {
  title: "Privacy Policy - Portfolio Website",
  description: "Our commitment to protecting your privacy and personal data",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We collect information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Contact us through our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or service</li>
                <li>Apply for a job</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at:
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