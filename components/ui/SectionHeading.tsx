"use client";

import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={`mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-cyan ${
          centered ? "mx-auto" : ""
        }`}
      />
    </AnimatedSection>
  );
}
