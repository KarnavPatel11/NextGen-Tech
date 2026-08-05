"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PortfolioCard from "@/components/ui/PortfolioCard";

const categories = [
  "All",
  "Web Development",
  "App Development",
  "Digital Marketing",
  "Social Media Marketing",
  "AI Integration & Automation",
  "E-Commerce",
];

const projects = [
  {
    title: "TradeFXBook",
    description:
      "AI-powered trading journal SaaS that lets traders sync trades, journal setups, backtest ideas, and analyze PnL.",
    category: "Web Development",
    tags: ["SaaS Product", "AI Automation", "Concept Build"],
    image: "/images/tradefxbook.png",
    link: "https://trade-fx-book.vercel.app/",
  },
  {
    title: "Clothing Shop",
    description:
      "Modern D2C fashion e-commerce storefront featuring premium fabrics & trending designs with seamless checkout experience.",
    category: "E-Commerce",
    tags: ["E-Commerce", "Next.js", "Storefront Concept"],
    image: "/images/clothingshop.png",
    link: "https://clothingshop1.netlify.app/",
  },
  {
    title: "Krishi Manager App",
    description:
      "Smart agriculture & farm management dashboard helping farmers track crop yields, seasonal expenses, and real-time net profit analytics.",
    category: "App Development",
    tags: ["AgriTech", "Analytics", "React App"],
    image: "/images/krishi-manager.png",
    link: "https://farminganalyst.netlify.app/",
  },

  {
    title: "GrowthPulse Social Campaign",
    description:
      "Multi-platform social media campaign that grew engagement by 300% and drove 50K qualified leads in 6 months.",
    category: "Social Media Marketing",
    tags: ["Instagram", "LinkedIn", "Content Strategy"],
    image: "/images/kJJrWRLfOnlr1d8RHlDLgRsGag.png",
  },
  {
    title: "Nexus AI Customer Support",
    description:
      "Custom AI chatbot integration that handles 80% of customer queries automatically, reducing support costs by 60%.",
    category: "AI Integration & Automation",
    tags: ["LLM", "Chatbot", "Automation"],
    image: "/images/kSNWwZnlXmObrxxkf8A0ATWAqUM.png",
  },

  {
    title: "Quantum SEO & Content Strategy",
    description:
      "Comprehensive SEO overhaul that increased organic traffic by 250% and improved domain authority from 25 to 55.",
    category: "Digital Marketing",
    tags: ["SEO", "Content", "Analytics"],
    video: "/project.mp4",
  },

  {
    title: "Prism Brand Launch",
    description:
      "Full-scale brand launch across social media with influencer partnerships, driving 100K followers in the first quarter.",
    category: "Social Media Marketing",
    tags: ["Brand Strategy", "Influencers", "TikTok"],
  },

];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Work</span>
            </h1>
            <p className="text-foreground-muted text-lg leading-relaxed">
              A showcase of concept projects and system builds that demonstrate our approach to design, engineering, and automation.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <AnimatedSection>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-background-secondary border border-card-border text-foreground-muted hover:border-white/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <PortfolioCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-foreground-muted">
            No projects in this category yet. Check back soon!
          </div>
        )}
      </section>
    </div>
  );
}
