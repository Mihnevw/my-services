import Navbar from "@/components/navbar"
import Pricing from "@/components/pricing"
import Footer from "@/components/footer"

export const metadata = {
  title: "Pricing - Portfolio Website",
  description: "View our competitive pricing plans and packages",
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <Pricing />
      </main>
      <Footer />
    </>
  )
} 