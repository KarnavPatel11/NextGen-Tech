"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingGlassSpheres({ count = 12 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const spheres = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 8 - 4
      ),
      speed: 0.008 + Math.random() * 0.012,
      amp: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.25 + Math.random() * 0.45,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    spheres.forEach((p, i) => {
      const y = p.position.y + Math.sin(time * p.speed + p.offset) * p.amp;
      const x = p.position.x + Math.cos(time * p.speed * 0.7 + p.offset) * (p.amp * 0.5);
      dummy.position.set(x, y, p.position.z);
      dummy.rotation.x = time * 0.15;
      dummy.rotation.y = time * 0.2;
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial
        color="#7dd3fc"
        transmission={0.88}
        transparent={true}
        opacity={0.35}
        roughness={0.1}
        metalness={0.2}
        clearcoat={1}
      />
    </instancedMesh>
  );
}

function CameraPan() {
  const { camera } = useThree();
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.04) * 1.2;
    camera.position.y = Math.cos(time * 0.04) * 1.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 70 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
        <CameraPan />
        <FloatingGlassSpheres count={14} />
        <Stars radius={90} depth={40} count={600} factor={4} saturation={0} fade speed={0.4} />
      </Canvas>
      
      {/* iOS Liquid Wallpapers Radial Gradient Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
          `
        }}
      />
    </div>
  );
}
