import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"

export const metadata = {
  title: "About - Portfolio Website",
  description: "Learn more about our team and mission",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <About />
      </main>
      <Footer />
    </>
  )
} 