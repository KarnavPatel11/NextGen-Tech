"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================
   Interactive Glass Sparkle Particles Overlay
   ============================================ */
function GlassSparkleField({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#7dd3fc"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ============================================
   Smooth Mouse Parallax Controller
   ============================================ */
function CameraController({ mouse }: { mouse: React.RefObject<{ x: number; y: number } | null> }) {
  const { camera } = useThree();

  useFrame(() => {
    if (mouse.current) {
      camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.current.y * 1.0 - camera.position.y) * 0.04;
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ============================================
   Main Exported Hero Scene with Uploaded Video
   ============================================ */
export default function HeroScene() {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-transparent">
      {/* User Uploaded Video Background (0ms Instant Playback) */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-75 filter brightness-105 contrast-110 pointer-events-none transition-opacity duration-700"
      />

      {/* Glassmorphism Radial Vignette & Aura Highlight */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.15) 0%, transparent 65%),
            radial-gradient(circle at 80% 20%, rgba(129, 140, 248, 0.12) 0%, transparent 50%),
            linear-gradient(180deg, rgba(3, 3, 8, 0.2) 0%, rgba(3, 3, 8, 0.6) 100%)
          `
        }}
      />

      {/* Interactive Glass Particles Overlay */}
      <div
        className="absolute inset-0 pointer-events-auto"
        onMouseMove={handleMouseMove}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1.0} />
          <CameraController mouse={mouseRef} />
          <GlassSparkleField count={140} />
        </Canvas>
      </div>
    </div>
  );
}


