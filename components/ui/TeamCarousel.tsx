"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  MousePointerClick,
} from "lucide-react";

const teamMembers = [
  {
    // role: "Founder",
    name: "Karnav Patel",
    title: "Creative & Marketing",
    description:
      "Creating powerful branding, social media campaigns, creative strategies, and business growth solutions.",
    skills: [
      "Branding",
      "Social Media Management",
      "Marketing",
      "Content Strategy",
      "Graphic Design",
      
    ],
    image: "/images/8k6Berw12UVQksnDsQX0hgMEs.png",
  },
  {
    role: "Partner",
    name: "Yash Patel",
    title: "Web Development & Technology",
    description:
      "Building modern websites, web applications, AI-powered solutions, and scalable digital experiences.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "UI Development"],
    image: "/images/9I7Qx7g7CBfFZ73OXVEkVFSQ.png",
  },
  {
    role: "Partner",
    name: "Setu Patel",
    title: "Video Editing & Digital Solutions",
    description:
      "Creating AI advertisements, professional promotional videos, motion graphics, and engaging visual content.",
    skills: [
      "Video Editing",
      "Motion Graphics",
      "AI Video",
      "Adobe Premiere",
      "Creative Production",
    ],
    image: "/images/zPbOW46xOX0IqHUqx1WsHTkDEeo.png",
  },
];

export default function TeamCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const scrollAmount = isMobile ? 290 : 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="section-padding bg-background-secondary relative overflow-hidden w-full max-w-full"
      id="team"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <MousePointerClick className="w-4 h-4 animate-pulse" />
              <span>Founding Team & Specialists</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Meet the
              <br />
              <span className="text-gradient">Founding Partners</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-card-border flex items-center justify-center hover:border-accent/40 hover:bg-accent/5 text-foreground transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-card-border flex items-center justify-center hover:border-accent/40 hover:bg-accent/5 text-foreground transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={scrollRef} className="scroll-container py-4 -mx-6 px-6 md:mx-0 md:px-0">
          {teamMembers.map((member, i) => (
            <motion.div
              key={`${member.name}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="team-card relative group hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 flex flex-col justify-between min-w-[260px] w-[82vw] sm:w-auto sm:min-w-[340px] md:min-w-[380px] max-w-[400px] text-left p-6 sm:p-8 bg-card-bg border border-card-border rounded-2xl overflow-hidden"
            >
              {/* Subtle accent glow on hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          

              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accent/10 to-cyan/10 border border-card-border flex items-center justify-center mb-6 overflow-hidden backdrop-blur-md relative group-hover:border-accent/50 transition-all duration-500 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-[1]" />
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative z-[2] w-full h-full object-cover opacity-90 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <span className="relative z-[2] text-xl font-bold text-gradient">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                {/* Role & Name */}
                {/* <span className="feature-badge mb-2">{member.role}</span> */}
                <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-1 group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gradient font-semibold text-sm mb-4">
                  {member.title}
                </p>
                <p className="text-foreground-muted text-sm leading-relaxed mb-6 border-b border-card-border/60 pb-6">
                  {member.description}
                </p>
              </div>

              {/* Skills */}
              <div className="relative z-10 mt-auto">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3 block">
                  Skills & Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="team-skill-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/90 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300"
                    >
                      <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

