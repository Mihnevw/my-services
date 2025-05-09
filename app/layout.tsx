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


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Website",
  description: "A modern Future of Your Business website with a clean design",
  icons: {
    icon: "/favicon.png",
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
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
