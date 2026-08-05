import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work — Web Development & Digital Marketing Portfolio",
  description:
    "Browse NextGen Tech's portfolio of web development, e-commerce, AI automation, and digital marketing projects. See concept builds, client work, and case studies from Ahmedabad's AI-first digital agency.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio — Our Work | NextGen Tech",
    description:
      "Concept projects, client builds, and case studies showcasing web development, AI integration, and digital marketing solutions.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
