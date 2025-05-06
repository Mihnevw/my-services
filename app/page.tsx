import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/blog-preview";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import TargetAudience from "@/components/target-audience";
import IntroAnimation from "@/components/intro-animation";
import ServicesPreview from "@/components/services-preview";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <VideoPlayer src="/intro.mp4" />
      <IntroAnimation />
      <TargetAudience />
      <ServicesPreview />
      <Testimonials />
      <BlogPreview />
      <Pricing />
      <Footer />
    </main>
  )
}
