"use client";

import { motion } from "motion/react";
import { Layers, Bot, DollarSign, Zap } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Full-Stack Team",
    description: "Web, apps, AI, and marketing under one roof",
    tagline: "One partner",
  },
  {
    icon: Bot,
    title: "AI-First Approach",
    description: "Automation built into real business workflows",
    tagline: "Modern systems",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear scopes, practical milestones, no inflated promises",
    tagline: "Honest delivery",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Lean builds with post-launch optimization",
    tagline: "Launch and grow",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-background-secondary overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-6 inline-block">
            Why Choose Us
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Why Modern Businesses
            <br />
            <span className="text-gradient">Partner With Us</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-cyan/10 border border-card-border flex items-center justify-center mx-auto mb-5 backdrop-blur-md">
                <feature.icon size={24} className="text-accent-light" />
              </div>
              <span className="text-xs text-foreground-dim uppercase tracking-wider block mb-2">
                {feature.tagline}
              </span>
              <h3 className="font-heading text-lg font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
