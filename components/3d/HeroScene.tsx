"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ============================================
   Interactive 3D Tech Core
   ============================================ */
function TechCore() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = t * 0.15;
      outerMeshRef.current.rotation.y = t * 0.25;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.2;
      innerMeshRef.current.rotation.z = t * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.1;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <group scale={1.3}>
        {/* Outer Metallic Wireframe Structure */}
        <mesh ref={outerMeshRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#e5e7eb"
            metalness={0.9}
            roughness={0.1}
            wireframe={true}
            transparent={true}
            opacity={0.35}
          />
        </mesh>

        {/* Inner Solid Glossy Chrome Core */}
        <mesh ref={innerMeshRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={1.0}
            roughness={0.05}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Outer Orbit Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#9ca3af"
            metalness={0.8}
            roughness={0.2}
            transparent={true}
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ============================================
   Floating Orbiting Nodes (Instanced)
   ============================================ */
function OrbitingNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 10;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodeData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      radius: 3.8 + (i % 3) * 0.8,
      speed: (0.2 + (i % 4) * 0.1) * (i % 2 === 0 ? 1 : -1),
      angleOffset: (i / count) * Math.PI * 2,
      yOffset: ((i % 5) - 2) * 0.6,
      scale: 0.12 + (i % 3) * 0.06,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    nodeData.forEach((node, i) => {
      const angle = t * node.speed + node.angleOffset;
      const x = Math.cos(angle) * node.radius;
      const z = Math.sin(angle) * node.radius;
      const y = node.yOffset + Math.sin(t * 1.5 + i) * 0.3;

      dummy.position.set(x, y, z);
      dummy.rotation.x = t * 0.5;
      dummy.rotation.y = t * 0.8;
      dummy.scale.setScalar(node.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#d1d5db"
        metalness={0.9}
        roughness={0.1}
        wireframe={false}
      />
    </instancedMesh>
  );
}

/* ============================================
   Background Particle Field
   ============================================ */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#9ca3af"
        transparent={true}
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
}

/* ============================================
   Camera Mouse Controller
   ============================================ */
function CameraController({ mouse }: { mouse: React.RefObject<{ x: number; y: number } | null> }) {
  const { camera } = useThree();

  useFrame(() => {
    if (mouse.current) {
      camera.position.x += (mouse.current.x * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (mouse.current.y * 1.5 - camera.position.y) * 0.04;
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ============================================
   Main Exported 3D Scene
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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-auto"
        onMouseMove={handleMouseMove}
      />
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 55 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#6b7280" />
        <pointLight position={[0, 0, 5]} intensity={1.2} color="#e5e7eb" />

        <CameraController mouse={mouseRef} />
        <TechCore />
        <OrbitingNodes />
        <ParticleField />
      </Canvas>
    </div>
  );
}
