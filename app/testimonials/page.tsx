import Navbar from "@/components/navbar"
import Testimonials from "@/components/testimonials"

export const metadata = {
  title: "Testimonials - Portfolio Website",
  description: "Read what our clients say about our services",
}

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <Testimonials />
      </main>
    </>
  )
} 