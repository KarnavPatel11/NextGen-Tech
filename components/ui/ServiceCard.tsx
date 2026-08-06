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
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <Link href={`/services/${service.slug}`} className="block group h-full">
        <div className="card-base p-7 h-full flex flex-col justify-between rounded-[28px] border border-white/15 border-t-white/35 bg-white/5 backdrop-blur-2xl shadow-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-sky-400/40 group-hover:shadow-2xl">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400/20 via-indigo-500/20 to-purple-500/20 border border-white/25 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:from-sky-400/30 group-hover:to-purple-500/30 transition-all duration-300">
              <Icon size={26} className="text-sky-300 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover:text-gradient-cyan transition-all">
              {service.shortTitle}
            </h3>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sky-400 text-xs tracking-wider uppercase font-semibold transition-all group-hover:text-sky-300">
            <span>Learn Service</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
