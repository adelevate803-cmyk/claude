"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { scrollStory } from "./scrollState";
import { clamp, lerp, sceneT, sceneTLinear } from "./math";
import { COLORS } from "@/lib/theme";

const SLICE_COUNT = 6;
const FAN_RADIUS = 2.1;

function useMouseParallax(strength = 0.6) {
  const target = useRef({ x: 0, y: 0 });
  useFrame(({ pointer }) => {
    target.current.x = pointer.x * strength;
    target.current.y = pointer.y * strength * 0.5;
  });
  return target;
}

export default function RollScene({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  const monogramRef = useRef<THREE.Group>(null);
  const crepeRef = useRef<THREE.Mesh>(null);
  const fillingRefs = useRef<THREE.Mesh[]>([]);
  const rollRef = useRef<THREE.Mesh>(null);
  const knifeRef = useRef<THREE.Mesh>(null);
  const sliceGroupRefs = useRef<THREE.Group[]>([]);
  const chopstickRefs = useRef<THREE.Group[]>([]);
  const potRef = useRef<THREE.Mesh>(null);
  const cartGroupRef = useRef<THREE.Group>(null);
  const underglowRef = useRef<THREE.Mesh>(null);
  const sealGroupRef = useRef<THREE.Group>(null);
  const worldRef = useRef<THREE.Group>(null);

  const parallax = useMouseParallax(isMobile ? 0 : 0.6);

  const sliceColors = useMemo(
    () => [COLORS.pistachio, COLORS.cocoa, COLORS.champagne, COLORS.pistachio, COLORS.cocoa, COLORS.champagne],
    [],
  );

  const fillingColors = useMemo(() => [COLORS.cream, "#C4432E", COLORS.cocoa], []);

  useFrame((_, delta) => {
    const p = scrollStory.progress;

    // Gentle world parallax + idle rotation, dampened toward pointer target.
    if (worldRef.current) {
      const targetX = parallax.current.y * 0.15;
      const targetY = parallax.current.x * 0.25;
      worldRef.current.rotation.x = lerp(worldRef.current.rotation.x, targetX, Math.min(1, delta * 3));
      worldRef.current.rotation.y = lerp(worldRef.current.rotation.y, targetY, Math.min(1, delta * 3));
    }

    // --- Scene 0: curtain / monogram ---------------------------------
    if (monogramRef.current) {
      const tIn = sceneT(p, 0);
      const tOut = 1 - sceneT(p, 1);
      const visibility = Math.min(tIn, p < 1 ? 1 : tOut);
      monogramRef.current.visible = visibility > 0.01;
      const scale = lerp(0.4, 1, tIn) * Math.max(visibility, 0.0001);
      monogramRef.current.scale.setScalar(scale);
      monogramRef.current.rotation.z += delta * 0.15;
    }

    // --- Scene 1: the wrap (crepe unrolls, fillings drop) ------------
    const crepeIn = sceneT(p, 1);
    const crepeOut = 1 - sceneT(p, 2);
    const crepeVisibility = p < 2 ? crepeIn : crepeOut;
    if (crepeRef.current) {
      crepeRef.current.visible = crepeVisibility > 0.01 && p < 2.4;
      crepeRef.current.scale.set(lerp(0.2, 1.6, crepeIn), 1, lerp(0.2, 1.1, crepeIn));
      const mat = crepeRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = crepeVisibility;
    }
    fillingRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const start = 1.15 + i * 0.12;
      const t = sceneTLinear(p, start);
      const dropped = smoothCurve(t);
      mesh.visible = p >= 1 && p < 2.4;
      mesh.position.y = lerp(2.2, 0.14, dropped);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = clamp(crepeVisibility * (t > 0 ? 1 : 0), 0, 1);
    });

    // --- Scene 2: the roll (crepe curls into a cylinder) -------------
    const rollIn = sceneT(p, 2);
    const rollOut = 1 - sceneT(p, 3);
    const rollVisible = p < 3 ? rollIn : rollOut;
    if (rollRef.current) {
      rollRef.current.visible = rollVisible > 0.01 && p < 3.4;
      rollRef.current.scale.set(lerp(0.1, 1, rollIn), lerp(0.1, 1, rollIn), lerp(0.1, 1, rollIn));
      rollRef.current.rotation.y += delta * 0.6;
      const mat = rollRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = rollVisible;
    }

    // --- Scene 3: the slice (knife sweep + fan out) -------------------
    const sliceT = sceneTLinear(p, 3);
    if (knifeRef.current) {
      const sweep = clamp(sliceT / 0.5, 0, 1);
      knifeRef.current.visible = p >= 3 && p < 3.5 && sliceT < 0.55;
      knifeRef.current.position.y = lerp(2.4, -2.4, sweep);
    }
    const fanT = smoothstepLocal(clamp((sliceT - 0.4) / 0.6, 0, 1));
    sliceGroupRefs.current.forEach((group, i) => {
      if (!group) return;
      const angle = (i / SLICE_COUNT) * Math.PI * 2;
      const visible = p >= 3.35;
      group.visible = visible;
      const radius = lerp(0, FAN_RADIUS, fanT);
      group.position.x = Math.cos(angle) * radius;
      group.position.z = Math.sin(angle) * radius * 0.55;
      group.position.y = lerp(0, 0, fanT);
      group.rotation.y = lerp(0, angle * 0.4, fanT);
      const s = lerp(0.001, 1, fanT);
      group.scale.setScalar(s);

      // Scene 6 (dip): lift piece 0 toward the chopsticks/pot.
      if (i === 0) {
        const dipT = sceneT(p, 5);
        const lift = smoothCurve(clamp(dipT * 1.3, 0, 1));
        const overPot = clamp((dipT - 0.5) * 2, 0, 1);
        group.position.y = lerp(group.position.y, 0.9, lift * (1 - overPot)) + overPot * lerp(0.9, 0.15, clamp((dipT - 0.75) * 4, 0, 1));
        group.position.x = lerp(group.position.x, 0, overPot * 0.9);
        group.position.z = lerp(group.position.z, 1.6, overPot);
      }

      // Scene 7 (cart reveal): pieces settle back toward center, slightly smaller.
      const cartT = sceneT(p, 6);
      if (cartT > 0) {
        const settle = radius * (1 - cartT * 0.35);
        group.position.x = Math.cos(angle) * settle;
        group.position.z = Math.sin(angle) * settle * 0.55 + cartT * 0.4;
      }

      // Scene 8 (halal): everything dims slightly so the seal reads clearly.
      const halalT = sceneT(p, 7);
      group.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
        if (mat && "opacity" in mat) {
          mat.transparent = true;
          mat.opacity = lerp(1, 0.35, halalT) * lerp(1, 0, sceneT(p, 8));
        }
      });
    });

    // --- Chopsticks (scene 5) -----------------------------------------
    const dipT = sceneT(p, 5);
    chopstickRefs.current.forEach((group, i) => {
      if (!group) return;
      const visible = p >= 4.6 && p < 6.2;
      group.visible = visible;
      const side = i === 0 ? -1 : 1;
      const pinch = lerp(0.55, 0.16, smoothCurve(clamp(dipT * 1.3, 0, 1)));
      const approach = smoothCurve(clamp(dipT * 2, 0, 1));
      group.position.x = lerp(side * 2.6, side * pinch, approach);
      group.position.y = lerp(1.6, 0.95, approach);
      const overPot = clamp((dipT - 0.7) * 3.3, 0, 1);
      group.position.y = lerp(group.position.y, 0.25, overPot);
      group.position.z = lerp(0, 1.6, clamp((dipT - 0.5) * 2, 0, 1));
      group.rotation.z = side * lerp(0.5, 0.18, approach);
    });
    if (potRef.current) {
      potRef.current.visible = p >= 4.6 && p < 6.2;
      const t = sceneT(p, 5);
      potRef.current.scale.setScalar(lerp(0.001, 1, clamp(t * 2, 0, 1)));
      potRef.current.position.z = 1.6;
    }

    // --- Scene 6: the cart ---------------------------------------------
    const cartT = sceneT(p, 6);
    if (cartGroupRef.current) {
      cartGroupRef.current.visible = cartT > 0.02 && p < 7.9;
      const s = lerp(0.001, 1, cartT);
      cartGroupRef.current.scale.setScalar(s);
      cartGroupRef.current.position.y = lerp(-1.2, -1.55, cartT);
    }
    if (underglowRef.current) {
      const pulse = 0.6 + Math.sin(performance.now() * 0.002) * 0.15;
      const mat = underglowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = cartT > 0.5 ? pulse : 0;
    }

    // Camera: gentle push-in for scenes 0-5, pull back to reveal cart (6),
    // hold + slight rise for halal (7), then ease back for book (8).
    const camPullBack = sceneT(p, 6);
    const camBookEase = sceneT(p, 8);
    const baseZ = lerp(6.4, 5.6, sceneT(p, 1));
    const targetZ = lerp(baseZ, 8.6, camPullBack) - camBookEase * 1.2;
    camera.position.z = lerp(camera.position.z, targetZ, Math.min(1, delta * 2.5));
    const targetY = lerp(0, 0.6, camPullBack) - camBookEase * 0.3;
    camera.position.y = lerp(camera.position.y, targetY, Math.min(1, delta * 2.5));
    camera.lookAt(0, 0, 0);

    // --- Scene 7: halal seal --------------------------------------------
    const halalT = sceneT(p, 7);
    const halalOut = sceneT(p, 8);
    if (sealGroupRef.current) {
      sealGroupRef.current.visible = p >= 7 && p < 8.6;
      const s = lerp(0.001, 1.15, smoothCurve(halalT)) * lerp(1, 0.001, halalOut);
      sealGroupRef.current.scale.setScalar(s);
      sealGroupRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={worldRef}>
      <color attach="background" args={[COLORS.velvet]} />
      <fog attach="fog" args={[COLORS.velvet, 6, 15]} />

      <ambientLight intensity={0.55} color={COLORS.cream} />
      <pointLight position={[3, 4, 4]} intensity={40} color={COLORS.champagne} />
      <pointLight position={[-4, -2, -3]} intensity={18} color={COLORS.softGold} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} color={COLORS.cream} />

      <Sparkles
        count={isMobile ? 30 : 90}
        scale={[8, 5, 6]}
        size={2.5}
        speed={0.25}
        opacity={0.5}
        color={COLORS.champagne}
      />

      {/* Scene 0 — monogram: gold ring + diamond, the logo's own motif */}
      <group ref={monogramRef} position={[0, 0.2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.03, 16, 64]} />
          <meshStandardMaterial color={COLORS.champagne} metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshStandardMaterial color={COLORS.champagne} metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* Scene 1 — the crepe sheet */}
      <mesh ref={crepeRef} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[2.4, 1.8, 1, 1]} />
        <meshStandardMaterial
          color={COLORS.cream}
          roughness={0.6}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {fillingColors.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) fillingRefs.current[i] = el;
          }}
          position={[lerp(-0.6, 0.6, i / 2), 2.2, lerp(-0.3, 0.3, (i % 2) - 0.5)]}
        >
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.5} transparent opacity={1} />
        </mesh>
      ))}

      {/* Scene 2 — the rolled log */}
      <mesh ref={rollRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 2.2, 32]} />
        <meshStandardMaterial color={COLORS.cream} roughness={0.55} transparent opacity={1} />
      </mesh>

      {/* Scene 3 — knife sweep */}
      <mesh ref={knifeRef} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.6, 0.02, 0.6]} />
        <meshStandardMaterial color={COLORS.champagne} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Sliced pieces, fanned out and reused across scenes 3-8 */}
      {Array.from({ length: SLICE_COUNT }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) sliceGroupRefs.current[i] = el;
          }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.32, 24]} />
            <meshStandardMaterial color={COLORS.cream} roughness={0.55} />
          </mesh>
          <mesh position={[0.17, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.32, 0.05, 12, 24]} />
            <meshStandardMaterial color={sliceColors[i]} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Scene 5 — chopsticks + dipping pot */}
      {[0, 1].map((i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) chopstickRefs.current[i] = el;
          }}
        >
          <mesh>
            <boxGeometry args={[0.04, 1.8, 0.04]} />
            <meshStandardMaterial color={COLORS.cocoa} roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh ref={potRef} position={[0, -0.35, 1.6]}>
        <cylinderGeometry args={[0.32, 0.24, 0.3, 24]} />
        <meshStandardMaterial color={COLORS.cocoa} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Scene 6 — the cart */}
      <group ref={cartGroupRef} position={[0, -1.4, -1.4]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[3.4, 1.4, 1.4]} />
          <meshStandardMaterial color={COLORS.cream} roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[3.6, 0.12, 1.5]} />
          <meshStandardMaterial color={COLORS.champagne} metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh ref={underglowRef} position={[0, -0.35, 0]}>
          <boxGeometry args={[3.2, 0.06, 1.3]} />
          <meshStandardMaterial
            color="#6B2A8C"
            emissive="#8A3FCB"
            emissiveIntensity={0}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Scene 7 — halal seal */}
      <group ref={sealGroupRef} position={[0, 0.2, 1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.08, 16, 48]} />
          <meshStandardMaterial
            color={COLORS.champagne}
            emissive={COLORS.champagne}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.55, 48]} />
          <meshStandardMaterial color={COLORS.oxblood} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function smoothCurve(t: number) {
  // ease-out-back-ish curve without overshoot, for drops/lifts.
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 3);
}

function smoothstepLocal(t: number) {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}
