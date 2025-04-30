import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/" className="block w-[40px] h-[40px] relative">
              <Image
                src="/favicon.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <p className="mt-3 text-gray-400 max-w-md">
              Creating beautiful, functional websites that help businesses grow and succeed online.
            </p>
          </div>

          <div className="flex space-x-5">
            <a
              href="https://www.facebook.com/stilian.mihnev/"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="/"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://github.com/Mihnevw"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Projects", "Pricing", "Testimonials", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {["Web Design", "Web Development", "SEO Optimization", "Maintenance", "E-commerce", "Branding"].map(
                (item) => (
                  <li key={item}>
                    <Link href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {["Blog", "Case Studies", "Portfolio", "Testimonials", "FAQ", "Support"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Email: stilianmihnev@gmail.com</span>
              </li>
              <li className="text-gray-400">
                <span className="block">Phone: +359 89 9 888 888</span>
              </li>
              <li className="text-gray-400">
                <span className="block">Address: Bulgaria, Sliven</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {currentYear} Portfolio. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/legal/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
