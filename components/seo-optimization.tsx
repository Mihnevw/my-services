"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SEOOptimizationProps {
  children: React.ReactNode
}

// Define interface for preconnect links
interface PreconnectLink {
  rel: string;
  href: string;
  crossOrigin?: string;
}

export default function SEOOptimization({ children }: SEOOptimizationProps) {
  const pathname = usePathname()
  
  // Performance optimization and SEO improvements
  useEffect(() => {
    // Add preconnect links for faster resource loading only if they don't already exist
    const preconnectLinks: PreconnectLink[] = [
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }
    ]
    
    preconnectLinks.forEach(link => {
      // Check if the link already exists before adding
      if (!document.querySelector(`link[rel="${link.rel}"][href="${link.href}"]`)) {
        const linkElement = document.createElement('link')
        linkElement.rel = link.rel
        linkElement.href = link.href
        if (link.crossOrigin) {
          linkElement.crossOrigin = link.crossOrigin
        }
        document.head.appendChild(linkElement)
      }
    })
    
    // Preload critical assets
    const preloadAssets = [
      { href: '/favicon.png', as: 'image' },
      // Add other critical assets that should be preloaded
    ]
    
    preloadAssets.forEach(asset => {
      if (!document.querySelector(`link[rel="preload"][href="${asset.href}"]`)) {
        const linkElement = document.createElement('link')
        linkElement.rel = 'preload'
        linkElement.href = asset.href
        linkElement.as = asset.as
        document.head.appendChild(linkElement)
      }
    })
    
    // Add structured data for current page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `https://mihnev.com${pathname}`,
      "name": document.title,
      "description": document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      "isPartOf": {
        "@type": "WebSite",
        "name": "Mihnev",
        "url": "https://mihnev.com"
      }
    }
    
    // Remove any existing structured data script before adding new one
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    })
    
    const scriptElement = document.createElement('script')
    scriptElement.type = 'application/ld+json'
    scriptElement.text = JSON.stringify(structuredData)
    document.head.appendChild(scriptElement)
    
    // Implement lazy loading for images below the fold
    const lazyLoadImages = () => {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]')
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const image = entry.target as HTMLImageElement
              if (image.dataset.src) {
                image.src = image.dataset.src
                image.removeAttribute('data-src')
              }
              imageObserver.unobserve(image)
            }
          })
        })
        
        lazyImages.forEach(img => {
          imageObserver.observe(img)
        })
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
          const image = img as HTMLImageElement
          if (image.dataset.src) {
            image.src = image.dataset.src
            image.removeAttribute('data-src')
          }
        })
      }
    }
    
    // Run lazy loading after page load
    if (document.readyState === 'complete') {
      lazyLoadImages()
    } else {
      window.addEventListener('load', lazyLoadImages)
      return () => window.removeEventListener('load', lazyLoadImages)
    }
    
    // Add focus outline for keyboard navigation - accessibility improvement
    // Only add if it doesn't exist already
    if (!document.querySelector('style[data-focus-style]')) {
      const style = document.createElement('style')
      style.setAttribute('data-focus-style', 'true')
      style.innerHTML = `
        *:focus-visible {
          outline: 2px solid var(--theme-primary, #3b82f6);
          outline-offset: 2px;
        }
      `
      document.head.appendChild(style)
    }
    
    // Enable instant page transitions with quicklink
    const enableQuickLink = () => {
      // Observe all anchor links
      const links = document.querySelectorAll('a')
      links.forEach(link => {
        // Only prefetch same-origin links and not external URLs
        if (
          link.href && 
          link.href.startsWith(window.location.origin) && 
          !link.href.includes('#') &&
          !link.hasAttribute('data-no-prefetch')
        ) {
          // Prefetch on hover or touchstart
          link.addEventListener('mouseenter', () => {
            // Check if prefetch link already exists
            if (!document.querySelector(`link[rel="prefetch"][href="${link.href}"]`)) {
              const prefetchLink = document.createElement('link')
              prefetchLink.rel = 'prefetch'
              prefetchLink.href = link.href
              prefetchLink.as = 'document'
              document.head.appendChild(prefetchLink)
            }
          }, { once: true })
        }
      })
    }
    
    // Initialize link prefetching
    if (document.readyState === 'complete') {
      enableQuickLink()
    } else {
      window.addEventListener('load', enableQuickLink)
    }
    
    // Cleanup function
    return () => {
      // Clean up only the elements we've added in this effect
      preconnectLinks.forEach(link => {
        const linkElement = document.querySelector(`link[rel="${link.rel}"][href="${link.href}"]`)
        if (linkElement && document.head.contains(linkElement)) {
          document.head.removeChild(linkElement)
        }
      })
      
      preloadAssets.forEach(asset => {
        const linkElement = document.querySelector(`link[rel="preload"][href="${asset.href}"]`)
        if (linkElement && document.head.contains(linkElement)) {
          document.head.removeChild(linkElement)
        }
      })
      
      const styleElement = document.querySelector('style[data-focus-style="true"]')
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement)
      }
      
      const scriptElements = document.querySelectorAll('script[type="application/ld+json"]')
      scriptElements.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      })
    }
  }, [pathname])
  
  return <>{children}</>
} 