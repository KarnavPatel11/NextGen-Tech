"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Animated gradient background as fallback */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)",
        }}
      />
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent-light animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SceneLoader() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return <SceneFallback />;

  // On mobile, use the lightweight CSS fallback instead of WebGL
  if (isMobile) return <SceneFallback />;

  return <HeroScene />;
}
