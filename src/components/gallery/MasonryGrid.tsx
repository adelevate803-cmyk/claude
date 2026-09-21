"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { GALLERY_CATEGORIES, GALLERY_IMAGES, type GalleryCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

const ALL = "All" as const;

export default function MasonryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | typeof ALL>(ALL);

  const items =
    filter === ALL ? GALLERY_IMAGES : GALLERY_IMAGES.filter((item) => item.category === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {[ALL, ...GALLERY_CATEGORIES].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full border px-5 py-2 font-label text-xs uppercase tracking-label transition-colors duration-300",
              filter === category
                ? "border-gold-champagne bg-gold-champagne text-velvet"
                : "border-gold-soft/40 text-cream/70 hover:border-gold-champagne hover:text-gold-champagne",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.figure
                layout
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-gold-soft/20"
              >
                <div className={cn("relative w-full", item.tall ? "aspect-[3/4]" : "aspect-square")}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}
