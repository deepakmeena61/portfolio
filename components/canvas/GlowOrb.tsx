"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type GlowOrbProps = {
  isMobile?: boolean;
};

export default function GlowOrb({ isMobile = false }: GlowOrbProps) {
  const orb = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const trail = useRef<THREE.Points>(null);

  const trailData = useMemo(() => {
    const count = isMobile ? 90 : 190;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 1.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = r * Math.cos(phi) * 0.72;
      array[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return array;
  }, [isMobile]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scroll = typeof window === "undefined" ? 0 : Math.min(window.scrollY / 1600, 1);
    const pulse = 1 + Math.sin(t * 2.2) * 0.04 + scroll * 0.07;

    if (orb.current) {
      orb.current.scale.setScalar(pulse);
      orb.current.rotation.y = t * 0.18;
      const mat = orb.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.65 + Math.sin(t * 1.8) * 0.08;
    }
    if (ringA.current) {
      ringA.current.rotation.x = t * 0.3;
      ringA.current.rotation.z = t * 0.17;
    }
    if (ringB.current) {
      ringB.current.rotation.y = -t * 0.28;
      ringB.current.rotation.z = t * 0.14;
    }
    if (trail.current) {
      trail.current.rotation.y = t * 0.08;
      trail.current.rotation.x = -t * 0.06;
    }
  });

  return (
    <>
      <ambientLight intensity={0.58} />
      <pointLight intensity={1.5} color="#00d4ff" position={[3, 3, 2]} />
      <pointLight intensity={1.4} color="#a855f7" position={[-3, -3, -1]} />

      <mesh ref={orb}>
        <sphereGeometry args={[1.05, isMobile ? 28 : 56, isMobile ? 28 : 56]} />
        <meshStandardMaterial
          color="#2dd4ff"
          emissive="#8b5cf6"
          emissiveIntensity={0.65}
          roughness={0.16}
          metalness={0.35}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.032, 10, isMobile ? 72 : 130]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.72} />
      </mesh>

      <mesh ref={ringB} rotation={[Math.PI / 4, 0.4, 0]}>
        <torusGeometry args={[2.05, 0.03, 10, isMobile ? 72 : 130]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.58} />
      </mesh>

      <points ref={trail}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailData.length / 3}
            array={trailData}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#e9d5ff" size={0.03} transparent opacity={0.8} depthWrite={false} />
      </points>
    </>
  );
}
