"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const COLORS = ["#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#6366f1", "#00d4ff", "#14b8a6"];

export default function MiniEqualizer() {
  const bars = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    bars.current.forEach((bar, index) => {
      if (!bar) return;
      const n = Math.sin(t * 3 + index * 0.55) + Math.cos(t * 1.5 + index * 0.31);
      const h = THREE.MathUtils.mapLinear(n, -2, 2, 0.25, 1.9);
      bar.scale.y = h;
      bar.position.y = (h - 1) / 2;
    });
  });

  return (
    <>
      <ambientLight intensity={0.72} />
      <pointLight intensity={1.2} position={[0, 3, 2]} color="#00d4ff" />
      <group position={[-1.8, 0, 0]}>
        {COLORS.map((color, index) => (
          <mesh
            key={color}
            ref={(node) => {
              bars.current[index] = node;
            }}
            position={[index * 0.6, 0, 0]}
          >
            <boxGeometry args={[0.36, 1, 0.28]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
          </mesh>
        ))}
      </group>
    </>
  );
}
