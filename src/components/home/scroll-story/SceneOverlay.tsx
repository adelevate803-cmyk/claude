"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SCROLL_SCENES } from "@/lib/content";
import GoldDivider from "@/components/ui/GoldDivider";
import { useActiveSceneIndex } from "./useActiveScene";

export default function SceneOverlay() {
  const active = useActiveSceneIndex();

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-10">
      {/* Screen-reader summary of the whole story, always present regardless of animation state. */}
      <ol className="sr-only">
        {SCROLL_SCENES.map((scene) => (
          <li key={scene.id}>
            {scene.heading} — {scene.body}
          </li>
        ))}
      </ol>

      {SCROLL_SCENES.map((scene, index) => {
        const isActive = index === active;
        return (
          <motion.div
            key={scene.id}
            aria-hidden={!isActive}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 16,
            }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="pointer-events-none absolute inset-x-0 flex flex-col items-center text-center"
            style={{ zIndex: isActive ? 1 : 0 }}
          >
            <p className="label-text mb-4">{scene.eyebrow}</p>
            <h2 className="max-w-2xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              {scene.heading}
            </h2>
            <p className="mt-5 max-w-md text-base text-cream/75 sm:text-lg">{scene.body}</p>

            {index === 0 && (
              <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book" className="btn-gold">
                  Book the cart
                </Link>
                <Link href="/menu" className="btn-outline">
                  See the menu
                </Link>
              </div>
            )}

            {index === SCROLL_SCENES.length - 1 && (
              <div className="pointer-events-auto mt-10">
                <GoldDivider className="mb-8 w-64" />
                <Link href="/book" className="btn-gold">
                  Start your enquiry
                </Link>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
