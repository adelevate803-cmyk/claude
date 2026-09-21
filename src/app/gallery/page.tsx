import type { Metadata } from "next";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See Velvet Roll Co. in action at weddings, walimas, private parties and bazaars across Scotland.",
};

export default function GalleryPage() {
  return (
    <div className="pt-32">
      <section className="section-pad pt-12 sm:pt-12">
        <div className="mx-auto max-w-content text-center">
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="text-5xl sm:text-6xl">Moments we&rsquo;ve rolled into</h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            A look at the cart, the rolls and the celebrations we&rsquo;ve been part of.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-content">
          <MasonryGrid />
        </div>
      </section>
    </div>
  );
}
