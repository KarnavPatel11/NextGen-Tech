"use client";

export default function LogoStrip() {
  const logos = [
    "TechVista",
    "GrowthPulse",
    "CloudSync",
    "Nexus",
    "Meridian",
    "Quantum",
    "Velocity",
    "Prism",
    "Apex",
    "Zenith",
  ];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="mx-12 flex items-center justify-center min-w-[120px]"
          >
            <span className="text-foreground-dim/40 font-heading font-bold text-xl tracking-wider uppercase select-none hover:text-foreground-dim/60 transition-colors">
              {logo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
