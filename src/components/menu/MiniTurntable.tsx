"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/theme";

function Turntable({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.9, 0.9, 0.9, 32]} />
        <meshStandardMaterial color={COLORS.cream} roughness={0.55} />
      </mesh>
      <mesh position={[0.47, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.9, 0.14, 16, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function MiniTurntable({ accentColor }: { accentColor: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} color={COLORS.cream} />
        <pointLight position={[2, 2, 3]} intensity={22} color={COLORS.champagne} />
        <Turntable accentColor={accentColor} />
      </Suspense>
    </Canvas>
  );
}
