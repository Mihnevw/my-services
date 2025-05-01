import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Projects from "@/components/projects"
import Pricing from "@/components/pricing"
import Testimonials from "@/components/testimonials"
import Blog from "@/components/blog"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import TargetAudience from "@/components/target-audience"
import IntroAnimation from "@/components/intro-animation"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <IntroAnimation />
      <TargetAudience />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  )
}
