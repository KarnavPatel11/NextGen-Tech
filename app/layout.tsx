import type { Metadata } from "next";
import { Inter, Playfair_Display, Urbanist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import GlobalBackground from "@/components/3d/GlobalBackground";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextgentech.in"),
  title: {
    default:
      "NextGen Tech — Web Development, AI Integration & Digital Marketing Agency in Ahmedabad",
    template: "%s | NextGen Tech",
  },
  description:
    "NextGen Tech is an AI-first digital agency in Ahmedabad, India offering web development, app development, AI integration, digital marketing, social media management, and e-commerce solutions. Get a free consultation today.",
  keywords: [
    "digital agency ahmedabad",
    "web development company india",
    "app development agency",
    "AI integration services",
    "digital marketing agency ahmedabad",
    "social media marketing india",
    "e-commerce development",
    "digital transformation consulting",
    "nextgen tech",
    "software house ahmedabad",
  ],
  authors: [{ name: "NextGen Tech" }],
  creator: "NextGen Tech",
  publisher: "NextGen Tech",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NextGen Tech",
    title:
      "NextGen Tech — Web Development, AI Integration & Digital Marketing Agency",
    description:
      "AI-first digital agency offering web & app development, AI automation, digital marketing, and e-commerce solutions for modern businesses in India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextGen Tech — AI-First Digital Agency & Software House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Tech — AI-First Digital Agency",
    description:
      "Web development, AI integration, digital marketing & e-commerce solutions for modern businesses.",
    images: ["/og-image.png"],
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
    icon: "/favicon-logo.jpg",
    shortcut: "/favicon-logo.jpg",
    apple: "/favicon-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${urbanist.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden max-w-full w-full">
        <OrganizationSchema />
        <GlobalBackground />
        <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden max-w-full w-full">
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
