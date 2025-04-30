import Navbar from "@/components/navbar"
import Blog from "@/components/blog"

export const metadata = {
  title: "Blog - Portfolio Website",
  description: "Read our latest articles and insights",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <Blog />
      </main>
    </>
  )
} 