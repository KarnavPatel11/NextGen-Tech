"use client";

export default function StatsMarquee() {
  const stats = [
    "Services Offered",
    "Founded",
    "2026",
    "Client Onboarding",
    "Projects Launched",
    "Years Of Experience",
    "Happy Clients",
    "Services Offered",
    "Founded",
    "2026",
    "Client Onboarding",
  ];

  return (
    <div className="py-8 border-y border-card-border bg-background-secondary overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...stats, ...stats].map((stat, i) => (
          <span
            key={i}
            className="mx-8 text-sm md:text-base text-foreground-muted font-medium tracking-wide flex items-center gap-8"
          >
            {stat}
            <span className="w-1.5 h-1.5 rounded-full bg-foreground-dim" />
          </span>
        ))}
      </div>
    </div>
  );
}
