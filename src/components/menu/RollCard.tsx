"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { COLORS } from "@/lib/theme";
import type { Roll } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

const MiniTurntable = dynamic(() => import("./MiniTurntable"), { ssr: false });

const ACCENT_MAP: Record<string, string> = {
  pistachio: COLORS.pistachio,
  cocoa: COLORS.cocoa,
  champagne: COLORS.champagne,
};

export default function RollCard({ roll }: { roll: Roll }) {
  const [show3D, setShow3D] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const accentColor = ACCENT_MAP[roll.accent] ?? COLORS.champagne;

  return (
    <article className="overflow-hidden rounded-2xl border border-gold-soft/20 bg-oxblood/40">
      <div
        className="relative aspect-square w-full overflow-hidden bg-velvet"
        onMouseEnter={() => setShow3D(true)}
      >
        <Image
          src={roll.image}
          alt={`${roll.name} — dessert sushi roll`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-500 ${show3D && !reducedMotion ? "opacity-0" : "opacity-100"}`}
        />
        {show3D && !reducedMotion && <MiniTurntable accentColor={accentColor} />}
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-3xl">{roll.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/75">{roll.description}</p>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="label-text mb-1">Allergens</dt>
            <dd className="text-cream/70">{roll.allergens.join(", ")}</dd>
          </div>
          <div>
            <dt className="label-text mb-1">Served with</dt>
            <dd className="text-cream/70">{roll.dips.join(" · ")}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
