"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SKILL_BANDS } from "@/lib/constants";

type SkillSpheresProps = {
  isMobile?: boolean;
};

type SkillBand = (typeof SKILL_BANDS)[number];

type NodeState = {
  band: SkillBand;
  radius: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
};

export default function SkillSpheres({ isMobile = false }: SkillSpheresProps) {
  const root = useRef<THREE.Group>(null);
  const nodesRef = useRef<Array<THREE.Group | null>>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoverOutTimer = useRef<number | null>(null);

  const clearHoverOutTimer = () => {
    if (hoverOutTimer.current !== null) {
      window.clearTimeout(hoverOutTimer.current);
      hoverOutTimer.current = null;
    }
  };

  const nodeStates = useMemo(() => {
    const bounds = isMobile
      ? { x: 2.35, y: 0.7, z: 1.45 }
      : { x: 3.2, y: 0.95, z: 2.2 };
    const spawned: THREE.Vector3[] = [];

    const makePosition = (radius: number) => {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const point = new THREE.Vector3(
          THREE.MathUtils.randFloat(-(bounds.x - radius), bounds.x - radius),
          THREE.MathUtils.randFloat(-(bounds.y - radius * 0.5), bounds.y - radius * 0.5),
          THREE.MathUtils.randFloat(-(bounds.z - radius), bounds.z - radius)
        );
        const clear = spawned.every(
          (other) => point.distanceToSquared(other) > Math.pow(radius + 0.5, 2)
        );
        if (clear) {
          spawned.push(point.clone());
          return point;
        }
      }
      return new THREE.Vector3(
        THREE.MathUtils.randFloat(-(bounds.x - radius), bounds.x - radius),
        THREE.MathUtils.randFloat(-(bounds.y - radius * 0.5), bounds.y - radius * 0.5),
        THREE.MathUtils.randFloat(-(bounds.z - radius), bounds.z - radius)
      );
    };

    return SKILL_BANDS.map((band) => {
      const radius = band.radius ?? 0.62;
      const velocity = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(1),
        THREE.MathUtils.randFloatSpread(0.6),
        THREE.MathUtils.randFloatSpread(1)
      ).normalize();
      return {
        band,
        radius,
        position: makePosition(radius),
        velocity,
        phase: Math.random() * Math.PI * 2
      } satisfies NodeState;
    });
  }, [isMobile]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const bounds = isMobile
      ? { x: 2.35, y: 0.7, z: 1.45 }
      : { x: 3.2, y: 0.95, z: 2.2 };
    const speed = isMobile ? 0.95 : 1.25;

    if (root.current) {
      root.current.rotation.y = Math.sin(t * 0.23) * 0.05;
    }

    nodeStates.forEach((state, index) => {
      if (hovered !== index) {
        state.position.addScaledVector(state.velocity, delta * speed);

        const xLimit = bounds.x - state.radius;
        const yLimit = bounds.y - state.radius * 0.45;
        const zLimit = bounds.z - state.radius;

        if (state.position.x >= xLimit || state.position.x <= -xLimit) {
          state.velocity.x *= -1;
          state.position.x = THREE.MathUtils.clamp(state.position.x, -xLimit, xLimit);
        }
        if (state.position.y >= yLimit || state.position.y <= -yLimit) {
          state.velocity.y *= -1;
          state.position.y = THREE.MathUtils.clamp(state.position.y, -yLimit, yLimit);
        }
        if (state.position.z >= zLimit || state.position.z <= -zLimit) {
          state.velocity.z *= -1;
          state.position.z = THREE.MathUtils.clamp(state.position.z, -zLimit, zLimit);
        }
      }

      const node = nodesRef.current[index];
      if (node) {
        node.position.set(
          state.position.x,
          state.position.y + Math.sin(t * 1.25 + state.phase) * 0.03,
          state.position.z
        );
      }
    });
  });

  useEffect(() => {
    return () => clearHoverOutTimer();
  }, []);

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight intensity={1.4} color="#00d4ff" position={[4, 4, 4]} />
      <pointLight intensity={1.2} color="#a855f7" position={[-4, -4, -2]} />
      <group ref={root}>
        {nodeStates.map((node, index) => {
          const active = !isMobile && hovered === index;
          return (
            <group
              key={node.band.label}
              ref={(instance) => {
                nodesRef.current[index] = instance;
              }}
            >
              <mesh
                scale={active ? 1.2 : 1}
                onPointerOver={
                  isMobile
                    ? undefined
                    : (event) => {
                        event.stopPropagation();
                        clearHoverOutTimer();
                        setHovered(index);
                      }
                }
                onPointerOut={
                  isMobile
                    ? undefined
                      : () => {
                          clearHoverOutTimer();
                          hoverOutTimer.current = window.setTimeout(() => {
                            setHovered((current) => (current === index ? null : current));
                          }, 110);
                      }
                }
              >
                <sphereGeometry
                  args={[node.radius, isMobile ? 22 : 34, isMobile ? 22 : 34]}
                />
                <meshStandardMaterial
                  color={node.band.color}
                  emissive={node.band.color}
                  emissiveIntensity={active ? 0.65 : 0.35}
                  roughness={0.32}
                  metalness={0.3}
                />
              </mesh>
              <Html center distanceFactor={isMobile ? 11 : 14} style={{ pointerEvents: "none" }}>
                <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(10,10,10,0.72)] px-1.5 py-[2px] text-[9px] leading-none text-primaryText md:text-[10px]">
                  {node.band.shortLabel}
                </span>
              </Html>
              {active ? (
                <Html
                  position={[0, 1.05, 0]}
                  center
                  distanceFactor={10}
                  style={{ pointerEvents: "none" }}
                >
                  <div className="w-56 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(17,17,25,0.93)] p-3 text-xs text-secondaryText shadow-glow backdrop-blur-md">
                    <p className="mb-2 font-semibold text-primaryText">{node.band.label}</p>
                    <p>{node.band.items.slice(0, 4).join(" - ")}</p>
                    {node.band.items.length > 4 ? (
                      <p className="mt-1 text-[11px] text-mutedText">See full list below.</p>
                    ) : null}
                  </div>
                </Html>
              ) : null}
            </group>
          );
        })}
      </group>
    </>
  );
}
