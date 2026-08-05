"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
});

export default function GlobalBackground() {
  const [isMobile, setIsMobile] = useState(true); // Default true to avoid flash of heavy canvas
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  // Don't render global background on admin routes
  if (pathname?.startsWith("/admin")) return null;

  // Don't render WebGL on mobile for performance
  if (isMobile) return null;

  return <BackgroundScene />;
}
