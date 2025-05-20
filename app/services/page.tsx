import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"

export const metadata = {
  title: "Services - Portfolio Website",
  description: "Explore our professional services and solutions",
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <Services />
      </main>
      <Footer />
    </>
  )
} 