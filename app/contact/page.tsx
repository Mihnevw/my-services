import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Portfolio Website",
  description: "Get in touch with us for your next project",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  )
} 