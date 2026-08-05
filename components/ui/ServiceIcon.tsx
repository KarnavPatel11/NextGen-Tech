"use client";

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

interface ServiceIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function ServiceIcon({ name, size = 24, className = "" }: ServiceIconProps) {
  const Icon = iconMap[name] || Globe;
  return <Icon size={size} className={className} />;
}
