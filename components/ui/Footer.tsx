"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nextgen_tech.in/",
    icon: InstagramIcon,
    color: "hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592020960596",
    icon: FacebookIcon,
    color: "hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedInIcon,
    color: "hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917041180599",
    icon: WhatsAppIcon,
    color: "hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/10",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Contact Info */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image
                src="/logo.jpeg"
                alt="NextGen Tech"
                width={36}
                height={36}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-heading font-bold text-xl text-white">
                NextGen Tech
              </span>
            </Link>
            <div className="space-y-3 text-sm text-foreground-muted">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-foreground-dim mt-0.5 shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-foreground-dim shrink-0" />
                <a
                  href="mailto:nextgentech22@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  nextgentech22@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-foreground-dim shrink-0" />
                <span>+91 70411 80599</span> 
              </div>
            </div>
          </div>

          {/* Socials (Horizontal with Icons) */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-6">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3.5 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-dim transition-all duration-300 shadow-sm hover:-translate-y-1 ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="btn-secondary text-sm !py-2.5 !px-6"
            >
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground-dim">
            © 2026 NextGen Tech. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
