"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Service } from "@/lib/services-data";
import {
  Globe,
  Share2,
  Users,
  Code,
  Smartphone,
  Bot,
  ArrowRightLeft,
  ShoppingCart,
  Palette,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Share2,
  Users,
  Code,
  Smartphone,
  Bot,
  ArrowRightLeft,
  ShoppingCart,
  Palette,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.iconName] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/services/${service.slug}`} className="block group">
        <div className="card-base p-6 h-full">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-cyan/20 flex items-center justify-center mb-5 group-hover:from-accent/30 group-hover:to-cyan/30 transition-all">
            <Icon size={24} className="text-accent-light" />
          </div>
          <h3 className="font-heading font-semibold text-lg mb-3 group-hover:text-gradient transition-all">
            {service.shortTitle}
          </h3>
          <p className="text-foreground-muted text-sm leading-relaxed">
            {service.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
