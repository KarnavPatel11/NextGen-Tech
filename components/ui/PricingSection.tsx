"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description:
      "For small businesses needing a website or basic marketing setup",
    price: "₹1,25,000+",
    period: "/ Project",
    cta: "Book Consultation",
    ctaHref: "/#contact",
    popular: false,
    features: [
      "Landing page or small website",
      "Basic SEO and analytics setup",
      "Contact form and lead routing",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Growth",
    description:
      "For businesses needing website + ongoing marketing or social management",
    price: "₹1,60,000+",
    period: "/ Project",
    cta: "Book Consultation",
    ctaHref: "/#contact",
    popular: true,
    features: [
      "Website or e-commerce foundation",
      "Campaign and content setup",
      "Social media management options",
      "Automation-ready integrations",
      "Launch support and optimization",
    ],
  },
  {
    name: "Custom / Enterprise",
    description:
      "For full builds: app, AI integration, automation, and marketing",
    price: "Custom",
    period: "/ Scope",
    cta: "Discuss Scope",
    ctaHref: "/#contact",
    popular: false,
    features: [
      "Web app or mobile app builds",
      "AI workflows and internal tools",
      "Advanced backend integrations",
      "Marketing and analytics systems",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding bg-background" id="pricing">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-6 inline-block">Pricing Plan</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Plans
            <br />
            <span className="text-gradient">For Modern Growth</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a starting point for your website, marketing, automation, or
            full digital build — then we scope the details clearly before work
            begins.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-[32px] p-8 md:p-10 border backdrop-blur-2xl transition-all duration-300 ${
                plan.popular
                  ? "bg-white/10 border-sky-400/50 border-t-white/60 shadow-2xl shadow-sky-500/20"
                  : "bg-white/5 border-white/15 border-t-white/35 shadow-xl hover:bg-white/10 hover:border-white/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg border border-white/40 tracking-wider uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-2">
                <h3 className="font-heading text-2xl font-bold mb-3 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-foreground-muted text-sm ml-2 font-medium">
                    {plan.period}
                  </span>
                )}
              </div>

              <Link
                href={plan.ctaHref}
                className={`block text-center w-full mb-8 ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="border-t border-white/10 pt-6">
                <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-4">
                  Included Features
                </p>
                <ul className="space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-foreground-muted font-medium"
                    >
                      <div className="p-1 rounded-full bg-sky-400/20 text-sky-300 mt-0.5 shrink-0 border border-sky-400/30">
                        <Check size={12} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
