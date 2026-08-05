"use client";

import { motion } from "motion/react";

const expectations = [
  {
    tag: "Clarity",
    title: "Weekly updates and visible progress",
    description:
      "Clear communication, practical scopes, and builds that focus on business outcomes — not just pretty screens.",
  },
  {
    tag: "Engineering plus automation thinking",
    title: "Modern websites, apps, and automations",
    description:
      "Modern websites, apps, and automations designed to reduce manual work and create smoother customer journeys.",
  },
  {
    tag: "Data-driven launch and optimization",
    title: "Analytics-backed decisions",
    description:
      "Marketing and product decisions backed by analytics, campaign data, and measurable next steps after launch.",
  },
  {
    tag: "Partnership",
    title: "Founder-led delivery",
    description:
      "Honest early-agency energy: fast execution, transparent tradeoffs, and a founder-led team that stays close to the work.",
  },
];

export default function WhatToExpect() {
  return (
    <section className="section-padding bg-background overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label mb-6 inline-block">
            What To Expect
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl tracking-tight">
            What You Can
            <br />
            <span className="text-gradient">Expect From Us</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expectations.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base p-8"
            >
              <span className="feature-badge mb-4 inline-block">
                {item.tag}
              </span>
              <p className="text-foreground-muted text-sm leading-relaxed mt-3">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
