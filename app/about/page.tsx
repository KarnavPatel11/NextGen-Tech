import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import {
  Lightbulb,
  Heart,
  Users,
  Rocket,
  Check,
  MousePointerClick,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About NextGen Tech — AI-First Digital Agency & Software House in Ahmedabad",
  description:
    "Meet the founding team behind NextGen Tech. We're a developer-led digital agency in Ahmedabad, India specializing in web development, AI integration, and digital marketing. Learn about our mission, values, and approach.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About NextGen Tech — Our Team, Mission & Values",
    description:
      "Founder-led team of developers, marketers, and system thinkers building scalable digital experiences for businesses in India.",
  },
};

const stats = [
  { value: "8", label: "Services Offered" },
  { value: "2026", label: "Founded" },
  { value: "100%", label: "Client Focus" },
  { value: "3", label: "Founding Partners" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push the boundaries of what's possible. From AI integration to cutting-edge web experiences, we stay ahead of the curve.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We love what we do. Every project is an opportunity to create something meaningful and impactful for our clients.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work alongside your team, not in a silo. True partnership means shared goals, transparent communication, and mutual respect.",
  },
  {
    icon: Rocket,
    title: "Excellence",
    description:
      "Good enough isn't good enough. We obsess over quality, performance, and user experience in everything we build.",
  },
];

const team = [
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
    role: "Founder",
    name: "Karnav Patel",
    title: "Creative & Marketing",
    description:
      "Creating powerful branding, social media campaigns, creative strategies, and business growth solutions.",
    skills: [
      "Branding",
      "Marketing",
      "Content Strategy",
      "Graphic Design",
      "Social Media",
    ],
    image: "/images/8k6Berw12UVQksnDsQX0hgMEs.png",
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

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Building the Future,
              <br />
              <span className="text-gradient">Together</span>
            </h1>
            <p className="text-foreground-muted text-lg leading-relaxed">
              We&apos;re a founder-led team of developers, marketers, and
              system thinkers united by a shared mission: to help businesses
              thrive in the digital age through practical innovation and
              genuine partnership.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="card-base p-8 text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground-muted text-sm">
                  {stat.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-6">
                NextGen Tech exists to bridge the gap between ambitious
                businesses and transformative technology. We believe every
                company deserves access to modern digital solutions —
                not just the Fortune 500.
              </p>
              <p className="text-foreground-muted leading-relaxed">
                We combine technical expertise with practical thinking to
                deliver solutions that focus on business outcomes —
                not just pretty screens.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="card-base p-8">
                <h3 className="font-heading font-bold text-xl mb-4">
                  Our Approach
                </h3>
                <div className="space-y-4">
                  {[
                    "Understand your business deeply before writing a single line of code",
                    "Design with the end user in mind — always",
                    "Build with scalable, maintainable technology stacks",
                    "Measure everything, optimize relentlessly",
                    "Stay with you long after launch day",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim mt-2 shrink-0" />
                      <span className="text-foreground-muted text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-foreground-muted">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="card-base p-8 flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#1b1b1b] border border-card-border flex items-center justify-center shrink-0">
                    <value.icon size={24} className="text-foreground-muted" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              <MousePointerClick className="w-4 h-4 animate-pulse" />
              <span>Founding Team & Specialists</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className="text-foreground-muted max-w-xl mx-auto">
              The founding partners behind NextGen Tech, dedicated to building
              scalable digital experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <div className="team-card relative group hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 flex flex-col justify-between h-full text-left p-8 bg-card-bg border border-card-border rounded-2xl overflow-hidden">
                  {/* Subtle accent glow on hover */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Animated mouse cursor logo badge */}
                  <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 text-foreground-muted group-hover:text-accent text-xs font-medium transition-all duration-300">
                    <MousePointerClick className="w-3.5 h-3.5 animate-bounce" />
                    <span>Interactive</span>
                  </div>

                  <div className="relative z-10">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/10 to-cyan/10 border border-card-border flex items-center justify-center mb-6 overflow-hidden backdrop-blur-md relative group-hover:border-accent/50 transition-all duration-500 shadow-md">
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
                    <span className="feature-badge mb-2">{member.role}</span>
                    <h3 className="font-heading text-xl font-bold text-white mt-2 mb-1 group-hover:text-accent transition-colors duration-300">
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
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/90 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300"
                        >
                          <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Let&apos;s Build Something{" "}
              <span className="text-gradient">Amazing</span>
            </h2>
            <p className="text-foreground-muted text-lg mb-8">
              Ready to work with a team that cares as much about your success as
              you do? Let&apos;s talk.
            </p>
            <Link href="/#contact" className="btn-primary text-lg px-8 py-4">
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
