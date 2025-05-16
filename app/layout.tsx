import "./globals.css";
import "focus-visible";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeColorProvider } from "@/contexts/theme-color-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import ClientProviders from "../components/ClientProviders";
import { LanguageProvider } from "@/contexts/language-context";

// Optimize font loading - only load Latin subset
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'], // Only preload essential weights
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: {
    default: "Mihnev: Future of your Business",
    template: "%s | Mihnev"
  },
  description: "Professional web development services helping businesses grow with beautiful, functional websites. Expert in modern web technologies, UI/UX design, and SEO optimization.",
  keywords: ["web development", "web design", "UI/UX design", "SEO optimization", "business growth", "professional websites", "modern web technologies"],
  authors: [{ name: "Mihnev", url: "https://mihnev.com" }],
  creator: "Mihnev",
  publisher: "Mihnev",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://mihnev.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'bg': '/bg',
    },
  },
  openGraph: {
    title: "Mihnev: Future of your Business",
    description: "Professional web development services helping businesses grow with beautiful, functional websites. Expert in modern web technologies, UI/UX design, and SEO optimization.",
    url: "https://mihnev.com",
    siteName: "Mihnev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mihnev - Professional Web Development Services",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mihnev: Future of your Business",
    description: "Professional web development services helping businesses grow with beautiful, functional websites. Expert in modern web technologies, UI/UX design, and SEO optimization.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "192x192" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code", // Replace with actual code when available
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ThemeColorProvider>
              <AuthProvider>
                <ClientProviders>
                {children}
                <Toaster />
              </ClientProviders>
            </AuthProvider>
          </ThemeColorProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
