import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/lib/services-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Services — Web Dev, App Dev, AI Integration & Marketing",
  description:
    "Explore NextGen Tech's full range of digital services: web development, app development, AI integration & automation, digital marketing, social media management, and e-commerce solutions in Ahmedabad, India.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Digital Services | NextGen Tech",
    description:
      "From websites to AI automation — full-stack digital solutions for modern businesses.",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-foreground-muted text-lg leading-relaxed">
              From websites to AI automation — we deliver full-stack digital
              solutions that help your business grow, faster.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.06}>
              <Link href={`/services/${service.slug}`} className="block group">
                <div className="card-base p-8 h-full">
                  <span className="service-number block mb-3">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-foreground-dim text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Not sure which service <span className="text-gradient">fits?</span>
            </h2>
            <p className="text-foreground-muted text-lg mb-8">
              Book a free consultation and we&apos;ll help you figure out the
              right approach for your business.
            </p>
            <Link href="/#contact" className="btn-primary text-lg px-8 py-4">
              Free Consultation
            </Link>
          </AnimatedSection>
        </div>

      </section>
    </div>
  );
}
