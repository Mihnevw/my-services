export function WebSiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Mihnev",
          "url": "https://mihnev.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mihnev.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  )
}

export function OrganizationStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Mihnev",
          "url": "https://mihnev.com",
          "logo": "https://mihnev.com/logo.png",
          "description": "Professional web development services helping businesses grow with beautiful, functional websites.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main Street",
            "addressLocality": "Sofia",
            "addressRegion": "Sofia",
            "postalCode": "1000",
            "addressCountry": "BG"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "42.6977",
            "longitude": "23.3219"
          },
          "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00",
          "telephone": "+359123456789",
          "email": "contact@mihnev.com",
          "sameAs": [
            "https://www.facebook.com/mihnev",
            "https://www.twitter.com/mihnev",
            "https://www.linkedin.com/company/mihnev",
            "https://www.instagram.com/mihnev"
          ],
          "priceRange": "$$"
        })
      }}
    />
  )
}

export function WebPageStructuredData({ 
  title = "Mihnev: Professional Web Development Services",
  description = "Professional web development services helping businesses grow with beautiful, functional websites.",
  url = "https://mihnev.com"
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": url,
          "isPartOf": {
            "@type": "WebSite",
            "name": "Mihnev",
            "url": "https://mihnev.com"
          }
        })
      }}
    />
  )
}

export function BreadcrumbsStructuredData({ items }: { 
  items: { name: string; item: string }[]
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
          }))
        })
      }}
    />
  )
}

export function ServiceStructuredData({ 
  name, 
  description, 
  url,
  image,
  provider = "Mihnev",
  providerUrl = "https://mihnev.com"
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  provider?: string;
  providerUrl?: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": name,
          "description": description,
          "url": url,
          "image": image,
          "provider": {
            "@type": "Organization",
            "name": provider,
            "url": providerUrl
          }
        })
      }}
    />
  )
} 