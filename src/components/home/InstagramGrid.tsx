import Image from "next/image";
import { SITE } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";

const PLACEHOLDER_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  image: `/images/instagram/post-${i + 1}.svg`,
}));

export default function InstagramGrid() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-content">
        <SectionLabel>Follow along</SectionLabel>
        <h2 className="text-center text-4xl sm:text-5xl">{SITE.instagramHandle}</h2>
        <GoldDivider className="my-12" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PLACEHOLDER_POSTS.map((post) => (
            <a
              key={post.id}
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative block aspect-square overflow-hidden rounded-lg border border-gold-soft/20"
            >
              <Image
                src={post.image}
                alt="Velvet Roll Co. on Instagram"
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-velvet-in-out group-hover:scale-105"
              />
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline"
          >
            View on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
