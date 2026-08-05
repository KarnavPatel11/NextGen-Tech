"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import FAQSchema from "@/components/seo/FAQSchema";

const faqs = [
  {
    question: "What services does NextGen Tech offer?",
    answer:
      "We offer web development, app development, AI integration, automation, digital marketing, social media marketing, social media management, festival poster & logo design, and e-commerce solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. A landing page or small website typically takes 2–4 weeks. Larger projects like web apps, mobile apps, or full marketing systems can range from 6–12 weeks. We set clear milestones and keep you updated throughout.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We provide post-launch support, optimization, and maintenance packages. We don't disappear after delivery — we stay close to help you grow and iterate based on real data.",
  },
  {
    question: "Can I hire you for just one service?",
    answer:
      "Absolutely. While we offer full-stack solutions, you can engage us for a single service — whether it's a website, a marketing campaign, an AI integration, or social media management.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We work with businesses of all sizes. Our Starter plan is designed specifically for small businesses and early-stage startups that need a professional digital presence without enterprise-level budgets.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <FAQSchema faqs={faqs} />
      <section className="section-padding bg-background-secondary overflow-hidden w-full max-w-full">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-6 inline-block">FAQs</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Frequently Asked
            <br />
            <span className="text-gradient">Questions</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-card-border">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="text-base md:text-lg font-medium text-foreground pr-8">
                  {faq.question}
                </span>
                <span className="shrink-0 text-foreground-muted">
                  {openIndex === i ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-foreground-muted text-sm leading-relaxed pb-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
