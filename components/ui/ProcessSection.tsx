"use client";

import { motion } from "motion/react";
import InteractiveCard from "./InteractiveCard";

const steps = [
  {
    number: "/01",
    title: "Discover",
    description:
      "We learn your business, goals, audience, and current operational gaps.",
  },
  {
    number: "/02",
    title: "Design",
    description:
      "We plan the system: website, app, marketing engine, or automation workflow.",
  },
  {
    number: "/03",
    title: "Develop",
    description:
      "We build, integrate, and test fast — with clear milestones and iterative reviews.",
  },
  {
    number: "/04",
    title: "Launch & Grow",
    description:
      "We deploy, market, measure, and keep optimizing after launch.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-background overflow-hidden w-full max-w-full" id="process">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label mb-6 inline-block">Our Process</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl tracking-tight">
            The Journey to
            <br />
            <span className="text-gradient">Measurable Growth</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl leading-relaxed">
            We keep the process practical: understand the gap, design the
            system, build fast, then optimize after launch.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <InteractiveCard className="p-8 h-full">
                <span className="process-number block mb-4">{step.number}</span>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {step.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

