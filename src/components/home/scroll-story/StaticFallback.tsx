import Image from "next/image";
import Link from "next/link";
import { SCROLL_SCENES } from "@/lib/content";
import GoldDivider from "@/components/ui/GoldDivider";

/**
 * Non-3D, non-scroll-scrubbed rendition of the story for prefers-reduced-motion
 * users and as a robust baseline (no WebGL dependency).
 */
export default function StaticFallback() {
  return (
    <div className="space-y-24 py-24">
      {SCROLL_SCENES.map((scene, index) => (
        <section
          key={scene.id}
          className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 text-center sm:px-10"
        >
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-full border border-gold-soft/30 bg-oxblood/60">
            <Image
              src={`/images/story/${scene.id}.svg`}
              alt=""
              fill
              className="object-cover"
              aria-hidden
            />
          </div>
          <p className="label-text">{scene.eyebrow}</p>
          <h2 className="text-4xl sm:text-5xl">{scene.heading}</h2>
          <p className="max-w-md text-cream/70">{scene.body}</p>
          {index < SCROLL_SCENES.length - 1 && <GoldDivider className="w-full max-w-xs" />}
        </section>
      ))}
      <div className="flex justify-center">
        <Link href="/book" className="btn-gold">
          Book the cart
        </Link>
      </div>
    </div>
  );
}
