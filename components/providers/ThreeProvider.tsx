"use client";

import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, Suspense } from "react";
import { useReducedMotion } from "framer-motion";

type ThreeProviderProps = PropsWithChildren<{
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  dpr?: number | [number, number];
  onCreated?: () => void;
}>;

export default function ThreeProvider({
  children,
  className,
  cameraPosition = [0, 0, 8],
  fov = 55,
  dpr = [1, 1.8],
  onCreated
}: ThreeProviderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        frameloop={reducedMotion ? "demand" : "always"}
        camera={{ position: cameraPosition, fov }}
        onCreated={() => onCreated?.()}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
