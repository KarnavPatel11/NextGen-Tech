import Script from "next/script";

interface OrganizationSchemaProps {
  url?: string;
}

export default function OrganizationSchema({
  url = "https://nextgentech.in",
}: OrganizationSchemaProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NextGen Tech",
    url,
    logo: `${url}/logo.jpeg`,
    description:
      "AI-first digital agency offering web development, app development, AI integration, digital marketing, social media management, and e-commerce solutions.",
    foundingDate: "2026",
    founders: [
      {
        "@type": "Person",
        name: "Karnav Patel",
        jobTitle: "Founder",
      },
      {
        "@type": "Person",
        name: "Yash Patel",
        jobTitle: "Partner — Web Development & Technology",
      },
      {
        "@type": "Person",
        name: "Setu Patel",
        jobTitle: "Partner — Video Editing & Digital Solutions",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@nextgentech.in",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
      "https://www.instagram.com/nextgentech.in",
      "https://www.facebook.com/nextgentech.in",
      "https://www.linkedin.com/company/nextgentech",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Web Development",
      "App Development",
      "AI Integration",
      "Digital Marketing",
      "Social Media Marketing",
      "E-Commerce Solutions",
      "Digital Transformation",
    ],
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NextGen Tech",
    url,
    image: `${url}/logo.jpeg`,
    description:
      "AI-first digital agency & software house in Ahmedabad providing web development, app development, AI integration, and digital marketing services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380000",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0225,
      longitude: 72.5714,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    priceRange: "$$",
    email: "hello@nextgentech.in",
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "Custom, high-performance websites built to scale with your business.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Development",
            description:
              "Native and cross-platform mobile apps designed around real user needs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Integration & Automation",
            description:
              "Embed AI-powered tools and workflows directly into your operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing",
            description:
              "Data-driven campaigns across search, social, and paid channels.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Solutions",
            description:
              "Online store builds from product catalog to checkout and automation.",
          },
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
    </>
  );
}
