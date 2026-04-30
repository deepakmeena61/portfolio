"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingShapes() {
  const icosa = useRef<THREE.Mesh>(null);
  const torus = useRef<THREE.Mesh>(null);
  const octa = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (icosa.current) {
      icosa.current.position.x = Math.sin(t * 0.6) * 2.4;
      icosa.current.position.y = Math.cos(t * 0.8) * 1.2;
      icosa.current.rotation.x = t * 0.7;
      icosa.current.rotation.y = t * 0.3;
    }
    if (torus.current) {
      torus.current.position.x = Math.cos(t * 0.5) * -2.7;
      torus.current.position.y = Math.sin(t * 0.7) * 1.1;
      torus.current.rotation.x = t * 0.4;
      torus.current.rotation.z = t * 0.5;
    }
    if (octa.current) {
      octa.current.position.z = Math.sin(t * 0.9) * 1.8;
      octa.current.position.y = Math.cos(t * 0.55) * -1.1;
      octa.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group>
      <mesh ref={icosa} position={[2.2, 0.5, -0.5]}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      <mesh ref={torus} position={[-2.4, -0.2, -1]}>
        <torusGeometry args={[0.5, 0.14, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.28}
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>
      <mesh ref={octa} position={[0.6, -0.5, 1]}>
        <octahedronGeometry args={[0.43, 0]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>
    </group>
  );
}
