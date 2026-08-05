"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role?: string;
  content: string;
  rating: number;
}

// Placeholder testimonials for initial render before DB data loads
const placeholderTestimonials: Testimonial[] = [
  {
    id: "1",
    clientName: "Sarah Chen",
    company: "TechVista Inc.",
    role: "CEO",
    content:
      "NextGen Tech transformed our entire digital presence. The AI integration they built saves us 20+ hours per week, and our new website converts 3x better than before. They don't just build — they innovate.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "Marcus Rodriguez",
    company: "GrowthPulse",
    role: "Head of Marketing",
    content:
      "The social media strategy NextGen Tech developed for us was a game-changer. We went from 2K to 50K engaged followers in 6 months. Their data-driven approach and creative content are unmatched.",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Emily Watson",
    company: "Nexus Commerce",
    role: "Founder",
    content:
      "Our e-commerce platform needed a complete overhaul. NextGen Tech delivered a stunning, lightning-fast store that increased our revenue by 180%. The attention to detail and UX expertise is incredible.",
    rating: 5,
  },
  {
    id: "4",
    clientName: "David Park",
    company: "CloudSync Solutions",
    role: "CTO",
    content:
      "As a fellow tech company, we had high standards. NextGen Tech exceeded every one. Their app development team built a cross-platform solution that our users love, on time and on budget.",
    rating: 5,
  },
  {
    id: "5",
    clientName: "Aisha Patel",
    company: "Meridian Group",
    role: "Digital Director",
    content:
      "The digital transformation consulting from NextGen Tech helped us modernize decade-old processes. We're now fully cloud-based, automated, and our team productivity has doubled. True partners in innovation.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const testimonials = placeholderTestimonials;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden min-h-[280px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-center px-4"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-accent text-accent" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-8 text-gradient">
              &ldquo;{t.content}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold mb-2">
                {t.clientName.charAt(0)}
              </div>
              <p className="font-heading font-semibold text-foreground">
                {t.clientName}
              </p>
              <p className="text-foreground-muted text-sm">
                {t.role && `${t.role}, `}{t.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-glass-border hover:border-accent/50 hover:bg-accent/10 transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current
                  ? "bg-accent w-6"
                  : "bg-foreground-dim/30 hover:bg-foreground-dim/60"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full border border-glass-border hover:border-accent/50 hover:bg-accent/10 transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
