"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function SubtleParticles({ count = 80 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        ),
        speed: 0.005 + Math.random() * 0.01,
        amp: Math.random() * 2,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      // Gentle floating animation
      const y = p.position.y + Math.sin(time * p.speed + p.offset) * p.amp;
      dummy.position.set(p.position.x, y, p.position.z);
      dummy.scale.setScalar(0.02);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function CameraPan() {
  const { camera } = useThree();
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.05) * 1.5;
    camera.position.y = Math.cos(time * 0.05) * 1.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 opacity-70 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <fog attach="fog" args={["#0a0a0f", 5, 15]} />
        <CameraPan />
        <SubtleParticles count={80} />
        <Stars radius={100} depth={50} count={800} factor={5} saturation={0} fade speed={0.5} />
      </Canvas>
      
      {/* Background Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%), radial-gradient(ellipse at 100% 100%, rgba(200, 200, 200, 0.03) 0%, transparent 50%)"
        }}
      />
    </div>
  );
}
