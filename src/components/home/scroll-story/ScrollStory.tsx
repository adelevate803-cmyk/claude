"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { scrollStory, SCENE_COUNT } from "./scrollState";
import SceneOverlay from "./SceneOverlay";
import StaticFallback from "./StaticFallback";

const StoryCanvas = dynamic(() => import("./StoryCanvas"), { ssr: false });

export default function ScrollStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    // Lazy-mount the WebGL canvas only after the hero text has painted.
    const id = requestAnimationFrame(() => setCanvasReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => scrollStory.set(self.progress * (SCENE_COUNT - 1)),
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${SCENE_COUNT * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-velvet">
        {canvasReady && <StoryCanvas isMobile={isMobile} />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-velvet/40 via-transparent to-velvet/60" />
        <SceneOverlay />
      </div>
    </div>
  );
}
