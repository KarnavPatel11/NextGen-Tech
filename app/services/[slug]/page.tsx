import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services, getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | NextGen Tech`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <div className="pt-28 pb-20">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          All Services
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <AnimatedSection>
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1b1b1b] border border-card-border flex items-center justify-center shrink-0">
              <ServiceIcon name={service.iconName} size={32} className="text-foreground-muted" />
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {service.title}
              </h1>
              <p className="text-foreground-muted text-lg leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Long description */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <AnimatedSection>
          <div className="card-base p-8 md:p-12">
            <p className="text-foreground-muted text-lg leading-relaxed">
              {service.longDescription}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Features + Benefits */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Features */}
          <AnimatedSection direction="left">
            <h2 className="font-heading text-2xl font-bold mb-6">
              What&apos;s Included
            </h2>
            <div className="space-y-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-foreground-dim shrink-0 mt-0.5" />
                  <span className="text-foreground-muted">{feature}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Benefits */}
          <AnimatedSection direction="right" delay={0.2}>
            <h2 className="font-heading text-2xl font-bold mb-6">
              Key Benefits
            </h2>
            <div className="space-y-4">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="card-base p-4 flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim shrink-0" />
                  <span className="text-foreground-muted">{benefit}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <AnimatedSection>
          <div className="card-base p-12 text-center bg-background-secondary">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started with {service.shortTitle}?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Let&apos;s discuss your goals and create a tailored strategy for
              your business.
            </p>
            <Link href="/#contact" className="btn-primary text-lg px-8 py-4">
              Get a Free Quote
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Prev/Next navigation */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center border-t border-card-border pt-8">
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">{prevService.shortTitle}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
            >
              <span className="text-sm">{nextService.shortTitle}</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
