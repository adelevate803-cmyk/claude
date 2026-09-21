"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import RollScene from "./RollScene";

export default function StoryCanvas({ isMobile }: { isMobile: boolean }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            setHasError(true);
          },
          false,
        );
      }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <RollScene isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
