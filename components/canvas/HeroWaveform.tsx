"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type HeroWaveformProps = {
  isMobile?: boolean;
  onReady?: () => void;
};

export default function HeroWaveform({ isMobile = false, onReady }: HeroWaveformProps) {
  const bars = useRef<Array<THREE.Mesh | null>>([]);
  const group = useRef<THREE.Group>(null);
  const total = isMobile ? 28 : 56;
  const radius = isMobile ? 3.5 : 4.8;

  const items = useMemo(
    () =>
      Array.from({ length: total }, (_, index) => {
        const angle = (index / total) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [
            number,
            number,
            number
          ],
          rotationY: -angle
        };
      }),
    [radius, total]
  );

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.1;
    }
    bars.current.forEach((bar, i) => {
      if (!bar) return;
      const wave = Math.sin(t * 2.1 + i * 0.32) + Math.cos(t * 1.2 + i * 0.2);
      const height = THREE.MathUtils.mapLinear(wave, -2, 2, 0.35, isMobile ? 2.1 : 2.8);
      bar.scale.y = height;
      bar.position.y = (height - 1) / 2;

      const hue = 0.52 + ((Math.sin(t * 0.26 + i * 0.04) + 1) * 0.08);
      const mat = bar.material as THREE.MeshStandardMaterial;
      mat.color.setHSL(hue, 0.9, 0.55);
      mat.emissive.setHSL(hue, 0.9, 0.2);
    });
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight intensity={1.4} position={[0, 4, 2]} color="#00d4ff" />
      <pointLight intensity={1.4} position={[0, -4, -2]} color="#a855f7" />

      <group ref={group}>
        {items.map((item, index) => (
          <mesh
            key={index}
            ref={(node) => {
              bars.current[index] = node;
            }}
            position={item.position}
            rotation={[0, item.rotationY, 0]}
          >
            <boxGeometry args={[0.12, 1, 0.12]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={0.25}
              metalness={0.2}
              roughness={0.32}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
