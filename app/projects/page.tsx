import Navbar from "@/components/navbar"
import Projects from "@/components/projects"
import Footer from "@/components/footer"

export const metadata = {
  title: "Projects - Portfolio Website",
  description: "Explore our portfolio of successful projects",
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <Projects />
      </main>
      <Footer />
    </>
  )
} 