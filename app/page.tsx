"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Send, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProcessSection from "@/components/ui/ProcessSection";
import FAQSection from "@/components/ui/FAQSection";
import TeamCarousel from "@/components/ui/TeamCarousel";
import StatsMarquee from "@/components/ui/StatsMarquee";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import WhatToExpect from "@/components/ui/WhatToExpect";
import InteractiveCard from "@/components/ui/InteractiveCard";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

/* ——— Data ——— */
const heroRotatingWords = [
  "Web & App Development",
  "AI Integration",
  "E-Commerce",
  "Digital Marketing",
];

const services = [
  {
    number: "/01",
    title: "Web Development",
    description:
      "Custom, high-performance websites built to scale with your business.",
  },
  {
    number: "/02",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps designed around real user needs.",
  },
  {
    number: "/03",
    title: "AI Integration & Automation",
    description:
      "Embed AI-powered tools and workflows directly into your operations.",
  },
  {
    number: "/04",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across search, social, and paid channels that convert.",
  },
  {
    number: "/05",
    title: "Social Media Marketing",
    description:
      "Content and ad strategies that grow your brand's reach and engagement.",
  },
  {
    number: "/06",
    title: "Social Media Management",
    description:
      "Day-to-day content, community, and account management so your presence never goes quiet.",
  },
  {
    number: "/07",
    title: "Festival Poster & Logo Design",
    description:
      "Eye-catching festival posters and memorable logo designs to strengthen your brand identity.",
  },
  {
    number: "/08",
    title: "E-Commerce Solutions",
    description:
      "Online store builds from product catalog to checkout and post-sale automation.",
  },
];

interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  year: string;
  client: string;
  type: string;
  image?: string;
  link?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Retail Automation Suite",
    description: "Concept Project — AI workflows for local businesses",
    tags: ["AI Automation", "Digitalization", "Workflow Prototype"],
    year: "2026",
    client: "NextGen Tech",
    type: "Automation Demo",
    image: "/images/aiautomation.png",
  },
  {
    title: "D2C Storefront System",
    description: "Concept Project — e-commerce growth foundation",
    tags: ["E-Commerce", "Digital Marketing", "Storefront Concept"],
    year: "2026",
    client: "NextGen Tech",
    type: "Growth System",
    image: "/images/project_3.png",
  },
  {
    title: "TechVista Platform Redesign",
    description:
      "Complete redesign of a SaaS analytics platform with a new design system, improved UX, and 40% faster load times.",
    tags: ["Next.js", "React", "Design System"],
    year: "2026",
    client: "TechVista Inc.",
    type: "Client Build",
    image: "/images/lqo8ZRIavdu917iJA3Qe51RLPg.png",
  },
];

/* ——— Hero Rotating Text ——— */
function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroRotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 md:h-10 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="block text-foreground-muted text-lg md:text-xl"
        >
          {heroRotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ——— Contact Form ——— */
function ContactFormSimple() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterested: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const serviceOptions = [
    "Digital Marketing",
    "Social Media Marketing",
    "Social Media Management",
    "Web Development",
    "App Development",
    "AI Integration & Automation",
    "Festival Poster & Logo Design",
    "E-Commerce Solutions",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("loading");
    try {
      await emailjs.sendForm(
        "service_vpmhzej",
        "template_0mkma5j",
        form.current,
        {
          publicKey: "GSV5tLmd7tYLx80kW",
        }
      );

      // Also send via server API to deliver to company Gmail
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            serviceInterested: formData.serviceInterested,
            message: formData.message,
          }),
        });
      } catch {
        console.warn("Server-side email notification failed (non-critical).");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", serviceInterested: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("FAILED...", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClasses =
    "w-full bg-[#0e0e0e] border border-card-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-white/30 transition-all text-sm";

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="text"
          name="user_name"
          required
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClasses}
        />
      </div>
      <div>
        <input
          type="email"
          name="user_email"
          required
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClasses}
        />
      </div>
      <div>
        <input
          type="tel"
          name="user_phone"
          required
          placeholder="Your Phone Number (e.g. +91 98765 43210)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClasses}
        />
      </div>
      <div>
        <select
          name="service_interested"
          value={formData.serviceInterested}
          onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
          className={inputClasses}
        >
          <option value="">Select a Service...</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Project Details"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className={`${inputClasses} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="btn-primary w-full text-sm disabled:opacity-60"
      >
        {status === "loading" ? (
          "Sending..."
        ) : status === "success" ? (
          "Sent! ✓"
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

/* ——— Main Page ——— */
export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full">
        {/* Massive Blurred Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[0]">
          <span className="text-[12vw] font-heading font-black text-white/5 blur-xl select-none tracking-tighter whitespace-nowrap max-w-full overflow-hidden">
            NEXTGEN TECH
          </span>
        </div>

        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[2]" />

        {/* 3D Hero Scene */}
        <div className="absolute inset-0 z-[1]">
          <HeroScene />
        </div>

        {/* Hero Content */}
        <div className="relative z-[3] text-center px-6 max-w-5xl mx-auto pt-20">
          <AnimatedSection delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-lg shadow-black/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-foreground-muted tracking-wide">AI-First Digital Agency &amp; Software House</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[1.05]">
              Build,
              <br />
              <span className="text-gradient">Scale, Automate</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="flex justify-center mb-8">
              <RotatingText />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/#contact"
                className="btn-primary text-base px-8 py-4"
              >
                Get a Free Consultation
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="text-xs text-foreground-dim">We build</span>
              {heroRotatingWords.map((word) => (
                <span key={word} className="feature-badge">
                  {word}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]">
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="section-padding bg-background overflow-hidden w-full max-w-full" id="services">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="section-label mb-6 inline-flex items-center gap-2">
                <span className="text-foreground-dim">(02)</span>
                Our Services
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 tracking-tight">
                What
                <br />
                <span className="text-gradient">We Do</span>
              </h2>
            </div>
            <p className="text-foreground-muted text-base max-w-md leading-relaxed md:text-right">
              From websites to AI automation — we deliver full-stack digital
              solutions that help your business grow, faster.
            </p>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="h-full"
              >
                <InteractiveCard className="p-6 md:p-8 h-full">
                  <span className="service-number block mb-3">
                    {service.number}
                  </span>
                  <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                    {service.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STATS MARQUEE ===================== */}
      <StatsMarquee />

      {/* ===================== FEATURED WORK ===================== */}
      <section className="section-padding bg-background overflow-hidden w-full max-w-full" id="work">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-16">
            <span className="section-label mb-6 inline-block">
              Featured
            </span>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, i) => {
              const cardContent = (
                <>
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-accent/10 to-cyan/10 border-b border-card-border flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-[1]" />
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100" />
                    )
                      : (
                        <span className="text-4xl font-heading font-bold text-foreground-dim/30">
                          {project.title.charAt(0)}
                        </span>
                      )}
                    {project.link && (
                      <div className="absolute top-4 right-4 z-[3]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs font-medium group-hover:border-accent/60 group-hover:bg-black/90 transition-all shadow-md">
                          Live Preview
                          <ExternalLink size={13} className="text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="feature-badge text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-foreground-dim mb-3">
                      <span>{project.year}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground-dim" />
                      <span>{project.type}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground-dim" />
                      <span>{project.client}</span>
                    </div>
                    {/* Description */}
                    <p className="text-foreground-muted text-sm leading-relaxed mb-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl font-bold group-hover:text-gradient transition-all">
                        {project.title}
                      </h3>
                      {project.link && (
                        <ExternalLink size={18} className="text-foreground-muted group-hover:text-foreground transition-colors" />
                      )}
                    </div>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-base overflow-hidden group"
                >
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div className="h-full">{cardContent}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <AnimatedSection className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 btn-secondary text-sm"
            >
              View Concept Work
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <ProcessSection />

      {/* ===================== WHY CHOOSE US ===================== */}
      <WhyChooseUs />

      {/* ===================== TEAM ===================== */}
      <TeamCarousel />

      {/* ===================== WHAT TO EXPECT ===================== */}
      <WhatToExpect />

      {/* ===================== FAQ ===================== */}
      <FAQSection />

      {/* ===================== CONTACT / CTA ===================== */}
      <section className="section-padding bg-background-secondary overflow-hidden w-full max-w-full" id="contact">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* CTA Copy */}
            <AnimatedSection direction="left">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Let&apos;s Build Something
                <br />
                <span className="text-gradient">That Actually Grows</span>
              </h2>
              <p className="text-foreground-muted text-lg leading-relaxed mb-8">
                Tell us what you want to build
              </p>
              <div className="space-y-4 text-foreground-muted text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim" />
                  Free initial consultation
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim" />
                  Response within 24 hours
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim" />
                  No commitment required
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="card-base p-8">
                <ContactFormSimple />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
