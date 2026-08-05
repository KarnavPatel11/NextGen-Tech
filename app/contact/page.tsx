import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact NextGen Tech — Free Consultation for Web & App Development",
  description:
    "Get in touch with NextGen Tech in Ahmedabad. Book a free consultation to discuss web development, app development, AI integration, or digital marketing for your business. Response within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact NextGen Tech — Free Consultation",
    description:
      "Book a free consultation to discuss your digital project. Web development, AI integration, digital marketing & more.",
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nextgentech2112@gmail.com",
    href: "mailto:nextgentech2112@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 87800 50252",
    href: "tel:+918780050252",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ahmedabad, Gujarat, India",
    href: null,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 10:00 AM – 7:00 PM IST",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s <span className="text-gradient">Talk</span>
            </h1>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Ready to start your project? Have a question? We&apos;d love to
              hear from you. Fill out the form below and we&apos;ll get back to
              you within 24 hours.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Form + Contact Info */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimatedSection direction="left">
              <div className="card-base p-8 md:p-10">
                <h2 className="font-heading font-bold text-2xl mb-2">
                  Send Us a Message
                </h2>
                <p className="text-foreground-muted text-sm mb-8">
                  Fill out the form below and we&apos;ll be in touch.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="card-base p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1b1b1b] border border-card-border flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-foreground-muted" />
                    </div>
                    <div>
                      <p className="text-foreground-dim text-xs uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground hover:text-foreground-muted transition-colors whitespace-pre-line"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
