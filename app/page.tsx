import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import TargetAudience from "@/components/target-audience";
import IntroAnimation from "@/components/IntroAnimation";
import ServicesPreview from "@/components/services-preview";
import { type Metadata } from "next";
import { 
  WebSiteStructuredData, 
  OrganizationStructuredData, 
  WebPageStructuredData 
} from "@/components/structured-data";
//import VideoPlayer from "@/components/VideoPlayer";
//import LanguageSpeechTest from "@/components/language-speech-test";

// A small toggle to enable the test component (for development only)
const SHOW_SPEECH_TEST = true;

export const metadata: Metadata = {
  title: "Mihnev: Future of your Business | Web Development & Design",
  description: "Professional web development services creating beautiful, functional websites for businesses. Boost your online presence with modern design, expert development, and SEO optimization.",
  openGraph: {
    title: "Mihnev: Professional Web Development & Design Services",
    description: "Transform your online presence with professional web development, UX/UI design, and SEO optimization services tailored for business growth.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Mihnev - Professional Web Development Services",
      }
    ],
  },
  alternates: {
    canonical: "/",
  }
}

export default function Home() {
  return (
    <>
      <WebSiteStructuredData />
      <OrganizationStructuredData />
      <WebPageStructuredData 
        title="Mihnev: Professional Web Development Services"
        description="Professional web development services helping businesses grow with beautiful, functional websites."
        url="https://mihnev.com"
      />
      
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <ScrollProgress />
        <Navbar />
        <Hero />
        {/* <VideoPlayer src="/intro.mp4" /> */}
        <IntroAnimation />
        {/* SHOW_SPEECH_TEST && <LanguageSpeechTest /> */}
        <TargetAudience />
        <ServicesPreview />
        <Testimonials />
        <BlogPreview />
        {/* <Pricing /> */}
        <Footer />
      </main>
    </>
  )
}
